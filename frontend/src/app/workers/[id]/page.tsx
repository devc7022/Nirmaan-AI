'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Error as ErrorCard } from '@/components/ui/error';
import { useWorker, useUpdateWorker, useDeleteWorker } from '@/features/workers/hooks/use-workers';
import { WorkerDetailsCard } from '@/features/workers/components/WorkerDetailsCard';
import { WorkerForm } from '@/features/workers/components/WorkerForm';
import { DeleteDialog } from '@/features/workers/components/DeleteDialog';
import { WorkerInput } from '@/features/workers/schemas/worker-schema';
import { WorkerRequest } from '@/features/workers/types';
import { CheckCircle, AlertCircle } from 'lucide-react';

function WorkerDetailsPageContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;

  // Local states
  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Sync edit mode from URL parameter (?edit=true)
  useEffect(() => {
    if (searchParams.get('edit') === 'true') {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [searchParams]);

  // Fetch worker details
  const { data: worker, isLoading, isError, error, refetch } = useWorker(id);

  const updateWorkerMutation = useUpdateWorker();
  const deleteMutation = useDeleteWorker();

  const handleEditSubmit = (formData: WorkerInput) => {
    setErrorMsg(null);

    // Transform form input into DTO format matching backend schemas
    const requestData: WorkerRequest = {
      name: formData.fullName,
      email: formData.email && formData.email.trim() !== '' ? formData.email.trim() : null,
      phone: formData.phone,
      status: formData.status,
      // Conversion: Daily Wage = hourlyRate * 8 -> hourlyRate = dailyWage / 8
      hourlyRate: Number((formData.dailyWage / 8).toFixed(2)),
      skills: [formData.skill],
      siteId: formData.siteId || null,
    };

    updateWorkerMutation.mutate(
      { id, data: requestData },
      {
        onSuccess: () => {
          setToast({ message: 'Worker profile updated successfully', type: 'success' });
          setIsEditing(false);
          // Update URL to remove ?edit=true parameter
          router.replace(`/workers/${id}`);
          refetch();

          setTimeout(() => setToast(null), 4000);
        },
        onError: (err: any) => {
          const backendMessage = err.response?.data?.message || err.response?.data?.error;
          if (backendMessage) {
            setErrorMsg(backendMessage);
          } else if (err.response?.status === 409) {
            setErrorMsg('A worker with this phone number or email is already registered.');
          } else {
            setErrorMsg('An error occurred while saving the worker profile. Please try again.');
          }
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        // Redirect with message param to show success toast on workers list page
        router.push('/workers?message=Worker profile deleted successfully');
      },
      onError: (err: any) => {
        setIsDeleteOpen(false);
        setToast({
          message: err.response?.data?.message || 'Failed to delete worker record',
          type: 'error',
        });
        setTimeout(() => setToast(null), 5000);
      },
    });
  };

  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR', 'CONTRACTOR']}>
      <DashboardLayout>
        <div className="mx-auto max-w-4xl space-y-6 relative pb-12">

          {/* Success/Error Toast notification */}
          {toast && (
            <div
              className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3.5 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-300 border ${toast.type === 'success'
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

          {/* Page Heading */}
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground bg-clip-text">
              {isEditing ? 'Edit Worker Profile' : 'Worker Profile'}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {isEditing
                ? 'Update personnel information and site assignments'
                : 'Detailed view of worker skills, wages, and site assignments'}
            </p>
          </div>

          {/* Backend Error message alert */}
          {errorMsg && (
            <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-semibold shadow-sm animate-shake">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMsg}</div>
            </div>
          )}

          {/* Content Loading & Error Boundaries */}
          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-[200px] w-full bg-muted/60 rounded-xl border border-muted/50" />
              <div className="h-[300px] w-full bg-muted/60 rounded-xl border border-muted/50" />
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center min-h-[45vh]">
              <ErrorCard
                message={error instanceof Error ? error.message : 'Could not retrieve worker details.'}
                reset={refetch}
              />
            </div>
          ) : !worker ? (
            <div className="text-center py-20 bg-card border border-border rounded-xl">
              <p className="text-muted-foreground text-sm">Worker not found.</p>
            </div>
          ) : isEditing ? (
            /* Editing form view */
            <WorkerForm
              initialData={{
                id: worker.id,
                name: worker.name,
                email: worker.email,
                phone: worker.phone,
                status: worker.status,
                hourlyRate: worker.hourlyRate,
                skills: worker.skills,
                siteId: worker.siteId,
                createdAt: worker.createdAt,
              }}
              onSubmit={handleEditSubmit}
              onCancel={() => {
                setErrorMsg(null);
                setIsEditing(false);
                router.replace(`/workers/${id}`);
              }}
              isLoading={updateWorkerMutation.isPending}
            />
          ) : (
            /* Detail card view */
            <WorkerDetailsCard
              worker={worker}
              onBack={() => router.push('/workers')}
              onEdit={() => setIsEditing(true)}
              onDelete={() => setIsDeleteOpen(true)}
            />
          )}

          {/* Delete Dialog popup confirmation */}
          <DeleteDialog
            isOpen={isDeleteOpen}
            workerName={worker?.name || ''}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={handleDeleteConfirm}
            isLoading={deleteMutation.isPending}
          />

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default function WorkerDetailsPage() {
  return (
    <Suspense
      fallback={
        <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR', 'CONTRACTOR']}>
          <DashboardLayout>
            <div className="mx-auto max-w-4xl space-y-6 relative pb-12">
              <div className="h-[300px] w-full bg-muted/50 rounded-xl border border-muted animate-pulse" />
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      }
    >
      <WorkerDetailsPageContent />
    </Suspense>
  );
}
