from fastapi import FastAPI, APIRouter, Request, Response, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, field_validator
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
import jwt
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Security Configuration
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', secrets.token_urlsafe(32))
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

# Password hashing configuration
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Rate limiter configuration
limiter = Limiter(key_func=get_remote_address)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
if not mongo_url:
    logger.warning("MONGO_URL not set, using default connection")
    mongo_url = "mongodb://localhost:27017"

client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'soundwolves')]

# Create the main app
app = FastAPI(
    title="SoundWolves API",
    description="Secure API for SoundWolves application",
    version="1.0.0"
)

# Add rate limiter to app
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security bearer for JWT
security = HTTPBearer(auto_error=False)


# ============== Security Models ==============

class UserBase(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=2, max_length=100)

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)
    user_type: str = Field(default="user", pattern="^(user|dj)$")
    dj_name: Optional[str] = Field(default=None, max_length=50)

    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one number')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    user_type: str
    dj_name: Optional[str] = None
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str = Field(..., min_length=1, max_length=100)


# ============== Security Utilities ==============

def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

def create_refresh_token(data: dict) -> str:
    """Create a JWT refresh token."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> Optional[dict]:
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        logger.warning("Token expired")
        return None
    except jwt.InvalidTokenError as e:
        logger.warning(f"Invalid token: {e}")
        return None

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Dependency to get current authenticated user from JWT token."""
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_token(credentials.credentials)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Fetch user from database
    user = await db.users.find_one({"id": payload.get("sub")})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user

async def get_current_user_optional(credentials: HTTPAuthorizationCredentials = Depends(security)) -> Optional[dict]:
    """Optional authentication - returns None if not authenticated."""
    if not credentials:
        return None

    payload = decode_token(credentials.credentials)
    if not payload or payload.get("type") != "access":
        return None

    user = await db.users.find_one({"id": payload.get("sub")})
    return user


# ============== Authentication Endpoints ==============

@api_router.post("/auth/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def register_user(request: Request, user_data: UserCreate):
    """Register a new user account."""
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user_data.email.lower()})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    user_id = str(uuid.uuid4())
    hashed_password = hash_password(user_data.password)

    new_user = {
        "id": user_id,
        "email": user_data.email.lower(),
        "name": user_data.name,
        "password_hash": hashed_password,
        "user_type": user_data.user_type,
        "dj_name": user_data.dj_name,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "is_active": True,
        "failed_login_attempts": 0,
        "last_login": None
    }

    await db.users.insert_one(new_user)
    logger.info(f"New user registered: {user_data.email}")

    # Generate tokens
    access_token = create_access_token({"sub": user_id, "email": user_data.email})
    refresh_token = create_refresh_token({"sub": user_id})

    # Store refresh token hash in database for validation
    await db.refresh_tokens.insert_one({
        "user_id": user_id,
        "token_hash": hash_password(refresh_token),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)).isoformat()
    })

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

@api_router.post("/auth/login", response_model=TokenResponse)
@limiter.limit("10/minute")
async def login_user(request: Request, login_data: UserLogin):
    """Authenticate user and return tokens."""
    # Find user by email
    user = await db.users.find_one({"email": login_data.email.lower()})

    if not user:
        # Don't reveal if user exists
        logger.warning(f"Login attempt for non-existent user: {login_data.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Check if account is locked
    if user.get("failed_login_attempts", 0) >= 5:
        last_attempt = user.get("last_failed_login")
        if last_attempt:
            lockout_until = datetime.fromisoformat(last_attempt) + timedelta(minutes=15)
            if datetime.now(timezone.utc) < lockout_until:
                logger.warning(f"Login attempt for locked account: {login_data.email}")
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Account temporarily locked. Please try again later."
                )

    # Verify password
    if not verify_password(login_data.password, user.get("password_hash", "")):
        # Increment failed login attempts
        await db.users.update_one(
            {"id": user["id"]},
            {
                "$inc": {"failed_login_attempts": 1},
                "$set": {"last_failed_login": datetime.now(timezone.utc).isoformat()}
            }
        )
        logger.warning(f"Failed login attempt for: {login_data.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Reset failed login attempts on successful login
    await db.users.update_one(
        {"id": user["id"]},
        {
            "$set": {
                "failed_login_attempts": 0,
                "last_login": datetime.now(timezone.utc).isoformat()
            }
        }
    )

    # Generate tokens
    access_token = create_access_token({"sub": user["id"], "email": user["email"]})
    refresh_token = create_refresh_token({"sub": user["id"]})

    # Store refresh token
    await db.refresh_tokens.insert_one({
        "user_id": user["id"],
        "token_hash": hash_password(refresh_token),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)).isoformat()
    })

    logger.info(f"User logged in: {login_data.email}")

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

