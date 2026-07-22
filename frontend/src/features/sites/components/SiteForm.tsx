import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { siteSchema, SiteInput } from '../schemas/site-schema';
import { SiteResponse } from '../types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SiteFormProps {
  initialData?: SiteResponse;
  onSubmit: (data: SiteInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const SiteForm: React.FC<SiteFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const isEditMode = !!initialData;

  const defaultValues: SiteInput = isEditMode && initialData
    ? {
        name: initialData.name || '',
        address: initialData.address || '',
        builderName: initialData.builderName || initialData.clientName || '',
        supervisor: initialData.supervisor || '',
        startDate: initialData.startDate
          ? new Date(initialData.startDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        endDate: initialData.endDate
          ? new Date(initialData.endDate).toISOString().split('T')[0]
          : new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: initialData.status || 'ACTIVE',
        description: initialData.description || '',
        workerIds: initialData.workers ? initialData.workers.map((w) => w.id) : [],
      }
    : {
        name: '',
        address: '',
        builderName: '',
        supervisor: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'PLANNED',
        description: '',
        workerIds: [],
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SiteInput>({
    resolver: zodResolver(siteSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl bg-card/40 backdrop-blur-sm border border-border p-6 rounded-2xl shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Site Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Site Name *</Label>
          <Input
            id="name"
            placeholder="e.g. Skyline Towers - Phase 1"
            disabled={isLoading}
            className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-xs text-destructive font-medium">{errors.name.message}</p>
          )}
        </div>

        {/* Builder Name */}
        <div className="space-y-2">
          <Label htmlFor="builderName">Builder / Client Name *</Label>
          <Input
            id="builderName"
            placeholder="e.g. DLF Infra Builders"
            disabled={isLoading}
            className={errors.builderName ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('builderName')}
          />
          {errors.builderName && (
            <p className="text-xs text-destructive font-medium">{errors.builderName.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            placeholder="e.g. Plot 42, Sector 62, Noida, UP"
            disabled={isLoading}
            className={errors.address ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('address')}
          />
          {errors.address && (
            <p className="text-xs text-destructive font-medium">{errors.address.message}</p>
          )}
        </div>

        {/* Supervisor */}
        <div className="space-y-2">
          <Label htmlFor="supervisor">Supervisor *</Label>
          <Input
            id="supervisor"
            placeholder="e.g. Rajesh Kumar"
            disabled={isLoading}
            className={errors.supervisor ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('supervisor')}
          />
          {errors.supervisor && (
            <p className="text-xs text-destructive font-medium">{errors.supervisor.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Site Status *</Label>
          <select
            id="status"
            disabled={isLoading}
            className={`w-full h-10 px-3 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
              errors.status ? 'border-destructive' : ''
            }`}
            {...register('status')}
          >
            <option value="PLANNED">PLANNED</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="ON_HOLD">ON_HOLD</option>
          </select>
          {errors.status && (
            <p className="text-xs text-destructive font-medium">{errors.status.message}</p>
          )}
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            disabled={isLoading}
            className={errors.startDate ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('startDate')}
          />
          {errors.startDate && (
            <p className="text-xs text-destructive font-medium">{errors.startDate.message}</p>
          )}
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date *</Label>
          <Input
            id="endDate"
            type="date"
            disabled={isLoading}
            className={errors.endDate ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('endDate')}
          />
          {errors.endDate && (
            <p className="text-xs text-destructive font-medium">{errors.endDate.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <textarea
            id="description"
            rows={3}
            placeholder="Add any specific site details, safety notes, or construction scope..."
            disabled={isLoading}
            className="w-full p-3 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-xs text-destructive font-medium">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
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
              Saving Site...
            </>
          ) : isEditMode ? (
            'Update Construction Site'
          ) : (
            'Create Construction Site'
          )}
        </Button>
      </div>
    </form>
  );
};

export default SiteForm;
