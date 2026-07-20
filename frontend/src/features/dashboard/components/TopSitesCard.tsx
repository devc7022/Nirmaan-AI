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
import { TopSite } from '../types';
import { Building2, Info } from 'lucide-react';

interface TopSitesCardProps {
  data: TopSite[];
}

export const TopSitesCard: React.FC<TopSitesCardProps> = ({ data }) => {
  const isEmpty = !data || data.length === 0;

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-foreground">Top Active Sites</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Construction sites ranked by worker attendance today
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 flex-1 flex flex-col justify-center">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-3 bg-muted rounded-full mb-3">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">No Active Sites</p>
            <p className="text-xs text-muted-foreground mt-1">
              Active sites with present workers will appear here.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Site Name</TableHead>
                  <TableHead className="font-semibold text-right">Present Workers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((site, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell className="font-medium text-foreground flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <span>{site.siteName}</span>
                    </TableCell>
                    <TableCell className="text-right text-foreground font-semibold font-mono">
                      {site.presentWorkerCount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopSitesCard;
