export interface WorkerStatistics {
  totalWorkers: number;
  activeWorkers: number;
  inactiveWorkers: number;
}

export interface AttendanceStatistics {
  presentToday: number;
  absentToday: number;
  attendancePercentage: number;
}

export interface SiteStatistics {
  totalSites: number;
  activeSites: number;
  completedSites: number;
}

export interface LabourStatistics {
  todayLabourCost: number;
  weeklyLabourCost: number;
  monthlyLabourCost: number;
  averageHoursWorkedToday: number;
}

export interface RecentAttendanceRecord {
  workerName: string;
  siteName: string;
  date: string; // ISO date string (YYYY-MM-DD)
  hoursWorked: number;
  present: boolean;
}

export interface TopSite {
  siteName: string;
  presentWorkerCount: number;
}

export interface DashboardResponse {
  workerStatistics: WorkerStatistics;
  attendanceStatistics: AttendanceStatistics;
  siteStatistics: SiteStatistics;
  labourStatistics: LabourStatistics;
  recentAttendance: RecentAttendanceRecord[];
  topSites: TopSite[];
  skillDistribution: Record<string, number>;
}

// Trend data interfaces used for rendering charts
export interface AttendanceTrend {
  date: string;
  presentCount: number;
  attendancePercentage: number;
}

export interface LabourCostTrend {
  date: string;
  cost: number;
}

export interface SkillDistribution {
  name: string;
  value: number;
}
