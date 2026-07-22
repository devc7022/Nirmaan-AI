'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Error as ErrorCard } from '@/components/ui/error';
import { SiteDetailsCard } from '@/features/sites/components/SiteDetailsCard';
import { SiteForm } from '@/features/sites/components/SiteForm';
import { useSite, useUpdateSite } from '@/features/sites/hooks/use-sites';
import { SiteInput } from '@/features/sites/schemas/site-schema';
import { SiteRequest } from '@/features/sites/types';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface SiteDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function SiteDetailPage({ params }: SiteDetailPageProps) {
  const resolvedParams = use(params);
  const siteId = resolvedParams.id;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Check if edit mode is requested via URL param (e.g. /sites/[id]?edit=true)
  useEffect(() => {
    if (searchParams.get('edit') === 'true') {
      setIsEditing(true);
    }
  }, [searchParams]);

  // Query site details
  const { data: site, isLoading, isError, error, refetch } = useSite(siteId);
  const updateMutation = useUpdateSite();

  const handleUpdate = (formData: SiteInput) => {
    setErrorMsg(null);

    const requestData: SiteRequest = {
      name: formData.name,
      address: formData.address,
      clientName: formData.builderName,
      supervisor: formData.supervisor,
      status: formData.status,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
      workerIds: formData.workerIds,
    };

    updateMutation.mutate(
      { id: siteId, data: requestData },
      {
        onSuccess: () => {
          setIsEditing(false);
          setToast({ message: 'Site Updated successfully', type: 'success' });
          router.replace(`/sites/${siteId}`);
          refetch();

          setTimeout(() => setToast(null), 4000);
        },
        onError: (err: any) => {
          const backendMessage =
            err.response?.data?.message || err.response?.data?.error || err.message;
          if (backendMessage) {
            setErrorMsg(backendMessage);
          } else {
            setErrorMsg('Failed to update construction site details. Please try again.');
          }
        },
      }
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrorMsg(null);
    router.replace(`/sites/${siteId}`);
  };

  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR', 'CONTRACTOR']}>
      <DashboardLayout>
        <div className="mx-auto max-w-5xl space-y-6 relative pb-12">
          {/* Success Toast */}
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
              <div className="h-[300px] w-full bg-muted/50 rounded-xl border border-muted animate-pulse" />
              <div className="h-[200px] w-full bg-muted/50 rounded-xl border border-muted animate-pulse" />
            </div>
          ) : isError || !site ? (
            /* Error State */
            <div className="flex items-center justify-center min-h-[40vh]">
              <ErrorCard
                message={
                  error instanceof Error
                    ? error.message
                    : 'Construction site record not found or server error.'
                }
                reset={refetch}
              />
            </div>
          ) : isEditing ? (
            /* Edit Mode View */
            <div className="mx-auto max-w-2xl space-y-6">
              <div>
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                  Edit Construction Site
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  Update site information, status, supervisor, and scheduled dates
                </p>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-semibold shadow-sm animate-shake">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="flex-1">{errorMsg}</div>
                </div>
              )}

              <SiteForm
                initialData={site}
                onSubmit={handleUpdate}
                onCancel={handleCancelEdit}
                isLoading={updateMutation.isPending}
              />
            </div>
          ) : (
            /* Details Mode View */
            <SiteDetailsCard
              site={site}
              onEdit={() => setIsEditing(true)}
              onBack={() => router.push('/sites')}
            />
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
