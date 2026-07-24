'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/protected-route';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Error as ErrorCard } from '@/components/ui/error';
import { Button } from '@/components/ui/button';
import { useAttendance, useDeleteAttendance } from '@/features/attendance/hooks/use-attendance';
import { AttendanceTable } from '@/features/attendance/components/AttendanceTable';
import { AttendanceCard } from '@/features/attendance/components/AttendanceCard';
import { AttendanceSearch } from '@/features/attendance/components/AttendanceSearch';
import { AttendanceFilters } from '@/features/attendance/components/AttendanceFilters';
import { DeleteAttendanceDialog } from '@/features/attendance/components/DeleteAttendanceDialog';
import { AttendanceResponse } from '@/features/attendance/types';
import {
  Plus,
  ClipboardCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Bot,
  Wand2,
} from 'lucide-react';

function AttendanceListPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Search, Filter & Sort States
  const [search, setSearch] = useState('');
  const [siteId, setSiteId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<boolean | ''>('');
  const [sort, setSort] = useState('attendanceDate,desc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Delete Dialog State
  const [deletingRecord, setDeletingRecord] = useState<AttendanceResponse | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Read message param from URL
  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setToast({ message, type: 'success' });
      router.replace('/attendance');

      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  // Fetch Attendance Records
  const { data, isLoading, isError, error, refetch } = useAttendance({
    siteId: siteId || undefined,
    attendanceDate: date || undefined,
    present: status,
    page,
    size: pageSize,
    sort,
  });

  const deleteMutation = useDeleteAttendance();

  // Filter Handlers
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleSiteChange = (val: string) => {
    setSiteId(val);
    setPage(1);
  };

  const handleDateChange = (val: string) => {
    setDate(val);
    setPage(1);
  };

  const handleStatusChange = (val: boolean | '') => {
    setStatus(val);
    setPage(1);
  };

  const handleSortChange = (val: string) => {
    setSort(val);
    setPage(1);
  };

  const handleTableSortToggle = (field: string) => {
    if (sort.startsWith(field)) {
      setSort(sort.endsWith(',desc') ? `${field},asc` : `${field},desc`);
    } else {
      setSort(`${field},desc`);
    }
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSiteId('');
    setDate('');
    setStatus('');
    setSort('attendanceDate,desc');
    setPage(1);
  };

  // Actions Handlers
  const handleView = (id: string) => {
    router.push(`/attendance/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/attendance/${id}?edit=true`);
  };

  const handleDeleteClick = (id: string) => {
    const record = data?.content.find((r) => r.id === id);
    if (record) {
      setDeletingRecord(record);
      setIsDeleteOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingRecord) {
      deleteMutation.mutate(deletingRecord.id, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setDeletingRecord(null);
          setToast({ message: 'Attendance Deleted successfully', type: 'success' });
          refetch();

          setTimeout(() => setToast(null), 4000);
        },
        onError: (err: any) => {
          setIsDeleteOpen(false);
          setToast({
            message: err.response?.data?.message || 'Failed to delete attendance record',
            type: 'error',
          });
          setTimeout(() => setToast(null), 5000);
        },
      });
    }
  };

  // Client-side search filtering by worker name if backend search parameter isn't directly on query
  const rawList = data?.content || [];
  const displayedAttendance = search
    ? rawList.filter((r) => r.workerName.toLowerCase().includes(search.toLowerCase()))
    : rawList;

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

          {/* AI ATTENDANCE BONUS PANEL */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-orange-500/10 to-amber-500/10 p-6 backdrop-blur-md shadow-md">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-primary to-orange-500 text-white shadow-lg shrink-0">
                  <Bot className="h-7 w-7 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                      AI Automated Attendance Panel
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-primary/20 text-primary border border-primary/30">
                      <Sparkles className="h-3 w-3" />
                      Next Gen AI
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
                    Log daily worker presence instantly via Face Recognition, Voice Commands, and Automated OCR Roster Scans.
                  </p>
                </div>
              </div>

              <Button
                disabled
                className="flex items-center gap-2 font-bold bg-muted/60 text-muted-foreground border border-border/80 cursor-not-allowed shrink-0 self-start sm:self-center shadow-none hover:bg-muted/60"
              >
                <Wand2 className="h-4 w-4 text-primary" />
                Coming Soon - AI Attendance
              </Button>
            </div>
          </div>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground tracking-tight bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground bg-clip-text">
                Attendance Management
              </h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Track daily site worker presence, log work hours, and manage attendance records
              </p>
            </div>
            <Button
              onClick={() => router.push('/attendance/new')}
              className="flex items-center gap-2 font-semibold shadow-md self-start sm:self-center"
            >
              <Plus className="h-4.5 w-4.5" />
              Mark Attendance
            </Button>
          </div>

          {/* Search & Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
            <div className="w-full sm:w-80 sm:shrink-0">
              <AttendanceSearch value={search} onSearchChange={handleSearchChange} />
            </div>
            <AttendanceFilters
              selectedSiteId={siteId}
              selectedDate={date}
              selectedStatus={status}
              selectedSort={sort}
              onSiteChange={handleSiteChange}
              onDateChange={handleDateChange}
              onStatusChange={handleStatusChange}
              onSortChange={handleSortChange}
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
                    : 'Could not retrieve attendance records from the server.'
                }
                reset={refetch}
              />
            </div>
          ) : displayedAttendance.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center bg-card/40 border border-border rounded-2xl max-w-md mx-auto shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <ClipboardCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No attendance records found.</h3>
              <p className="text-xs text-muted-foreground mt-2 mb-6 max-w-[280px] mx-auto">
                {search || siteId || date || status !== ''
                  ? 'Try relaxing your search phrase or active filters.'
                  : 'Start tracking workforce presence by marking your first attendance entry.'}
              </p>
              <Button
                onClick={() => router.push('/attendance/new')}
                className="font-semibold shadow-sm"
              >
                Mark Attendance
              </Button>
            </div>
          ) : (
            /* Attendance Table & Cards */
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <AttendanceTable
                  attendanceList={displayedAttendance}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                  sortField={sort.split(',')[0]}
                  sortOrder={sort.split(',')[1] as 'asc' | 'desc'}
                  onSortChange={handleTableSortToggle}
                />
              </div>

              {/* Mobile Cards View */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {displayedAttendance.map((record) => (
                  <AttendanceCard
                    key={record.id}
                    record={record}
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
                  <span className="font-semibold text-foreground">{totalElements}</span> records
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

          {/* Delete Dialog */}
          <DeleteAttendanceDialog
            isOpen={isDeleteOpen}
            workerName={deletingRecord?.workerName || ''}
            attendanceDate={deletingRecord?.attendanceDate}
            onClose={() => {
              setIsDeleteOpen(false);
              setDeletingRecord(null);
            }}
            onConfirm={handleDeleteConfirm}
            isLoading={deleteMutation.isPending}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

export default function AttendanceListPage() {
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
      <AttendanceListPageContent />
    </Suspense>
  );
}