@api_router.post("/auth/refresh", response_model=TokenResponse)
@limiter.limit("30/minute")
async def refresh_access_token(request: Request, token_data: RefreshTokenRequest):
    """Get a new access token using refresh token."""
    payload = decode_token(token_data.refresh_token)

    if not payload or payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

    user_id = payload.get("sub")
    user = await db.users.find_one({"id": user_id})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    # Generate new tokens
    access_token = create_access_token({"sub": user_id, "email": user["email"]})
    new_refresh_token = create_refresh_token({"sub": user_id})

    # Store new refresh token
    await db.refresh_tokens.insert_one({
        "user_id": user_id,
        "token_hash": hash_password(new_refresh_token),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)).isoformat()
    })

    return TokenResponse(
        access_token=access_token,
        refresh_token=new_refresh_token,
        expires_in=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )

@api_router.post("/auth/logout")
async def logout_user(request: Request, current_user: dict = Depends(get_current_user)):
    """Logout user and invalidate refresh tokens."""
    # Delete all refresh tokens for this user
    await db.refresh_tokens.delete_many({"user_id": current_user["id"]})
    logger.info(f"User logged out: {current_user['email']}")
    return {"message": "Successfully logged out"}

@api_router.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current authenticated user information."""
    return UserResponse(
        id=current_user["id"],
        email=current_user["email"],
        name=current_user["name"],
        user_type=current_user.get("user_type", "user"),
        dj_name=current_user.get("dj_name"),
        created_at=datetime.fromisoformat(current_user["created_at"])
    )


# ============== Existing Endpoints ==============

@api_router.get("/")
async def root():
    return {"message": "SoundWolves API", "status": "healthy"}

@api_router.post("/status", response_model=StatusCheck)
@limiter.limit("20/minute")
async def create_status_check(request: Request, input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
@limiter.limit("30/minute")
async def get_status_checks(request: Request):
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)

    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])

    return status_checks


# ============== Include Router ==============

app.include_router(api_router)


# ============== Security Middleware ==============

@app.middleware("http")
async def security_headers_middleware(request: Request, call_next):
    """Add security headers to all responses."""
    response = await call_next(request)

    # Prevent clickjacking
    response.headers["X-Frame-Options"] = "DENY"

    # Prevent MIME type sniffing
    response.headers["X-Content-Type-Options"] = "nosniff"

    # Enable XSS filter
    response.headers["X-XSS-Protection"] = "1; mode=block"

    # Content Security Policy
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https:; frame-ancestors 'none'"

    # Referrer Policy
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"

    # Permissions Policy
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"

    # HSTS (only enable in production with HTTPS)
    if os.environ.get('ENVIRONMENT') == 'production':
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"

    return response

@app.middleware("http")
async def request_logging_middleware(request: Request, call_next):
    """Log all incoming requests for audit trail."""
    start_time = datetime.now(timezone.utc)

    # Get client IP
    client_ip = request.client.host if request.client else "unknown"
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        client_ip = forwarded_for.split(",")[0].strip()

    # Log request
    logger.info(f"Request: {request.method} {request.url.path} from {client_ip}")

    response = await call_next(request)

    # Calculate duration
    duration = (datetime.now(timezone.utc) - start_time).total_seconds()

    # Log response
    logger.info(f"Response: {request.method} {request.url.path} - {response.status_code} ({duration:.3f}s)")

    return response


# ============== CORS Configuration ==============

# Get allowed origins from environment, with secure defaults
cors_origins_env = os.environ.get('CORS_ORIGINS', '')
if cors_origins_env:
    allowed_origins = [origin.strip() for origin in cors_origins_env.split(',') if origin.strip()]
else:
    # Default to localhost for development only
    allowed_origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
    logger.warning("CORS_ORIGINS not set, defaulting to localhost only")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allowed_origins,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["Authorization", "Content-Type", "X-Requested-With"],
    expose_headers=["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset"],
    max_age=600,  # Cache preflight requests for 10 minutes
)


# ============== Startup/Shutdown Events ==============

@app.on_event("startup")
async def startup_db_client():
    """Initialize database indexes on startup."""
    try:
        # Create indexes for users collection
        await db.users.create_index("email", unique=True)
        await db.users.create_index("id", unique=True)

        # Create indexes for refresh tokens
        await db.refresh_tokens.create_index("user_id")
        await db.refresh_tokens.create_index("expires_at", expireAfterSeconds=0)

        logger.info("Database indexes created successfully")
    except Exception as e:
        logger.error(f"Error creating database indexes: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on shutdown."""
    client.close()
    logger.info("Database connection closed")
