import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workerService } from '../services/worker-service';
import { WorkerFilters, WorkerRequest } from '../types';

export function useWorkers(filters: WorkerFilters) {
  return useQuery({
    queryKey: ['workers', filters],
    queryFn: () => workerService.getWorkers(filters),
  });
}

export function useWorker(id: string) {
  return useQuery({
    queryKey: ['worker', id],
    queryFn: () => workerService.getWorkerById(id),
    enabled: !!id,
  });
}

export function useCreateWorker() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: WorkerRequest) => workerService.createWorker(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    },
  });
}

export function useUpdateWorker() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: WorkerRequest }) =>
      workerService.updateWorker(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      queryClient.invalidateQueries({ queryKey: ['worker', data.id] });
    },
  });
}

export function useDeleteWorker() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => workerService.deleteWorker(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    },
  });
}

export function useSites() {
  return useQuery({
    queryKey: ['sites-options'],
    queryFn: () => workerService.getSitesOptions(),
    staleTime: 5 * 60 * 1000, // cache site dropdown options for 5 minutes
  });
}
export default useWorkers;
