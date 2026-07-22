'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { SiteForm } from '@/features/sites/components/SiteForm';
import { useCreateSite } from '@/features/sites/hooks/use-sites';
import { SiteInput } from '@/features/sites/schemas/site-schema';
import { SiteRequest } from '@/features/sites/types';
import { AlertCircle } from 'lucide-react';

export default function CreateSitePage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const createSiteMutation = useCreateSite();

  const handleSubmit = (formData: SiteInput) => {
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

    createSiteMutation.mutate(requestData, {
      onSuccess: () => {
        router.push('/sites?message=Site Created successfully');
      },
      onError: (err: any) => {
        const backendMessage =
          err.response?.data?.message || err.response?.data?.error || err.message;
        if (backendMessage) {
          setErrorMsg(backendMessage);
        } else if (err.response?.status === 409) {
          setErrorMsg('A construction site with this name or address already exists.');
        } else {
          setErrorMsg('An error occurred while creating the construction site. Please try again.');
        }
      },
    });
  };

  const handleCancel = () => {
    router.push('/sites');
  };

  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR', 'CONTRACTOR']}>
      <DashboardLayout>
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Page Heading */}
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground bg-clip-text">
              Create Construction Site
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Register a new construction site location, builder, supervisor, and project dates
            </p>
          </div>

          {/* Error Message Card */}
          {errorMsg && (
            <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-semibold shadow-sm animate-shake">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMsg}</div>
            </div>
          )}

          {/* Form */}
          <SiteForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createSiteMutation.isPending}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
