import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/api/endpoints';
import {
  Attendance,
  AttendanceRequest,
  AttendanceResponse,
  AttendanceFilters,
  PaginatedResponse,
  WorkerOption,
  SiteOption,
} from '../types';

export const attendanceService = {
  /**
   * Fetches paginated attendance records with optional filters & sorting.
   * Note: Backend pagination is 0-indexed.
   */
  getAttendanceList: async (
    filters: AttendanceFilters = {}
  ): Promise<PaginatedResponse<AttendanceResponse>> => {
    const pageIndex = filters.page !== undefined && filters.page > 0 ? filters.page - 1 : 0;
    const params: Record<string, any> = {
      page: pageIndex,
      size: filters.size || 10,
    };

    if (filters.workerId) {
      params.workerId = filters.workerId;
    }
    if (filters.siteId) {
      params.siteId = filters.siteId;
    }
    if (filters.attendanceDate) {
      params.attendanceDate = filters.attendanceDate;
    }
    if (filters.present !== undefined && filters.present !== '') {
      params.present = filters.present;
    }
    if (filters.sort) {
      params.sort = filters.sort;
    }

    const endpoint = API_ENDPOINTS?.ATTENDANCE?.BASE || '/api/private/attendance';
    const response = await apiClient.get<PaginatedResponse<AttendanceResponse>>(endpoint, {
      params,
    });
    return response.data;
  },

  /**
   * Fetches a single attendance record by ID.
   */
  getAttendanceById: async (id: string): Promise<AttendanceResponse> => {
    const endpoint = API_ENDPOINTS?.ATTENDANCE?.BY_ID
      ? API_ENDPOINTS.ATTENDANCE.BY_ID(id)
      : `/api/private/attendance/${id}`;
    const response = await apiClient.get<AttendanceResponse>(endpoint);
    return response.data;
  },

  /**
   * Creates a new attendance record.
   */
  createAttendance: async (data: AttendanceRequest): Promise<AttendanceResponse> => {
    const endpoint = API_ENDPOINTS?.ATTENDANCE?.BASE || '/api/private/attendance';
    const response = await apiClient.post<AttendanceResponse>(endpoint, data);
    return response.data;
  },

  /**
   * Updates an existing attendance record by ID.
   */
  updateAttendance: async (
    id: string,
    data: AttendanceRequest
  ): Promise<AttendanceResponse> => {
    const endpoint = API_ENDPOINTS?.ATTENDANCE?.BY_ID
      ? API_ENDPOINTS.ATTENDANCE.BY_ID(id)
      : `/api/private/attendance/${id}`;
    const response = await apiClient.put<AttendanceResponse>(endpoint, data);
    return response.data;
  },

  /**
   * Soft deletes an attendance record by ID.
   */
  deleteAttendance: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS?.ATTENDANCE?.BY_ID
      ? API_ENDPOINTS.ATTENDANCE.BY_ID(id)
      : `/api/private/attendance/${id}`;
    await apiClient.delete(endpoint);
  },

  /**
   * Helper options for worker dropdown selection.
   */
  getWorkerOptions: async (): Promise<WorkerOption[]> => {
    const endpoint = API_ENDPOINTS?.WORKERS?.BASE || '/api/private/workers';
    const response = await apiClient.get<PaginatedResponse<any>>(endpoint, {
      params: { page: 0, size: 200 },
    });
    const items = response.data?.content || [];
    return items.map((w: any) => ({
      id: w.id,
      name: w.name,
      siteId: w.siteId,
      siteName: w.siteName,
    }));
  },

  /**
   * Helper options for site dropdown selection.
   */
  getSiteOptions: async (): Promise<SiteOption[]> => {
    const endpoint = API_ENDPOINTS?.SITES?.BASE || '/api/private/construction-sites';
    const response = await apiClient.get<PaginatedResponse<any>>(endpoint, {
      params: { page: 0, size: 200 },
    });
    const items = response.data?.content || [];
    return items.map((s: any) => ({
      id: s.id,
      name: s.name,
    }));
  },
};

export default attendanceService;
