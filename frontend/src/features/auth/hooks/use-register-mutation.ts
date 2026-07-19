import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth-service';
import { RegisterInput } from '../schemas/register-schema';
import { RegisterResponse } from '../types';

export const useRegisterMutation = (options?: {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
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
