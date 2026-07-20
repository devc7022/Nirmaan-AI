import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { workerSchema, WorkerInput } from '../schemas/worker-schema';
import { useSites } from '../hooks/use-workers';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface WorkerFormProps {
  initialData?: {
    id: string;
    name: string;
    email: string | null;
    phone: string;
    status: 'ACTIVE' | 'INACTIVE';
    hourlyRate: number;
    skills: string[];
    siteId: string | null;
    createdAt: string;
  };
  onSubmit: (data: WorkerInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const WorkerForm: React.FC<WorkerFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const { data: sites, isLoading: isLoadingSites, isError: isErrorSites } = useSites();
  const isEditMode = !!initialData;

  // Set default values based on whether we are in create or edit mode
  const defaultValues: WorkerInput = isEditMode && initialData
    ? {
      workerNumber: `WRK-${initialData.id.substring(0, 8).toUpperCase()}`,
      fullName: initialData.name,
      phone: initialData.phone,
      address: 'Mumbai, Maharashtra', // Mock placeholder address
      skill: initialData.skills[0] || 'Laboring',
      dailyWage: initialData.hourlyRate * 8, // Conversion: Daily Wage = hourlyRate * 8
      joiningDate: initialData.createdAt
        ? new Date(initialData.createdAt).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      siteId: initialData.siteId || '',
      status: initialData.status,
      photoUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initialData.name)}`,
    }
    : {
      workerNumber: `WRK-${Math.floor(100000 + Math.random() * 900000)}`, // Auto generate code
      fullName: '',
      phone: '',
      address: '',
      skill: '',
      dailyWage: 0,
      joiningDate: new Date().toISOString().split('T')[0],
      siteId: '',
      status: 'ACTIVE',
      photoUrl: '',
    };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkerInput>({
    resolver: zodResolver(workerSchema),
    defaultValues,
  });

  const skillOptions = [
    'Masonry',
    'Plumbing',
    'Carpentry',
    'Electrical',
    'Welding',
    'Painting',
    'Scaffolding',
    'Laboring',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-card/40 backdrop-blur-sm border border-border p-6 rounded-2xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Worker Number (disabled in edit mode) */}
        <div className="space-y-2">
          <Label htmlFor="workerNumber">Worker ID (Unique Code)</Label>
          <Input
            id="workerNumber"
            disabled={true} // Worker Number should be immutable/readOnly as requested
            className="bg-muted/50 cursor-not-allowed font-mono font-semibold"
            {...register('workerNumber')}
          />
          {errors.workerNumber && (
            <p className="text-xs text-destructive font-medium">{errors.workerNumber.message}</p>
          )}
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="Aarav Sharma"
            disabled={isLoading}
            className={errors.fullName ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive font-medium">{errors.fullName.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (Indian) *</Label>
          <Input
            id="phone"
            placeholder="9876543210"
            disabled={isLoading}
            className={errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-xs text-destructive font-medium">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address">Residential Address</Label>
          <Input
            id="address"
            placeholder="Flat 101, Bandra West, Mumbai"
            disabled={isLoading}
            {...register('address')}
          />
        </div>

        {/* Skill */}
        <div className="space-y-2">
          <Label htmlFor="skill">Skill Classification *</Label>
          <select
            id="skill"
            disabled={isLoading}
            className={`w-full h-10 px-3 border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.skill ? 'border-destructive' : 'border-border'
              }`}
            {...register('skill')}
          >
            <option value="">Select Skill</option>
            {skillOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.skill && (
            <p className="text-xs text-destructive font-medium">{errors.skill.message}</p>
          )}
        </div>

        {/* Daily Wage */}
        <div className="space-y-2">
          <Label htmlFor="dailyWage">Daily Wage (INR) *</Label>
          <Input
            id="dailyWage"
            type="number"
            placeholder="500"
            disabled={isLoading}
            className={errors.dailyWage ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('dailyWage', { valueAsNumber: true })}
          />
          {errors.dailyWage && (
            <p className="text-xs text-destructive font-medium">{errors.dailyWage.message}</p>
          )}
        </div>

        {/* Joining Date */}
        <div className="space-y-2">
          <Label htmlFor="joiningDate">Joining Date *</Label>
          <Input
            id="joiningDate"
            type="date"
            disabled={isLoading}
            className={errors.joiningDate ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('joiningDate')}
          />
          {errors.joiningDate && (
            <p className="text-xs text-destructive font-medium">{errors.joiningDate.message}</p>
          )}
        </div>

        {/* Assigned Site */}
        <div className="space-y-2">
          <Label htmlFor="siteId">Assigned Construction Site</Label>
          <select
            id="siteId"
            disabled={isLoading || isLoadingSites}
            className={`w-full h-10 px-3 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring`}
            {...register('siteId')}
          >
            <option value="">Unassigned</option>
            {sites?.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name} ({site.status})
              </option>
            ))}
          </select>
          {isErrorSites && (
            <p className="text-xs text-amber-500 font-medium">Failed to load sites options.</p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Work Status *</Label>
          <select
            id="status"
            disabled={isLoading}
            className="w-full h-10 px-3 border border-border rounded-md text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            {...register('status')}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        {/* Photo URL */}
        <div className="space-y-2">
          <Label htmlFor="photoUrl">Photo URL (Optional)</Label>
          <Input
            id="photoUrl"
            placeholder="https://example.com/avatar.jpg"
            disabled={isLoading}
            className={errors.photoUrl ? 'border-destructive focus-visible:ring-destructive' : ''}
            {...register('photoUrl')}
          />
          {errors.photoUrl && (
            <p className="text-xs text-destructive font-medium">{errors.photoUrl.message}</p>
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
        <Button
          type="submit"
          disabled={isLoading}
          className="px-5 font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Profile...
            </>
          ) : (
            isEditMode ? 'Update Worker' : 'Add Worker'
          )}
        </Button>
      </div>
    </form>
  );
};

export default WorkerForm;
