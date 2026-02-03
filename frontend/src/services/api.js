/**
 * Secure API Service for SoundWolves
 * Handles all API calls with proper authentication and security measures
 */

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

// Token storage keys (use sessionStorage for better security)
const ACCESS_TOKEN_KEY = 'soundwolves_access_token';
const REFRESH_TOKEN_KEY = 'soundwolves_refresh_token';
const TOKEN_EXPIRY_KEY = 'soundwolves_token_expiry';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Token Management
  getAccessToken() {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken() {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  setTokens(accessToken, refreshToken, expiresIn) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    const expiry = Date.now() + (expiresIn * 1000);
    sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
  }

  clearTokens() {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
  }

  isTokenExpired() {
    const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiry) return true;
    // Consider token expired 1 minute before actual expiry
    return Date.now() > (parseInt(expiry) - 60000);
  }

  // Core request method with security features
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add authorization header if we have a token
    const token = this.getAccessToken();
    if (token && !options.skipAuth) {
      // Check if token is expired and refresh if needed
      if (this.isTokenExpired() && this.getRefreshToken()) {
        try {
          await this.refreshAccessToken();
          headers['Authorization'] = `Bearer ${this.getAccessToken()}`;
        } catch (error) {
          // If refresh fails, clear tokens and redirect to login
          this.clearTokens();
          window.location.href = '/login';
          throw new Error('Session expired. Please log in again.');
        }
      } else {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const config = {
      ...options,
      headers,
      credentials: 'include', // Include cookies for CSRF protection
    };

    try {
      const response = await fetch(url, config);

      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || '60';
        throw new Error(`Rate limited. Please try again in ${retryAfter} seconds.`);
      }

      // Handle authentication errors
      if (response.status === 401) {
        this.clearTokens();
        throw new Error('Authentication required. Please log in.');
      }

      // Handle other errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Request failed with status ${response.status}`);
      }

      // Return JSON response
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Authentication Methods
  async register(name, email, password, userType = 'user', djName = null) {
    const payload = {
      name,
      email,
      password,
      user_type: userType,
    };

    if (djName) {
      payload.dj_name = djName;
    }

    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      skipAuth: true,
    });

    this.setTokens(response.access_token, response.refresh_token, response.expires_in);
    return response;
  }

  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });

    this.setTokens(response.access_token, response.refresh_token, response.expires_in);
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } finally {
      this.clearTokens();
    }
  }

  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
      skipAuth: true,
    });

    this.setTokens(response.access_token, response.refresh_token, response.expires_in);
    return response;
  }

  async getCurrentUser() {
    return await this.request('/auth/me', {
      method: 'GET',
    });
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getAccessToken() && !this.isTokenExpired();
  }

  // Status Endpoints
  async getStatus() {
    return await this.request('/status', {
      method: 'GET',
      skipAuth: true,
    });
  }

  async createStatus(clientName) {
    return await this.request('/status', {
      method: 'POST',
      body: JSON.stringify({ client_name: clientName }),
      skipAuth: true,
    });
  }
}

// Export singleton instance
export const api = new ApiService();
export default api;
