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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { LabourCostTrend } from '../types';

interface LabourChartProps {
  data: LabourCostTrend[];
}

export const LabourChart: React.FC<LabourChartProps> = ({ data }) => {
  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-foreground">Labour Cost Trend</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Daily contractor spend (INR) over the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="labourGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-indigo-500, #6366f1)" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="var(--color-purple-500, #a855f7)" stopOpacity={0.3} />
                </linearGradient>
              </defs>
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
                tickFormatter={(value) => {
                  if (value >= 1000) {
                    return `₹${(value / 1000).toFixed(0)}k`;
                  }
                  return `₹${value}`;
                }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as LabourCostTrend;
                    return (
                      <div className="bg-card/95 border border-border shadow-lg backdrop-blur-md rounded-xl p-3 text-xs">
                        <p className="font-bold text-foreground mb-1">{item.date}</p>
                        <p className="text-muted-foreground flex justify-between gap-6">
                          <span>Labour Cost:</span>
                          <span className="font-semibold text-indigo-500">
                            ₹{item.cost.toLocaleString('en-IN')}
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="cost"
                fill="url(#labourGrad)"
                radius={[4, 4, 0, 0]}
                maxBarSize={45}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabourChart;
