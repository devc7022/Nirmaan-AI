'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Error as ErrorCard } from '@/components/ui/error';
import { Button } from '@/components/ui/button';
import { useWorkers, useDeleteWorker } from '@/features/workers/hooks/use-workers';
import { WorkerTable } from '@/features/workers/components/WorkerTable';
import { WorkerCard } from '@/features/workers/components/WorkerCard';
import { WorkerSearch } from '@/features/workers/components/WorkerSearch';
import { WorkerFilters } from '@/features/workers/components/WorkerFilters';
import { DeleteDialog } from '@/features/workers/components/DeleteDialog';
import { WorkerStatus, WorkerResponse } from '@/features/workers/types';
import { Plus, Users, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';

function WorkersListPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Success toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Search & Filter States
  const [search, setSearch] = useState('');
  const [skill, setSkill] = useState('');
  const [siteId, setSiteId] = useState('');
  const [status, setStatus] = useState<WorkerStatus | ''>('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Delete Dialog States
  const [deletingWorker, setDeletingWorker] = useState<WorkerResponse | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Read toasts from router query params (e.g. from create/edit redirect)
  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setToast({ message, type: 'success' });
      // Clear URL params
      router.replace('/workers');

      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  // Query workers
  const { data, isLoading, isError, error, refetch } = useWorkers({
    name: search,
    skill,
    status,
    page,
    size: pageSize,
  });

  const deleteMutation = useDeleteWorker();

  // Reset to page 1 on filter changes
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleSkillChange = (val: string) => {
    setSkill(val);
    setPage(1);
  };

  const handleSiteChange = (val: string) => {
    setSiteId(val);
    setPage(1);
  };

  const handleStatusChange = (val: WorkerStatus | '') => {
    setStatus(val);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSkill('');
    setSiteId('');
    setStatus('');
    setPage(1);
  };

  // Actions callbacks
  const handleView = (id: string) => {
    router.push(`/workers/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/workers/${id}?edit=true`);
  };

  const handleDeleteClick = (id: string) => {
    const worker = data?.content.find((w) => w.id === id);
    if (worker) {
      setDeletingWorker(worker);
      setIsDeleteOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingWorker) {
      deleteMutation.mutate(deletingWorker.id, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setDeletingWorker(null);
          setToast({ message: 'Worker Deleted successfully', type: 'success' });
          refetch();

          setTimeout(() => setToast(null), 4000);
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
    }
  };

  // Client-side site filtering overlay (due to lack of backend site parameter in worker list)
  const unfilteredWorkers = data?.content || [];
  const displayedWorkers = siteId
    ? unfilteredWorkers.filter((w) => w.siteId === siteId)
    : unfilteredWorkers;

  // Pagination calculation
  const totalElements = data?.totalElements || 0;
  const totalPages = data?.totalPages || 1;
  const startElement = (page - 1) * pageSize + 1;
  const endElement = Math.min(page * pageSize, totalElements);

  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR', 'CONTRACTOR']}>
      <DashboardLayout>
        <div className="mx-auto max-w-7xl space-y-6 relative pb-12">

          {/* Success Toast */}
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

          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground bg-clip-text">
                Workforce Management
              </h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                View, register, and manage active site contractors and workers
              </p>
            </div>
            <Button
              onClick={() => router.push('/workers/new')}
              className="flex items-center gap-2 font-semibold shadow-md self-start sm:self-center"
            >
              <Plus className="h-4.5 w-4.5" />
              Add Worker
            </Button>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
            <div className="w-full sm:w-80 sm:shrink-0">
              <WorkerSearch value={search} onSearchChange={handleSearchChange} />
            </div>
            <WorkerFilters
              selectedSkill={skill}
              selectedSiteId={siteId}
              selectedStatus={status}
              onSkillChange={handleSkillChange}
              onSiteChange={handleSiteChange}
              onStatusChange={handleStatusChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Content Loading & Error Boundaries */}
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-[400px] w-full bg-muted/50 rounded-xl border border-muted animate-pulse" />
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <ErrorCard
                message={error instanceof Error ? error.message : 'Could not retrieve workers list from the server.'}
                reset={refetch}
              />
            </div>
          ) : displayedWorkers.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center bg-card/40 border border-border rounded-2xl max-w-md mx-auto shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No workers found</h3>
              <p className="text-xs text-muted-foreground mt-2 mb-6 max-w-[280px] mx-auto">
                {search || skill || siteId || status
                  ? 'Try relaxing your filter criteria or search phrase.'
                  : 'Get started by registering your first site worker.'}
              </p>
              <Button
                onClick={() => router.push('/workers/new')}
                className="font-semibold shadow-sm"
              >
                Add Worker
              </Button>
            </div>
          ) : (
            /* Data Tables List */
            <div className="space-y-4">

              {/* Desktop Table View */}
              <div className="hidden md:block">
                <WorkerTable
                  workers={displayedWorkers}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              </div>

              {/* Mobile Grid View */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {displayedWorkers.map((worker) => (
                  <WorkerCard
                    key={worker.id}
                    worker={worker}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>

              {/* Pagination controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/30 border border-border rounded-xl p-4 shadow-sm text-sm">
                <div className="text-muted-foreground font-medium">
                  Showing <span className="font-semibold text-foreground">{startElement}</span> to{' '}
                  <span className="font-semibold text-foreground">{endElement}</span> of{' '}
                  <span className="font-semibold text-foreground">{totalElements}</span> workers
                </div>

                <div className="flex items-center gap-6">
                  {/* Page Size select */}
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground font-medium text-xs">Rows per page:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                      }}
                      className="h-8 px-2 border border-border bg-card text-foreground rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  {/* Nav page buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      title="Previous Page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="text-xs font-bold px-2.5">
                      Page {page} of {totalPages}
                    </div>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      title="Next Page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Delete Dialog popup */}
          <DeleteDialog
            isOpen={isDeleteOpen}
            workerName={deletingWorker?.name || ''}
            onClose={() => {
              setIsDeleteOpen(false);
              setDeletingWorker(null);
            }}
            onConfirm={handleDeleteConfirm}
            isLoading={deleteMutation.isPending}
          />

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default function WorkersListPage() {
  return (
    <Suspense
      fallback={
        <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR', 'CONTRACTOR']}>
          <DashboardLayout>
            <div className="mx-auto max-w-7xl space-y-6 relative pb-12">
              <div className="h-[400px] w-full bg-muted/50 rounded-xl border border-muted animate-pulse" />
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      }
    >
      <WorkersListPageContent />
    </Suspense>
  );
}
