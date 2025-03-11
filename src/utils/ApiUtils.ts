export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    status: number;
}

export async function apiFetch<T>(
    url: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        });

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
