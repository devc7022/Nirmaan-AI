'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Error as ErrorCard } from '@/components/ui/error';
import { Button } from '@/components/ui/button';
import { useSites, useDeleteSite } from '@/features/sites/hooks/use-sites';
import { SiteTable } from '@/features/sites/components/SiteTable';
import { SiteCard } from '@/features/sites/components/SiteCard';
import { SiteSearch } from '@/features/sites/components/SiteSearch';
import { SiteFilters } from '@/features/sites/components/SiteFilters';
import { DeleteSiteDialog } from '@/features/sites/components/DeleteSiteDialog';
import { ConstructionSiteStatus, SiteResponse } from '@/features/sites/types';
import { Plus, Building2, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';

function SitesListPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Search & Filter States
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ConstructionSiteStatus | ''>('');
  const [supervisor, setSupervisor] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Delete Dialog State
  const [deletingSite, setDeletingSite] = useState<SiteResponse | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Read message param from URL (redirect toast)
  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setToast({ message, type: 'success' });
      router.replace('/sites');

      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  // Fetch sites with React Query
  const { data, isLoading, isError, error, refetch } = useSites({
    name: search,
    status,
    page,
    size: pageSize,
  });

  const deleteMutation = useDeleteSite();

  // Filter Handlers
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatusChange = (val: ConstructionSiteStatus | '') => {
    setStatus(val);
    setPage(1);
  };

  const handleSupervisorChange = (val: string) => {
    setSupervisor(val);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setStatus('');
    setSupervisor('');
    setPage(1);
  };

  // Actions Callbacks
  const handleView = (id: string) => {
    router.push(`/sites/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/sites/${id}?edit=true`);
  };

  const handleDeleteClick = (id: string) => {
    const site = data?.content.find((s) => s.id === id);
    if (site) {
      setDeletingSite(site);
      setIsDeleteOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingSite) {
      deleteMutation.mutate(deletingSite.id, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setDeletingSite(null);
          setToast({ message: 'Site Deleted successfully', type: 'success' });
          refetch();

          setTimeout(() => setToast(null), 4000);
        },
        onError: (err: any) => {
          setIsDeleteOpen(false);
          setToast({
            message: err.response?.data?.message || 'Failed to delete construction site',
            type: 'error',
          });
          setTimeout(() => setToast(null), 5000);
        },
      });
    }
  };

  // Client-side overlay for supervisor or address filtering if specified
  const unfilteredSites = data?.content || [];
  const displayedSites = supervisor
    ? unfilteredSites.filter((s) =>
        (s.supervisor || s.builderName || s.clientName || '')
          .toLowerCase()
          .includes(supervisor.toLowerCase())
      )
    : unfilteredSites;

  // Pagination bounds
  const totalElements = data?.totalElements || 0;
  const totalPages = data?.totalPages || 1;
  const startElement = totalElements > 0 ? (page - 1) * pageSize + 1 : 0;
  const endElement = Math.min(page * pageSize, totalElements);

  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'SUPERVISOR', 'CONTRACTOR']}>
      <DashboardLayout>
        <div className="mx-auto max-w-7xl space-y-6 relative pb-12">
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

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground bg-clip-text">
                Construction Sites
              </h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Manage construction site locations, supervisor assignments, and workforce status
              </p>
            </div>
            <Button
              onClick={() => router.push('/sites/new')}
              className="flex items-center gap-2 font-semibold shadow-md self-start sm:self-center"
            >
              <Plus className="h-4.5 w-4.5" />
              Create Site
            </Button>
          </div>

          {/* Search & Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
            <div className="w-full sm:w-80 sm:shrink-0">
              <SiteSearch value={search} onSearchChange={handleSearchChange} />
            </div>
            <SiteFilters
              selectedStatus={status}
              selectedSupervisor={supervisor}
              onStatusChange={handleStatusChange}
              onSupervisorChange={handleSupervisorChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-[400px] w-full bg-muted/50 rounded-xl border border-muted animate-pulse" />
            </div>
          ) : isError ? (
            /* Error State */
            <div className="flex items-center justify-center min-h-[40vh]">
              <ErrorCard
                message={
                  error instanceof Error
                    ? error.message
                    : 'Could not retrieve construction sites list from the server.'
                }
                reset={refetch}
              />
            </div>
          ) : displayedSites.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center bg-card/40 border border-border rounded-2xl max-w-md mx-auto shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No construction sites found</h3>
              <p className="text-xs text-muted-foreground mt-2 mb-6 max-w-[280px] mx-auto">
                {search || status || supervisor
                  ? 'Try adjusting your search query or filter parameters.'
                  : 'Get started by creating your first construction site project.'}
              </p>
              <Button onClick={() => router.push('/sites/new')} className="font-semibold shadow-sm">
                Create Site
              </Button>
            </div>
          ) : (
            /* Sites Table & Cards */
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <SiteTable
                  sites={displayedSites}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              </div>

              {/* Mobile Card Grid View */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {displayedSites.map((site) => (
                  <SiteCard
                    key={site.id}
                    site={site}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/30 border border-border rounded-xl p-4 shadow-sm text-sm">
                <div className="text-muted-foreground font-medium">
                  Showing <span className="font-semibold text-foreground">{startElement}</span> to{' '}
                  <span className="font-semibold text-foreground">{endElement}</span> of{' '}
                  <span className="font-semibold text-foreground">{totalElements}</span> sites
                </div>

                <div className="flex items-center gap-6">
                  {/* Rows Per Page */}
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

                  {/* Nav Buttons */}
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

          {/* Delete Site Dialog */}
          <DeleteSiteDialog
            isOpen={isDeleteOpen}
            siteName={deletingSite?.name || ''}
            onClose={() => {
              setIsDeleteOpen(false);
              setDeletingSite(null);
            }}
            onConfirm={handleDeleteConfirm}
            isLoading={deleteMutation.isPending}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default function SitesListPage() {
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
      <SitesListPageContent />
    </Suspense>
  );
}
