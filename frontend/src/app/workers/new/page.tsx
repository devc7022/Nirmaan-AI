'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { WorkerForm } from '@/features/workers/components/WorkerForm';
import { useCreateWorker } from '@/features/workers/hooks/use-workers';
import { WorkerInput } from '@/features/workers/schemas/worker-schema';
import { WorkerRequest } from '@/features/workers/types';
import { AlertCircle } from 'lucide-react';

export default function CreateWorkerPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const createWorkerMutation = useCreateWorker();

  const handleSubmit = (formData: WorkerInput) => {
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

    createWorkerMutation.mutate(requestData, {
      onSuccess: () => {
        // Redirect with message param to show success toast on workers list page
        router.push('/workers?message=Worker registered successfully');
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
    });
  };

  const handleCancel = () => {
    router.push('/workers');
  };

  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR', 'CONTRACTOR']}>
      <DashboardLayout>
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Page Heading */}
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground bg-clip-text">
              Register New Worker
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Create a new profile to track attendance and compute daily labour wages
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
          <WorkerForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createWorkerMutation.isPending}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
