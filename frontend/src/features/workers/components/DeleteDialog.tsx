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

interface DeleteDialogProps {
  isOpen: boolean;
  workerName: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  workerName,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogHeader>
        <div className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-3">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <DialogTitle className="text-lg font-bold text-foreground">
          Delete Worker Profile
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground mt-2">
          Are you sure you want to delete <span className="font-semibold text-foreground">{workerName}</span>? 
          This action will soft-delete the worker record and cannot be undone.
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
            'Delete'
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteDialog;
