import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard-service';

export function useDashboard() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getDashboardData,
  });

  // Calculate trend arrays when data is available
  const attendanceTrend = data ? dashboardService.getAttendanceTrend(data) : [];
  const labourCostTrend = data ? dashboardService.getLabourCostTrend(data) : [];
  const skillDistribution = data ? dashboardService.getSkillDistributionList(data) : [];

  return {
    data,
    attendanceTrend,
    labourCostTrend,
    skillDistribution,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export default useDashboard;
