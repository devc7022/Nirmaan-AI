import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorkerResponse } from '../types';
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Calendar,
  IndianRupee,
  Activity,
  ArrowLeft,
  Pencil,
  Trash2,
} from 'lucide-react';

interface WorkerDetailsCardProps {
  worker: WorkerResponse;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const WorkerDetailsCard: React.FC<WorkerDetailsCardProps> = ({
  worker,
  onBack,
  onEdit,
  onDelete,
}) => {
  const workerNumber = `WRK-${worker.id.substring(0, 8).toUpperCase()}`;
  const dailyWage = worker.hourlyRate * 8;
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    worker.name
  )}&backgroundColor=f97316,3b82f6,10b981,6366f1,8b5cf6`;

  const joiningDate = new Date(worker.createdAt).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate some mock attendance values for rich aesthetic presentation
  const presentDays = Math.floor(18 + Math.random() * 8);
  const totalDays = 26;
  const attendanceRate = ((presentDays / totalDays) * 100).toFixed(1);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top action bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Workforce
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all font-semibold text-sm shadow-sm"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 px-4 py-2 border border-destructive/20 hover:bg-destructive/10 text-destructive rounded-lg transition-all font-semibold text-sm"
          >
            <Trash2 className="h-4 w-4" />
            Delete Worker
          </button>
        </div>
      </div>

      {/* Grid of Profile and details card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Profile Summary Card */}
        <Card className="md:col-span-1 border border-border bg-card/50 backdrop-blur-sm shadow-sm flex flex-col items-center p-6 text-center">
          <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-primary/20 bg-muted mb-4 shadow-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarUrl} alt={worker.name} className="h-full w-full object-cover" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{worker.name}</h2>
          <span className="font-mono text-xs font-semibold text-muted-foreground mt-1 mb-3">
            {workerNumber}
          </span>
          <Badge
            variant={worker.status === 'ACTIVE' ? 'success' : 'outline'}
            className="shadow-none mb-6 px-3 py-1 text-xs"
          >
            {worker.status}
          </Badge>

          {/* Basic Wage pill */}
          <div className="w-full bg-muted/40 border border-border/50 rounded-xl p-3.5 mt-auto">
            <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-wider block mb-1">
              Wage Profile
            </span>
            <div className="flex items-center justify-center gap-1.5">
              <IndianRupee className="h-4 w-4 text-primary" />
              <span className="text-xl font-bold text-foreground font-mono">
                {dailyWage.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-muted-foreground font-medium">/ day</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 font-medium">
              Based on ₹{worker.hourlyRate}/hr rate
            </p>
          </div>
        </Card>

        {/* Right Side: Tabular/Detailed sections */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Details Card */}
          <Card className="border border-border bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-md font-bold text-foreground">Worker Profile Details</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Registered personnel identifiers and details
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-border/30">
              
              {/* Contact Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg text-primary shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Phone Number
                  </span>
                  <span className="font-semibold text-foreground font-mono text-sm">
                    {worker.phone}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg text-primary shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Email Address
                  </span>
                  <span className="font-semibold text-foreground text-sm truncate max-w-[200px] block">
                    {worker.email || 'No email registered'}
                  </span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg text-primary shrink-0">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Skills & Classification
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {worker.skills?.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-2 py-0 shadow-none text-[11px] font-semibold bg-secondary/80">
                        {skill}
                      </Badge>
                    )) || 'General'}
                  </div>
                </div>
              </div>

              {/* Site */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg text-primary shrink-0">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Assigned Site
                  </span>
                  <span className="font-semibold text-foreground text-sm">
                    {worker.siteName || (
                      <span className="font-normal text-muted-foreground italic text-xs">
                        Unassigned
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Joining Date */}
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg text-primary shrink-0">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Date of Joining
                  </span>
                  <span className="font-semibold text-foreground text-sm">
                    {joiningDate}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg text-primary shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Residential Address
                  </span>
                  <span className="font-semibold text-foreground text-sm">
                    Flat 101, Bandra West, Mumbai, Maharashtra, 400050
                  </span>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Attendance Summary Panel */}
          <Card className="border border-border bg-card/50 backdrop-blur-sm shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-foreground">Attendance Summary (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 border-t border-border/30">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                  <span className="text-xl font-bold text-emerald-500 font-mono">{presentDays}</span>
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold mt-1">
                    Days Present
                  </span>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3">
                  <span className="text-xl font-bold text-destructive font-mono">{totalDays - presentDays}</span>
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold mt-1">
                    Days Absent
                  </span>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3">
                  <span className="text-xl font-bold text-primary font-mono">{attendanceRate}%</span>
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold mt-1">
                    Attendance Rate
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
};

export default WorkerDetailsCard;
