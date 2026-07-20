export type WorkerStatus = 'ACTIVE' | 'INACTIVE';

export interface WorkerResponse {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  status: WorkerStatus;
  hourlyRate: number;
  skills: string[];
  siteId: string | null;
  siteName: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
}

export interface WorkerRequest {
  name: string;
  email: string | null;
  phone: string;
  status: WorkerStatus;
  hourlyRate: number;
  skills: string[];
  siteId: string | null;
}

export interface WorkerFilters {
  name?: string;
  skill?: string;
  status?: WorkerStatus | '';
  page?: number;
  size?: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ConstructionSiteOption {
  id: string;
  name: string;
  status: string;
}
