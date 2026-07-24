export interface Attendance {
  id: string;
  workerId: string;
  workerName: string;
  siteId: string;
  siteName: string;
  attendanceDate: string;
  hoursWorked: number;
  present: boolean;
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AttendanceResponse = Attendance;

export interface AttendanceRequest {
  workerId: string;
  siteId: string;
  attendanceDate: string;
  hoursWorked: number;
  present: boolean;
  remarks?: string;
}

export interface AttendanceFilters {
  workerName?: string;
  workerId?: string;
  siteId?: string;
  attendanceDate?: string;
  present?: boolean | '';
  page?: number;
  size?: number;
  sort?: string;
}

export interface WorkerOption {
  id: string;
  name: string;
  siteId?: string;
  siteName?: string;
}

export interface SiteOption {
  id: string;
  name: string;
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
