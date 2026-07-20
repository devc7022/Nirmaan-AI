import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/api/endpoints';
import {
  WorkerRequest,
  WorkerResponse,
  WorkerFilters,
  PaginatedResponse,
  ConstructionSiteOption,
} from '../types';

export const workerService = {
  /**
   * Fetches a paginated list of workers with optional filters (name/search, skill, status).
   * Note: Backend pages are 0-indexed.
   */
  getWorkers: async (filters: WorkerFilters): Promise<PaginatedResponse<WorkerResponse>> => {
    const params: Record<string, any> = {
      page: filters.page !== undefined ? filters.page - 1 : 0, // Convert 1-based page to 0-based
      size: filters.size || 10,
    };

    if (filters.name) {
      params.name = filters.name;
    }
    if (filters.skill) {
      params.skill = filters.skill;
    }
    if (filters.status) {
      params.status = filters.status;
    }

    const response = await apiClient.get<PaginatedResponse<WorkerResponse>>(
      API_ENDPOINTS.WORKERS.BASE,
      { params }
    );
    return response.data;
  },

  /**
   * Fetches detailed information for a single worker by ID.
   */
  getWorkerById: async (id: string): Promise<WorkerResponse> => {
    const response = await apiClient.get<WorkerResponse>(
      API_ENDPOINTS.WORKERS.BY_ID(id)
    );
    return response.data;
  },

  /**
   * Creates a new worker record.
   */
  createWorker: async (data: WorkerRequest): Promise<WorkerResponse> => {
    const response = await apiClient.post<WorkerResponse>(
      API_ENDPOINTS.WORKERS.BASE,
      data
    );
    return response.data;
  },

  /**
   * Updates an existing worker record by ID.
   */
  updateWorker: async (id: string, data: WorkerRequest): Promise<WorkerResponse> => {
    const response = await apiClient.put<WorkerResponse>(
      API_ENDPOINTS.WORKERS.BY_ID(id),
      data
    );
    return response.data;
  },

  /**
   * Deletes a worker record by ID (soft delete).
   */
  deleteWorker: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.WORKERS.BY_ID(id));
  },

  /**
   * Fetches all construction sites (unpaginated/large size) to populate select options.
   */
  getSitesOptions: async (): Promise<ConstructionSiteOption[]> => {
    const response = await apiClient.get<PaginatedResponse<ConstructionSiteOption>>(
      API_ENDPOINTS.SITES.BASE,
      { params: { page: 0, size: 200 } } // Request a large list to cover all active sites
    );
    return response.data?.content || [];
  },
};

export default workerService;
