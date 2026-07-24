import { useMutation } from '@tanstack/react-query';
import { aiService } from '../services/ai-service';
import { AttendanceAIRequest, AttendanceAIResponse } from '../types';

export const useAIAttendance = () => {
  return useMutation<AttendanceAIResponse, Error, AttendanceAIRequest>({
    mutationFn: (data: AttendanceAIRequest) => aiService.parseAttendance(data),
  });
};
