'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { AttendanceTrend } from '../types';

interface AttendanceChartProps {
  data: AttendanceTrend[];
}

export const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-foreground">Attendance Trend</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Daily attendance rate (%) over the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--color-border)"
                opacity={0.3}
              />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as AttendanceTrend;
                    return (
                      <div className="bg-card/95 border border-border shadow-lg backdrop-blur-md rounded-xl p-3 text-xs">
                        <p className="font-bold text-foreground mb-1">{item.date}</p>
                        <div className="space-y-1">
                          <p className="text-muted-foreground flex justify-between gap-6">
                            <span>Present:</span>
                            <span className="font-semibold text-foreground">{item.presentCount} workers</span>
                          </p>
                          <p className="text-muted-foreground flex justify-between gap-6">
                            <span>Rate:</span>
                            <span className="font-semibold text-primary">{item.attendancePercentage}%</span>
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <defs>
                <linearGradient id="attendanceGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="attendancePercentage"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ stroke: 'var(--color-primary)', strokeWidth: 2, r: 4, fill: 'var(--color-background)' }}
                activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--color-primary)' }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
