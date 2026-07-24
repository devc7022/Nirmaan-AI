import React from 'react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteAttendanceDialogProps {
  isOpen: boolean;
  workerName: string;
  attendanceDate?: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const DeleteAttendanceDialog: React.FC<DeleteAttendanceDialogProps> = ({
  isOpen,
  workerName,
  attendanceDate,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  const formattedDate = attendanceDate
    ? new Date(attendanceDate).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <div className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-3">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <DialogTitle className="text-lg font-bold text-foreground">
          Delete Attendance Record?
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground mt-2">
          Are you sure you want to delete the attendance entry for{' '}
          <span className="font-semibold text-foreground">{workerName}</span>
          {formattedDate ? ` on ${formattedDate}` : ''}? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
          className="font-semibold border-border bg-card text-foreground"
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={isLoading}
          className="font-semibold"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            'Delete Record'
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteAttendanceDialog;
