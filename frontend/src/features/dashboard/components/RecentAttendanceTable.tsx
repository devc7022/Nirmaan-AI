import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { RecentAttendanceRecord } from '../types';
import { ClipboardList } from 'lucide-react';

interface RecentAttendanceTableProps {
  data: RecentAttendanceRecord[];
}

export const RecentAttendanceTable: React.FC<RecentAttendanceTableProps> = ({ data }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-foreground">Recent Attendance</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Real-time check-in log across all construction sites
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-3 bg-muted rounded-full mb-3">
              <ClipboardList className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">No Attendance Data</p>
            <p className="text-xs text-muted-foreground mt-1">
              Check-ins logged today will appear here.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Worker</TableHead>
                  <TableHead className="font-semibold">Site</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold text-right">Hours</TableHead>
                  <TableHead className="font-semibold text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((record, index) => {
                  const formattedDate = new Date(record.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <TableRow key={index} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-foreground">
                        {record.workerName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {record.siteName}
                      </TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">
                        {formattedDate}
                      </TableCell>
                      <TableCell className="text-right text-foreground font-mono">
                        {record.hoursWorked?.toFixed(1) || '0.0'} hrs
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={record.present ? 'success' : 'destructive'} className="shadow-none">
                          {record.present ? 'Present' : 'Absent'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAttendanceTable;
