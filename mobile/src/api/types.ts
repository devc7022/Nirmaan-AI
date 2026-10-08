// Spring Boot Pageable response model
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// ---------------- Authentication ----------------
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string; // min 12, max 72
}

export interface RegisterResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExpiresAt: string;
  roles: string[];
}

// ---------------- Construction Sites ----------------
export type ConstructionSiteStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';

export interface ConstructionSiteWorkerDto {
  id: string;
  name: string;
  phone: string;
}

export interface ConstructionSiteResponse {
  id: string;
  name: string;
  address: string;
  clientName: string;
  status: ConstructionSiteStatus;
  workers: ConstructionSiteWorkerDto[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface ConstructionSiteRequest {
  name: string;
  address: string;
  clientName: string;
  status: ConstructionSiteStatus;
  workerIds?: string[];
}

// ---------------- Workers ----------------
export type WorkerStatus = 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';

export interface WorkerResponse {
  id: string;
  name: string;
  email?: string;
  phone: string;
  status: WorkerStatus;
  hourlyRate: number;
  skills: string[];
  siteId?: string;
  siteName?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface WorkerRequest {
  name: string;
  email?: string;
  phone: string;
  status: WorkerStatus;
  hourlyRate: number;
  skills: string[];
  siteId?: string;
}

// ---------------- Attendance ----------------
export interface AttendanceResponseDto {
  id: string;
  workerId: string;
  workerName: string;
  siteId: string;
  siteName: string;
  attendanceDate: string; // YYYY-MM-DD
  hoursWorked: number;
  present: boolean;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRequestDto {
  workerId: string;
  siteId: string;
  attendanceDate: string; // YYYY-MM-DD
  hoursWorked: number;
  present: boolean;
  remarks?: string;
}

export interface AiAttendanceRequest {
  text: string;
}

// ---------------- Dashboard ----------------
export interface WorkerStatisticsDto {
  totalWorkers: number;
  activeWorkers: number;
  inactiveWorkers: number;
}

export interface AttendanceStatisticsDto {
  presentToday: number;
  absentToday: number;
  attendancePercentage: number;
}

export interface SiteStatisticsDto {
  totalSites: number;
  activeSites: number;
  completedSites: number;
}

export interface LabourStatisticsDto {
  todayLabourCost: number;
  weeklyLabourCost: number;
  monthlyLabourCost: number;
  averageHoursWorkedToday: number;
}

export interface RecentAttendanceDto {
  workerName: string;
  siteName: string;
  date: string;
  hoursWorked: number;
  present: boolean;
}

export interface TopSiteDto {
  siteName: string;
  presentWorkerCount: number;
}

export interface DashboardResponseDto {
  workerStatistics: WorkerStatisticsDto;
  attendanceStatistics: AttendanceStatisticsDto;
  siteStatistics: SiteStatisticsDto;
  labourStatistics: LabourStatisticsDto;
  recentAttendance: RecentAttendanceDto[];
  topSites: TopSiteDto[];
  skillDistribution: Record<string, number>;
}

// ---------------- Contractor Query / Leads ----------------
export interface ManpowerRequirementDto {
  workerType: string;
  quantity: number;
}

export interface ContractorQueryRequest {
  contractorName: string;
  companyName: string;
  mobileNumber: string;
  email: string;
  projectName: string;
  projectLocation: string;
  siteAddress: string;
  manpowerRequirements: ManpowerRequirementDto[];
  workStartDate?: string;
  expectedDuration?: string;
  workingDays?: number;
  workDescription?: string;
  specialInstructions?: string;
}

export interface ContractorQueryResponse extends ContractorQueryRequest {
  id: string;
  status: string;
  createdAt: string;
  emailSent: boolean;
  message: string;
}

// ---------------- API Error ----------------
export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors?: Record<string, string>;
}
