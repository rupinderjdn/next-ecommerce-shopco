import ApiClient from '@/utils/apiClient';

export interface LoginResponse {
    message: string;
    user: {
        email: string;
        // ... other user fields
    };
}

export const login = async (email: string, password: string) => {
    return ApiClient.fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}