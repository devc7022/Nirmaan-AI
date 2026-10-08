import { apiClient, tokenStorage } from './client';
import {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  TokenResponse,
  ConstructionSiteRequest,
  ConstructionSiteResponse,
  WorkerRequest,
  WorkerResponse,
  AttendanceRequestDto,
  AttendanceResponseDto,
  AiAttendanceRequest,
  DashboardResponseDto,
  ContractorQueryRequest,
  ContractorQueryResponse,
  PageResponse,
  ConstructionSiteStatus,
  WorkerStatus,
} from './types';

export * from './types';
export * from './config';
export { apiClient, tokenStorage };

// ----------------- Authentication Services -----------------
export const authApi = {
  login: async (credentials: LoginRequest): Promise<TokenResponse> => {
    const res = await apiClient.post<TokenResponse>('/api/public/auth/login', credentials);
    await tokenStorage.setTokens(res.data);
    return res.data;
  },

  register: async (payload: RegisterRequest): Promise<RegisterResponse> => {
    const res = await apiClient.post<RegisterResponse>('/api/public/auth/register', payload);
    return res.data;
  },

  refresh: async (refreshToken: string): Promise<TokenResponse> => {
    const res = await apiClient.post<TokenResponse>('/api/public/auth/refresh', { refreshToken });
    await tokenStorage.setTokens(res.data);
    return res.data;
  },

  logout: async (): Promise<void> => {
    await tokenStorage.clearTokens();
  },
};

// ----------------- Construction Sites Services -----------------
export const sitesApi = {
  getSites: async (params?: {
    name?: string;
    status?: ConstructionSiteStatus;
    page?: number;
    size?: number;
    sort?: string;
  }): Promise<PageResponse<ConstructionSiteResponse>> => {
    const res = await apiClient.get<PageResponse<ConstructionSiteResponse>>(
      '/api/private/construction-sites',
      { params }
    );
    return res.data;
  },

  getSiteById: async (id: string): Promise<ConstructionSiteResponse> => {
    const res = await apiClient.get<ConstructionSiteResponse>(
      `/api/private/construction-sites/${id}`
    );
    return res.data;
  },

  createSite: async (data: ConstructionSiteRequest): Promise<ConstructionSiteResponse> => {
    const res = await apiClient.post<ConstructionSiteResponse>(
      '/api/private/construction-sites',
      data
    );
    return res.data;
  },

  updateSite: async (
    id: string,
    data: ConstructionSiteRequest
  ): Promise<ConstructionSiteResponse> => {
    const res = await apiClient.put<ConstructionSiteResponse>(
      `/api/private/construction-sites/${id}`,
      data
    );
    return res.data;
  },

  deleteSite: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/private/construction-sites/${id}`);
  },
};

// ----------------- Workers Services -----------------
export const workersApi = {
  getWorkers: async (params?: {
    name?: string;
    skill?: string;
    status?: WorkerStatus;
    page?: number;
    size?: number;
    sort?: string;
  }): Promise<PageResponse<WorkerResponse>> => {
    const res = await apiClient.get<PageResponse<WorkerResponse>>('/api/private/workers', {
      params,
    });
    return res.data;
  },

  getWorkerById: async (id: string): Promise<WorkerResponse> => {
    const res = await apiClient.get<WorkerResponse>(`/api/private/workers/${id}`);
    return res.data;
  },

  createWorker: async (data: WorkerRequest): Promise<WorkerResponse> => {
    const res = await apiClient.post<WorkerResponse>('/api/private/workers', data);
    return res.data;
  },

  updateWorker: async (id: string, data: WorkerRequest): Promise<WorkerResponse> => {
    const res = await apiClient.put<WorkerResponse>(`/api/private/workers/${id}`, data);
    return res.data;
  },

  deleteWorker: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/private/workers/${id}`);
  },
};

// ----------------- Attendance Services -----------------
export const attendanceApi = {
  getAttendance: async (params?: {
    workerId?: string;
    siteId?: string;
    attendanceDate?: string;
    present?: boolean;
    page?: number;
    size?: number;
    sort?: string;
  }): Promise<PageResponse<AttendanceResponseDto>> => {
    const res = await apiClient.get<PageResponse<AttendanceResponseDto>>(
      '/api/private/attendance',
      { params }
    );
    return res.data;
  },

  getAttendanceById: async (id: string): Promise<AttendanceResponseDto> => {
    const res = await apiClient.get<AttendanceResponseDto>(`/api/private/attendance/${id}`);
    return res.data;
  },

  createAttendance: async (data: AttendanceRequestDto): Promise<AttendanceResponseDto> => {
    const res = await apiClient.post<AttendanceResponseDto>('/api/private/attendance', data);
    return res.data;
  },

  updateAttendance: async (
    id: string,
    data: AttendanceRequestDto
  ): Promise<AttendanceResponseDto> => {
    const res = await apiClient.put<AttendanceResponseDto>(
      `/api/private/attendance/${id}`,
      data
    );
    return res.data;
  },

  deleteAttendance: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/private/attendance/${id}`);
  },

  // 🤖 AI Natural Language Attendance (Voice or casual text)
  processAiAttendance: async (
    statement: AiAttendanceRequest
  ): Promise<AttendanceResponseDto> => {
    const res = await apiClient.post<AttendanceResponseDto>(
      '/api/private/attendance/ai',
      statement
    );
    return res.data;
  },
};

// ----------------- Dashboard Service -----------------
export const dashboardApi = {
  getDashboard: async (): Promise<DashboardResponseDto> => {
    const res = await apiClient.get<DashboardResponseDto>('/api/private/dashboard');
    return res.data;
  },
};

// ----------------- Contractor Queries / Leads -----------------
export const contractorQueriesApi = {
  submitQuery: async (data: ContractorQueryRequest): Promise<ContractorQueryResponse> => {
    const res = await apiClient.post<ContractorQueryResponse>(
      '/api/contractor-queries',
      data
    );
    return res.data;
  },

  getAllQueries: async (): Promise<ContractorQueryResponse[]> => {
    const res = await apiClient.get<ContractorQueryResponse[]>(
      '/api/private/contractor-queries'
    );
    return res.data;
  },
};
