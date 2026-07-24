import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { attendanceSchema, AttendanceInput } from '../schemas/attendance-schema';
import { AttendanceResponse } from '../types';
import { useWorkerOptions, useSiteOptions } from '../hooks/use-attendance';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface AttendanceFormProps {
  initialData?: AttendanceResponse;
  onSubmit: (data: AttendanceInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const AttendanceForm: React.FC<AttendanceFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const isEditMode = !!initialData;

  const { data: workers, isLoading: isLoadingWorkers } = useWorkerOptions();
  const { data: sites, isLoading: isLoadingSites } = useSiteOptions();

  const defaultValues: AttendanceInput = isEditMode && initialData
    ? {
        workerId: initialData.workerId || '',
        siteId: initialData.siteId || '',
        attendanceDate: initialData.attendanceDate
          ? new Date(initialData.attendanceDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        hoursWorked: initialData.hoursWorked ?? 8,
        present: initialData.present ?? true,
        remarks: initialData.remarks || '',
      }
    : {
        workerId: '',
        siteId: '',
        attendanceDate: new Date().toISOString().split('T')[0],
        hoursWorked: 8,
        present: true,
        remarks: '',
      };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AttendanceInput>({
    resolver: zodResolver(attendanceSchema),
    defaultValues,
  });

  const watchPresent = watch('present');
  const watchHoursWorked = watch('hoursWorked');
  const watchWorkerId = watch('workerId');

  // Business Rule 1: If Present = false -> set Hours Worked = 0
  useEffect(() => {
    if (watchPresent === false) {
      setValue('hoursWorked', 0, { shouldValidate: true });
    }
  }, [watchPresent, setValue]);

  // Business Rule 2: If Hours Worked > 0 -> automatically set Present = true
  useEffect(() => {
    if (watchHoursWorked > 0 && watchPresent === false) {
      setValue('present', true, { shouldValidate: true });
    }
  }, [watchHoursWorked, watchPresent, setValue]);

  // Auto select assigned site if worker is selected and site is not set
  useEffect(() => {
    if (watchWorkerId && workers) {
      const selectedWorker = workers.find((w) => w.id === watchWorkerId);
      if (selectedWorker && selectedWorker.siteId) {
        setValue('siteId', selectedWorker.siteId);
      }
    }
  }, [watchWorkerId, workers, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl bg-card/40 backdrop-blur-sm border border-border p-6 rounded-2xl shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Worker */}
        <div className="space-y-2">
          <Label htmlFor="workerId">Site Worker *</Label>
          <select
            id="workerId"
            disabled={isLoading || isLoadingWorkers}
            className={`w-full h-10 px-3 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
              errors.workerId ? 'border-destructive' : ''
            }`}
            {...register('workerId')}
          >
            <option value="">Select Worker</option>
            {workers?.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.name} {worker.siteName ? `(${worker.siteName})` : ''}
              </option>
            ))}
          </select>
          {errors.workerId && (
            <p className="text-xs text-destructive font-medium">{errors.workerId.message}</p>
          )}
        </div>

        {/* Construction Site */}
        <div className="space-y-2">
          <Label htmlFor="siteId">Construction Site *</Label>
          <select
            id="siteId"
            disabled={isLoading || isLoadingSites}
            className={`w-full h-10 px-3 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
              errors.siteId ? 'border-destructive' : ''
            }`}
            {...register('siteId')}
          >
            <option value="">Select Construction Site</option>
            {sites?.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
          {errors.siteId && (
            <p className="text-xs text-destructive font-medium">{errors.siteId.message}</p>
          )}
        </div>

        {/* Attendance Date */}
        <div className="space-y-2">
          <Label htmlFor="attendanceDate">Attendance Date *</Label>
          <Input
            id="attendanceDate"
            type="date"
            disabled={isLoading}
            className={errors.attendanceDate ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('attendanceDate')}
          />
          {errors.attendanceDate && (
            <p className="text-xs text-destructive font-medium">{errors.attendanceDate.message}</p>
          )}
        </div>

        {/* Present Status (Switch / Toggle) */}
        <div className="space-y-2 flex flex-col justify-end">
          <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-card/60">
            <div>
              <Label htmlFor="present" className="font-semibold text-sm cursor-pointer">
                Present Status
              </Label>
              <p className="text-xs text-muted-foreground">Is worker present today?</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                id="present"
                type="checkbox"
                disabled={isLoading}
                checked={watchPresent}
                onChange={(e) => setValue('present', e.target.checked, { shouldValidate: true })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>

        {/* Hours Worked */}
        <div className="space-y-2">
          <Label htmlFor="hoursWorked">Hours Worked (0 - 24) *</Label>
          <Input
            id="hoursWorked"
            type="number"
            step="0.5"
            min="0"
            max="24"
            disabled={isLoading || !watchPresent}
            placeholder="8"
            className={errors.hoursWorked ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('hoursWorked', { valueAsNumber: true })}
          />
          {!watchPresent && (
            <p className="text-[11px] text-amber-500 font-medium">
              Disabled because Present status is turned off.
            </p>
          )}
          {errors.hoursWorked && (
            <p className="text-xs text-destructive font-medium">{errors.hoursWorked.message}</p>
          )}
        </div>

        {/* Remarks */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="remarks">Remarks / Work Summary (Optional)</Label>
          <textarea
            id="remarks"
            rows={3}
            maxLength={500}
            placeholder="Add any specific task details, overtime notes, or site observations..."
            disabled={isLoading}
            className="w-full p-3 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            {...register('remarks')}
          />
          {errors.remarks && (
            <p className="text-xs text-destructive font-medium">{errors.remarks.message}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="px-5 font-semibold"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="px-5 font-semibold">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Attendance...
            </>
          ) : isEditMode ? (
            'Update Attendance'
          ) : (
            'Mark Attendance'
          )}
        </Button>
      </div>
    </form>
  );
};

export default AttendanceForm;
