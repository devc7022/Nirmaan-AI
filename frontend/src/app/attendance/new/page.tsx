'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { AttendanceForm } from '@/features/attendance/components/AttendanceForm';
import { useCreateAttendance } from '@/features/attendance/hooks/use-attendance';
import { AttendanceInput } from '@/features/attendance/schemas/attendance-schema';
import { AttendanceRequest } from '@/features/attendance/types';
import { AlertCircle } from 'lucide-react';

export default function CreateAttendancePage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const createMutation = useCreateAttendance();

  const handleSubmit = (formData: AttendanceInput) => {
    setErrorMsg(null);

    const requestData: AttendanceRequest = {
      workerId: formData.workerId,
      siteId: formData.siteId,
      attendanceDate: formData.attendanceDate,
      hoursWorked: formData.hoursWorked,
      present: formData.present,
      remarks: formData.remarks && formData.remarks.trim() !== '' ? formData.remarks.trim() : undefined,
    };

    createMutation.mutate(requestData, {
      onSuccess: () => {
        router.push('/attendance?message=Attendance Created successfully');
      },
      onError: (err: any) => {
        const backendMessage =
          err.response?.data?.message || err.response?.data?.error || err.message;
        if (backendMessage) {
          setErrorMsg(backendMessage);
        } else if (err.response?.status === 409) {
          setErrorMsg('An attendance record already exists for this worker on the selected date.');
        } else {
          setErrorMsg('An error occurred while marking attendance. Please try again.');
        }
      },
    });
  };

  const handleCancel = () => {
    router.push('/attendance');
  };

  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR', 'CONTRACTOR']}>
      <DashboardLayout>
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Page Heading */}
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground bg-clip-text">
              Mark Attendance
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Log daily site worker presence, worked hours, and task notes
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-semibold shadow-sm animate-shake">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMsg}</div>
            </div>
          )}

          {/* Form */}
          <AttendanceForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createMutation.isPending}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
