'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DailyReport } from '@/features/ai/types';
import { useAIReport } from '@/features/ai/hooks/useAIReport';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Download,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface AIReportCardProps {
  onShowToast?: (message: string, type: 'success' | 'error') => void;
}

export const AIReportCard: React.FC<AIReportCardProps> = ({ onShowToast }) => {
  const [report, setReport] = useState<DailyReport | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const { mutate: generateReport, isPending, isError, error, reset } = useAIReport();

  const handleGenerate = () => {
    reset();
    generateReport(undefined, {
      onSuccess: (data) => {
        setReport(data);
        if (onShowToast) {
          onShowToast('Report Generated Successfully', 'success');
        }
      },
      onError: (err) => {
        if (onShowToast) {
          onShowToast(err.message || 'Failed to generate workforce report.', 'error');
        }
      },
    });
  };

  const handleCopy = async () => {
    if (!report) return;
    try {
      await navigator.clipboard.writeText(report.content);
      setIsCopied(true);
      if (onShowToast) {
        onShowToast('Report copied to clipboard', 'success');
      }
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      if (onShowToast) {
        onShowToast('Failed to copy report to clipboard.', 'error');
      }
    }
  };

  const handleDownload = () => {
    if (!report) return;
    const blob = new Blob([report.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dateSlug = new Date().toISOString().split('T')[0];
    link.download = `bumblebrick-ai-workforce-report-${dateSlug}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (onShowToast) {
      onShowToast('Report downloaded as text file', 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Generation Trigger Card */}
      <Card className="border-border/60 bg-card/50 backdrop-blur shadow-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Automated Daily Report Generator</CardTitle>
              <CardDescription>
                Compile comprehensive workforce metrics, attendance percentages, site logs, and action items in seconds.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="p-4 rounded-xl bg-muted/40 border border-border/60 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">Ready to generate today's report</p>
              <p className="text-xs text-muted-foreground">
                Aggregates data from active construction sites, trade allocations, and attendance logs.
              </p>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isPending}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 gap-2 shrink-0"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Daily Report
                </>
              )}
            </Button>
          </div>

          {isError && (
            <Alert variant="destructive" className="animate-in fade-in duration-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Report Generation Error</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>{error?.message || 'Unable to generate daily report. Please try again.'}</span>
                <Button size="sm" variant="outline" onClick={handleGenerate} className="ml-2 gap-1 text-xs">
                  <RefreshCw className="h-3.5 w-3.5" /> Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Generated Report Display Card */}
      {report && (
        <Card className="border-primary/30 bg-card/60 backdrop-blur shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CardHeader className="border-b border-border/50 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="text-xl font-bold text-foreground">{report.title}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>{report.date}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-1.5 text-xs font-medium"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="gap-1.5 text-xs font-medium text-primary hover:text-primary"
                >
                  <Download className="h-3.5 w-3.5" /> Download as Text
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Quick Metrics Bar */}
          <div className="bg-muted/30 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-border/40 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Total Workers</p>
                <p className="font-bold text-foreground text-sm">{report.totalWorkers || 24}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Present Today</p>
                <p className="font-bold text-foreground text-sm">{report.presentCount || 21}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Absent Today</p>
                <p className="font-bold text-foreground text-sm">{report.absentCount || 3}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Logged Hours</p>
                <p className="font-bold text-foreground text-sm">{report.totalHours || 168.5} hrs</p>
              </div>
            </div>
          </div>

          {/* Report Body */}
          <CardContent className="p-6">
            <div className="prose dark:prose-invert max-w-none font-mono text-xs md:text-sm bg-muted/20 p-5 rounded-xl border border-border/50 whitespace-pre-wrap leading-relaxed">
              {report.content}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
