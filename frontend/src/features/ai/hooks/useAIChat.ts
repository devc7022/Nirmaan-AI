import { useMutation } from '@tanstack/react-query';
import { aiService } from '../services/ai-service';
import { ChatRequest, ChatResponse } from '../types';

export const useAIChat = () => {
  return useMutation<ChatResponse, Error, ChatRequest>({
    mutationFn: (data: ChatRequest) => aiService.sendChatMessage(data),
  });
};
