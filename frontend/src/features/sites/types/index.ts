export type ConstructionSiteStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';

export interface ConstructionSiteWorker {
  id: string;
  name: string;
  phone?: string;
  skill?: string;
  status?: string;
  dailyWage?: number;
  assignedAt?: string;
}

export interface AttendanceSummary {
  presentToday: number;
  totalAssigned: number;
  attendanceRate: number;
}

export interface Site {
  id: string;
  name: string;
  siteCode?: string;
  address: string;
  clientName: string;
  builderName?: string;
  supervisor?: string;
  status: ConstructionSiteStatus;
  startDate?: string;
  endDate?: string;
  description?: string;
  totalWorkers?: number;
  workers?: ConstructionSiteWorker[];
  attendanceSummary?: AttendanceSummary;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export type SiteResponse = Site;

export interface SiteRequest {
  name: string;
  address: string;
  clientName: string;
  supervisor?: string;
  status: ConstructionSiteStatus;
  startDate?: string;
  endDate?: string;
  description?: string;
  workerIds?: string[];
}

export interface SiteFilters {
  search?: string;
  name?: string;
  address?: string;
  supervisor?: string;
  status?: ConstructionSiteStatus | '';
  page?: number;
  size?: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first?: boolean;
  last?: boolean;
}
