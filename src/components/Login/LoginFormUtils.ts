import { apiFetch } from '@/utils/ApiUtils';

export interface LoginResponse {
    message: string;
    user: {
        email: string;
        // ... other user fields
    };
}

export const login = async (email: string, password: string) => {
    return apiFetch<LoginResponse>('/api/users/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}