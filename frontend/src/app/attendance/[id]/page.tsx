'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Error as ErrorCard } from '@/components/ui/error';
import { AttendanceDetailsCard } from '@/features/attendance/components/AttendanceDetailsCard';
import { AttendanceForm } from '@/features/attendance/components/AttendanceForm';
import { useAttendanceById, useUpdateAttendance } from '@/features/attendance/hooks/use-attendance';
import { AttendanceInput } from '@/features/attendance/schemas/attendance-schema';
import { AttendanceRequest } from '@/features/attendance/types';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface AttendanceDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function AttendanceDetailPage({ params }: AttendanceDetailPageProps) {
  const resolvedParams = use(params);
  const attendanceId = resolvedParams.id;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Check if edit mode is requested via URL param (e.g. /attendance/[id]?edit=true)
  useEffect(() => {
    if (searchParams.get('edit') === 'true') {
      setIsEditing(true);
    }
  }, [searchParams]);

  // Query Attendance Record Details
  const { data: record, isLoading, isError, error, refetch } = useAttendanceById(attendanceId);
  const updateMutation = useUpdateAttendance();

  const handleUpdate = (formData: AttendanceInput) => {
    setErrorMsg(null);

    const requestData: AttendanceRequest = {
      workerId: formData.workerId,
      siteId: formData.siteId,
      attendanceDate: formData.attendanceDate,
      hoursWorked: formData.hoursWorked,
      present: formData.present,
      remarks: formData.remarks && formData.remarks.trim() !== '' ? formData.remarks.trim() : undefined,
    };

    updateMutation.mutate(
      { id: attendanceId, data: requestData },
      {
        onSuccess: () => {
          setIsEditing(false);
          setToast({ message: 'Attendance Updated successfully', type: 'success' });
          router.replace(`/attendance/${attendanceId}`);
          refetch();

          setTimeout(() => setToast(null), 4000);
        },
        onError: (err: any) => {
          const backendMessage =
            err.response?.data?.message || err.response?.data?.error || err.message;
          if (backendMessage) {
            setErrorMsg(backendMessage);
          } else {
            setErrorMsg('Failed to update attendance record. Please try again.');
          }
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrorMsg(null);
    router.replace(`/attendance/${attendanceId}`);
  };

  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR', 'CONTRACTOR']}>
      <DashboardLayout>
        <div className="mx-auto max-w-5xl space-y-6 relative pb-12">
          {/* Toast Notification */}
          {toast && (
            <div
              className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3.5 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-300 border ${
                toast.type === 'success'
                  ? 'bg-emerald-500 border-emerald-400 text-white'
                  : 'bg-destructive border-destructive-400 text-destructive-foreground'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="h-5 w-5 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0" />
              )}
              <span className="font-semibold text-sm">{toast.message}</span>
            </div>
          )}

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-[250px] w-full bg-muted/50 rounded-xl border border-muted animate-pulse" />
              <div className="h-[180px] w-full bg-muted/50 rounded-xl border border-muted animate-pulse" />
            </div>
          ) : isError || !record ? (
            /* Error State */
            <div className="flex items-center justify-center min-h-[40vh]">
              <ErrorCard
                message={
                  error instanceof Error
                    ? error.message
                    : 'Attendance record not found or server error.'
                }
                reset={refetch}
              />
            </div>
          ) : isEditing ? (
            /* Edit Mode View */
            <div className="mx-auto max-w-2xl space-y-6">
              <div>
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                  Edit Attendance Record
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Update hours worked, present status, site assignment, or task remarks
                </p>
              </div>

              {/* Error Banner */}
              {errorMsg && (
                <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-semibold shadow-sm animate-shake">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="flex-1">{errorMsg}</div>
                </div>
              )}

              <AttendanceForm
                initialData={record}
                onSubmit={handleUpdate}
                onCancel={handleCancelEdit}
                isLoading={updateMutation.isPending}
              />
            </div>
          ) : (
            /* Details Mode View */
            <AttendanceDetailsCard
              attendance={record}
              onEdit={() => setIsEditing(true)}
              onBack={() => router.push('/attendance')}
            />
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
