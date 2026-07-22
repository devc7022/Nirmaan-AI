import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { siteService } from '../services/site-service';
import { SiteFilters, SiteRequest } from '../types';

export function useSites(filters: SiteFilters = {}) {
  return useQuery({
    queryKey: ['sites', filters],
    queryFn: () => siteService.getSites(filters),
  });
}

export function useSite(id: string) {
  return useQuery({
    queryKey: ['site', id],
    queryFn: () => siteService.getSiteById(id),
    enabled: !!id,
  });
}

export function useCreateSite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SiteRequest) => siteService.createSite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
    },
  });
}

export function useUpdateSite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SiteRequest }) =>
      siteService.updateSite(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      queryClient.invalidateQueries({ queryKey: ['site', variables.id] });
    },
  });
}

export function useDeleteSite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => siteService.deleteSite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
    },
  });
}

export default useSites;
