import { AuthResponse } from '@/types/auth';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

class ApiClient {
  private static accessToken: string | null = null;

  static setAccessToken(token: string) {
    this.accessToken = token;
  }

  static getAccessToken() {
    return this.accessToken;
  }

  static async fetch<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(this.accessToken && { Authorization: `Bearer ${this.accessToken}` }),
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle token refresh
      if (response.status === 401) {
        const newToken = response.headers.get('X-New-Access-Token');
        if (newToken) {
          this.setAccessToken(newToken);
          // Retry the original request with new token
          return this.fetch(url, options);
        }
      }

      const data = await response.json();

      if (!response.ok) {
        return {
          data: null,
          error: data.error || 'An unexpected error occurred',
          status: response.status,
        };
      }

      return {
        data: data as T,
        error: null,
        status: response.status,
      };
    } catch (error) {
      return {
        data: null,
        error: 'Network error occurred',
        status: 500,
      };
    }
  }

  static async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    const response = await this.fetch<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data) {
      this.setAccessToken(response.data.accessToken);
    }

    return response;
  }

  static async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    const response = await this.fetch<{ accessToken: string }>('/api/auth/refresh', {
      method: 'POST',
    });

    if (response.data) {
      this.setAccessToken(response.data.accessToken);
    }

    return response;
  }

  static logout() {
    this.accessToken = null;
  }
}

export default ApiClient; 