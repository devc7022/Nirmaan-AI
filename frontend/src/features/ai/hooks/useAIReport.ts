import { useMutation } from '@tanstack/react-query';
import { aiService } from '../services/ai-service';
import { DailyReport } from '../types';

export const useAIReport = () => {
  return useMutation<DailyReport, Error, void>({
    mutationFn: () => aiService.generateReport(),
  });
};
