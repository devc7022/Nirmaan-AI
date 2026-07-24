export interface AttendanceAIRequest {
  text: string;
}

export interface ParsedAttendanceItem {
  workerName: string;
  siteName: string;
  attendanceDate: string;
  hoursWorked: number;
  present: boolean;
  remarks?: string;
  workerId?: string;
  siteId?: string;
}

export interface AttendanceAIResponse {
  success?: boolean;
  message?: string;
  workerName?: string;
  siteName?: string;
  attendanceDate?: string;
  hoursWorked?: number;
  present?: boolean;
  remarks?: string;
  workerId?: string;
  siteId?: string;
  records?: ParsedAttendanceItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
  timestamp?: string;
  suggestions?: string[];
}

export interface DailyReport {
  id?: string;
  title: string;
  date: string;
  summary: string;
  totalWorkers?: number;
  presentCount?: number;
  absentCount?: number;
  totalHours?: number;
  content: string;
  createdAt?: string;
}
