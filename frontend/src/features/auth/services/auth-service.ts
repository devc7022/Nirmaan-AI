import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/api/endpoints';
import { LoginInput } from '../schemas/login-schema';
import { RegisterInput } from '../schemas/register-schema';
import { TokenResponse, RegisterResponse } from '../types';

export const authService = {
  login: async (credentials: LoginInput): Promise<TokenResponse> => {
    const response = await apiClient.post<TokenResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        email: credentials.email,
        password: credentials.password,
      }
    );
    return response.data;
  },

  register: async (data: RegisterInput): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<TokenResponse> => {
    const response = await apiClient.post<TokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      {
        refreshToken,
      }
    );
    return response.data;
  },
};
