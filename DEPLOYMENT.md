# 🚀 SOUNDWOLVES Deployment Guide

This guide covers deployment of the SOUNDWOLVES application to various platforms.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Emergent Platform Deployment](#emergent-platform-deployment)
3. [Docker Deployment](#docker-deployment)
4. [Traditional Cloud Deployment](#traditional-cloud-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Post-Deployment](#post-deployment)

---

## Prerequisites

### Required Services
- MongoDB database (Atlas, self-hosted, or managed)
- Node.js 18+ environment
- Python 3.11+ environment

### Environment Variables

**Backend Required:**
```env
MONGO_URL=mongodb://[username:password@]host[:port]/database
DB_NAME=soundwolves_production
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

**Frontend Required:**
```env
REACT_APP_BACKEND_URL=https://api.yourdomain.com
```

---

## Emergent Platform Deployment

### Overview
Emergent provides native support for FastAPI + React + MongoDB applications with zero-configuration deployment.

### Steps

1. **Connect GitHub Repository**
   ```bash
   # Push your code to GitHub
   git remote add origin https://github.com/yourusername/soundwolves.git
   git push -u origin main
   ```

2. **Deploy on Emergent**
   - Visit https://emergent.sh
   - Connect your GitHub repository
   - Select FastAPI_React_Mongo stack
   - Environment variables are auto-configured

3. **Verify Deployment**
   - Frontend: Accessible at your Emergent URL
   - Backend: API routes available at `/api/*`
   - MongoDB: Managed by Emergent

### Features
✅ Automatic environment configuration
✅ Built-in MongoDB management
✅ HTTPS/SSL included
✅ Auto-scaling
✅ Zero downtime deployments

---

## Docker Deployment

### Docker Compose Setup

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    container_name: soundwolves-mongodb
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=soundwolves

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: soundwolves-backend
    restart: always
    ports:
      - "8001:8001"
    environment:
      - MONGO_URL=mongodb://mongodb:27017
      - DB_NAME=soundwolves
      - CORS_ORIGINS=http://localhost:3000
    depends_on:
      - mongodb

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: soundwolves-frontend
    restart: always
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BACKEND_URL=http://localhost:8001
    depends_on:
      - backend

volumes:
  mongodb_data:
```

### Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

### Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Deploy with Docker

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## Traditional Cloud Deployment

### Option 1: Netlify (Frontend) + Heroku (Backend) + MongoDB Atlas

#### Frontend on Netlify

```bash
# Build frontend
cd frontend
yarn build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  command = "yarn build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Backend on Heroku

```bash
# Create Heroku app
heroku create soundwolves-api

# Set environment variables
heroku config:set MONGO_URL=your_mongodb_atlas_url
heroku config:set DB_NAME=soundwolves
heroku config:set CORS_ORIGINS=https://soundwolves.netlify.app

# Deploy
git subtree push --prefix backend heroku main
```

**Heroku Configuration** (`backend/Procfile`):
```
web: uvicorn server:app --host 0.0.0.0 --port $PORT
```

#### MongoDB Atlas

1. Create cluster at https://cloud.mongodb.com
2. Create database user
3. Whitelist IP addresses
4. Get connection string
5. Update `MONGO_URL` in environment variables

### Option 2: DigitalOcean App Platform

1. **Create App**
   - Connect GitHub repository
   - Select branch to deploy

2. **Configure Backend**
   ```yaml
   name: soundwolves-backend
   services:
     - name: api
       source_dir: backend
       build_command: pip install -r requirements.txt
       run_command: uvicorn server:app --host 0.0.0.0 --port 8001
       environment_slug: python
   ```

3. **Configure Frontend**
   ```yaml
   name: soundwolves-frontend
   services:
     - name: web
       source_dir: frontend
       build_command: yarn build
       run_command: npx serve -s build -l 3000
       environment_slug: node-js
   ```

4. **Add MongoDB Database**
   - Use DigitalOcean Managed MongoDB
   - Or connect to MongoDB Atlas

---

## Environment Configuration

### Production Environment Variables

**Backend (.env.production)**
```env
# Database
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/soundwolves
DB_NAME=soundwolves_production

# CORS - Add all frontend domains
CORS_ORIGINS=https://soundwolves.com,https://www.soundwolves.com

# Optional
LOG_LEVEL=INFO
DEBUG=False
```

**Frontend (.env.production)**
```env
# Backend API
REACT_APP_BACKEND_URL=https://api.soundwolves.com

# Optional: Analytics
REACT_APP_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

### Security Considerations

1. **Never commit `.env` files**
   - Add to `.gitignore`
   - Use environment variable management tools

2. **Use HTTPS in production**
   - Enable SSL certificates
   - Redirect HTTP to HTTPS

3. **Secure MongoDB**
   - Use strong passwords
   - Enable authentication
   - Whitelist specific IPs only

4. **CORS Configuration**
   - Only allow trusted domains
   - Don't use `*` in production

---

## Post-Deployment

### Health Checks

**Backend Health Check:**
```bash
curl https://api.soundwolves.com/health
```

**Frontend Check:**
```bash
curl https://soundwolves.com
```

**Database Connection:**
```python
from pymongo import MongoClient
client = MongoClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]
print(db.command('ping'))
```

### Monitoring

1. **Application Monitoring**
   - Set up error tracking (Sentry)
   - Monitor response times
   - Track user analytics

2. **Database Monitoring**
   - Monitor query performance
   - Track connection pool
   - Set up automated backups

3. **Server Monitoring**
   - CPU and memory usage
   - Disk space
   - Network traffic

### Scaling

**Horizontal Scaling:**
- Add more backend instances
- Use load balancer
- Implement caching (Redis)

**Database Scaling:**
- Use MongoDB replica sets
- Implement sharding for large datasets
- Add read replicas

### Backup Strategy

**Automated Backups:**
```bash
# MongoDB backup script
mongodump --uri="$MONGO_URL" --out=/backups/$(date +%Y%m%d)

# Upload to cloud storage
aws s3 sync /backups/ s3://soundwolves-backups/
```

**Backup Schedule:**
- Daily automated backups
- Weekly full backups
- Retain for 30 days
- Test restore process monthly

---

## Troubleshooting

### Common Issues

**Frontend not connecting to backend:**
- Check CORS configuration
- Verify REACT_APP_BACKEND_URL
- Check network requests in browser console

**Database connection errors:**
- Verify MONGO_URL format
- Check IP whitelist
- Ensure database user has correct permissions

**Build failures:**
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify all dependencies are listed in package.json

### Logs

**View Backend Logs:**
```bash
# Docker
docker logs soundwolves-backend

# Heroku
heroku logs --tail --app soundwolves-api

# Emergent
Check Emergent dashboard
```

**View Frontend Logs:**
```bash
# Netlify
netlify logs

# Docker
docker logs soundwolves-frontend
```

---

## Rollback Procedure

### Emergency Rollback

**Emergent:**
- Use dashboard to rollback to previous deployment

**Docker:**
```bash
docker-compose down
git checkout <previous-commit>
docker-compose up -d --build
```

**Heroku:**
```bash
heroku rollback --app soundwolves-api
```

---

## Performance Optimization

### Frontend Optimization
- Enable gzip compression
- Implement code splitting
- Optimize images
- Use CDN for static assets
- Enable browser caching

### Backend Optimization
- Implement connection pooling
- Add database indexes
- Use caching for frequent queries
- Enable API rate limiting
- Implement response compression

---

## Support

For deployment issues:
- Check [deployment logs](#logs)
- Review [troubleshooting guide](#troubleshooting)
- Open GitHub issue
- Contact support@soundwolves.com

---

**Last Updated:** December 2024  
**Maintained by:** SOUNDWOLVES Team
