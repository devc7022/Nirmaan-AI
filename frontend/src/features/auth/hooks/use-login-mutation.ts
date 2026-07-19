import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth-service';
import { LoginInput } from '../schemas/login-schema';
import { TokenResponse } from '../types';

export const useLoginMutation = (options?: {
  onSuccess?: (data: TokenResponse) => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: (credentials: LoginInput) => authService.login(credentials),
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};
