import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceService } from '../services/attendance-service';
import { AttendanceFilters, AttendanceRequest } from '../types';

export function useAttendance(filters: AttendanceFilters = {}) {
  return useQuery({
    queryKey: ['attendance', filters],
    queryFn: () => attendanceService.getAttendanceList(filters),
  });
}

export function useAttendanceById(id: string) {
  return useQuery({
    queryKey: ['attendance-record', id],
    queryFn: () => attendanceService.getAttendanceById(id),
    enabled: !!id,
  });
}

export function useCreateAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AttendanceRequest) => attendanceService.createAttendance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });
}

export function useUpdateAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AttendanceRequest }) =>
      attendanceService.updateAttendance(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-record', variables.id] });
    },
  });
}

export function useDeleteAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => attendanceService.deleteAttendance(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });
}

export function useWorkerOptions() {
  return useQuery({
    queryKey: ['worker-options'],
    queryFn: () => attendanceService.getWorkerOptions(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSiteOptions() {
  return useQuery({
    queryKey: ['site-options'],
    queryFn: () => attendanceService.getSiteOptions(),
    staleTime: 5 * 60 * 1000,
  });
}

export default useAttendance;
