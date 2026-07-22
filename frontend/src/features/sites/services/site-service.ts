import { apiClient } from '@/api';
import { API_ENDPOINTS } from '@/api/endpoints';
import {
  Site,
  SiteRequest,
  SiteResponse,
  SiteFilters,
  PaginatedResponse,
} from '../types';

export const siteService = {
  /**
   * Fetches a paginated list of construction sites with optional filters (search/name, status).
   * Note: Backend pagination is 0-indexed.
   */
  getSites: async (filters: SiteFilters = {}): Promise<PaginatedResponse<SiteResponse>> => {
    const pageIndex = filters.page !== undefined && filters.page > 0 ? filters.page - 1 : 0;
    const params: Record<string, any> = {
      page: pageIndex,
      size: filters.size || 10,
    };

    if (filters.name || filters.search) {
      params.name = filters.name || filters.search;
    }
    if (filters.status) {
      params.status = filters.status;
    }

    const endpoint = API_ENDPOINTS?.SITES?.BASE || '/api/private/construction-sites';
    const response = await apiClient.get<PaginatedResponse<SiteResponse>>(endpoint, { params });
    return response.data;
  },

  /**
   * Fetches detailed information for a single construction site by ID.
   */
  getSiteById: async (id: string): Promise<SiteResponse> => {
    const endpoint = API_ENDPOINTS?.SITES?.BY_ID
      ? API_ENDPOINTS.SITES.BY_ID(id)
      : `/api/private/construction-sites/${id}`;
    const response = await apiClient.get<SiteResponse>(endpoint);
    return response.data;
  },

  /**
   * Creates a new construction site record.
   */
  createSite: async (data: SiteRequest): Promise<SiteResponse> => {
    const endpoint = API_ENDPOINTS?.SITES?.BASE || '/api/private/construction-sites';
    const response = await apiClient.post<SiteResponse>(endpoint, data);
    return response.data;
  },

  /**
   * Updates an existing construction site record by ID.
   */
  updateSite: async (id: string, data: SiteRequest): Promise<SiteResponse> => {
    const endpoint = API_ENDPOINTS?.SITES?.BY_ID
      ? API_ENDPOINTS.SITES.BY_ID(id)
      : `/api/private/construction-sites/${id}`;
    const response = await apiClient.put<SiteResponse>(endpoint, data);
    return response.data;
  },

  /**
   * Deletes a construction site record by ID.
   */
  deleteSite: async (id: string): Promise<void> => {
    const endpoint = API_ENDPOINTS?.SITES?.BY_ID
      ? API_ENDPOINTS.SITES.BY_ID(id)
      : `/api/private/construction-sites/${id}`;
    await apiClient.delete(endpoint);
  },
};

export default siteService;
