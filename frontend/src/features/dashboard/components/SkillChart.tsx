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
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { SkillDistribution } from '../types';

interface SkillChartProps {
  data: SkillDistribution[];
}

// Curated high-contrast aesthetic colors for the pie chart slices
const COLORS = [
  'var(--color-primary, #f97316)',        // Orange (Primary)
  'var(--color-blue-500, #3b82f6)',       // Blue
  'var(--color-emerald-500, #10b981)',    // Emerald
  'var(--color-indigo-500, #6366f1)',     // Indigo
  'var(--color-violet-500, #8b5cf6)',     // Violet
  'var(--color-rose-500, #f43f5e)',       // Rose
  'var(--color-cyan-500, #06b6d4)',       // Cyan
  'var(--color-amber-500, #f59e0b)',      // Amber
];

export const SkillChart: React.FC<SkillChartProps> = ({ data }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-foreground">Skill Distribution</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Classification of workforce by skills
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-muted-foreground">No skill distribution data available</p>
          </div>
        ) : (
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as { name: string; value: number };
                      return (
                        <div className="bg-card/95 border border-border shadow-lg backdrop-blur-md rounded-xl p-3 text-xs">
                          <p className="font-bold text-foreground mb-1">{item.name}</p>
                          <p className="text-muted-foreground flex justify-between gap-6">
                            <span>Count:</span>
                            <span className="font-semibold text-foreground">
                              {item.value} {item.value === 1 ? 'worker' : 'workers'}
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Pie
                  data={data}
                  cx="50%"
                  cy="40%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="var(--color-card)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={80}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value, entry: any) => {
                    const payload = entry.payload as { value: number };
                    return (
                      <span className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
                        {value} ({payload?.value})
                      </span>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillChart;
