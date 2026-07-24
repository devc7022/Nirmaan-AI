'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAIAttendance } from '../hooks/useAIAttendance';
import { AttendancePreviewCard } from './AttendancePreviewCard';
import { AttendanceAIResponse } from '../types';
import { Sparkles, Loader2, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';
import attendanceService from '@/features/attendance/services/attendance-service';

interface AIAttendanceCardProps {
  onShowToast?: (message: string, type: 'success' | 'error') => void;
}

export const AIAttendanceCard: React.FC<AIAttendanceCardProps> = ({ onShowToast }) => {
  const [inputText, setInputText] = useState('');
  const [extractedData, setExtractedData] = useState<AttendanceAIResponse | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { mutate: parseAttendance, isPending, isError, error, reset } = useAIAttendance();

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setExtractedData(null);
    reset();

    parseAttendance(
      { text: inputText },
      {
        onSuccess: (data) => {
          setExtractedData(data);
        },
        onError: (err) => {
          if (onShowToast) {
            onShowToast(err.message || 'Failed to analyze attendance statement.', 'error');
          }
        },
      }
    );
  };

  const handleConfirm = async () => {
    if (!extractedData) return;
    setIsSaving(true);

    try {
      // Create attendance record(s)
      const records = extractedData.records || [
        {
          workerName: extractedData.workerName || 'Worker',
          siteName: extractedData.siteName || 'Construction Site',
          attendanceDate: extractedData.attendanceDate || new Date().toISOString().split('T')[0],
          hoursWorked: extractedData.hoursWorked ?? 8,
          present: extractedData.present ?? true,
          remarks: extractedData.remarks,
        },
      ];

      // Retrieve worker & site options to link IDs if available
      let workerId = '1';
      let siteId = '1';
      try {
        const [workers, sites] = await Promise.all([
          attendanceService.getWorkerOptions(),
          attendanceService.getSiteOptions(),
        ]);
        if (workers.length > 0) workerId = workers[0].id;
        if (sites.length > 0) siteId = sites[0].id;
      } catch {
        // Fallback default IDs
      }

      for (const rec of records) {
        await attendanceService.createAttendance({
          workerId: rec.workerId || workerId,
          siteId: rec.siteId || siteId,
          attendanceDate: rec.attendanceDate,
          hoursWorked: rec.hoursWorked,
          present: rec.present,
          remarks: rec.remarks || 'Recorded via AI Assistant',
        });
      }

      if (onShowToast) {
        onShowToast('Attendance Saved Successfully', 'success');
      }

      // Clear input and extracted data
      setInputText('');
      setExtractedData(null);
    } catch (err: any) {
      if (onShowToast) {
        onShowToast(err.message || 'Failed to save attendance record.', 'error');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setExtractedData(null);
    reset();
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/60 bg-card/50 backdrop-blur shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Natural Language Attendance Logging</CardTitle>
              <CardDescription>
                Type or paste daily attendance statements. AI will automatically extract workers, sites, dates, and hours.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Example: Ramesh and Mohit worked 8 hours today at Metro Site."
            rows={4}
            className="resize-none font-medium text-sm focus-visible:ring-primary"
            disabled={isPending || isSaving}
          />

          {isError && (
            <Alert variant="destructive" className="animate-in fade-in duration-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Extraction Error</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>{error?.message || 'Unable to parse attendance statement. Please try again.'}</span>
                <Button size="sm" variant="outline" onClick={handleAnalyze} className="ml-2 gap-1 text-xs">
                  <RefreshCw className="h-3.5 w-3.5" /> Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex justify-between items-center border-t border-border/40 pt-4">
          <p className="text-xs text-muted-foreground">
            Supports multiple workers, hours, site names, and absent logs in plain English.
          </p>
          <Button
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isPending || isSaving}
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing Attendance...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analyze Attendance
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Extracted Preview Card */}
      {extractedData && (
        <AttendancePreviewCard
          data={extractedData}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};
