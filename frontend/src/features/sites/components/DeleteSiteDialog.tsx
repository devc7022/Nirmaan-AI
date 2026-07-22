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

interface DeleteSiteDialogProps {
  isOpen: boolean;
  siteName: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const DeleteSiteDialog: React.FC<DeleteSiteDialogProps> = ({
  isOpen,
  siteName,
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
          Delete Construction Site?
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground mt-2">
          Are you sure you want to delete <span className="font-semibold text-foreground">"{siteName}"</span>? This will remove the site from active tracking. This action cannot be undone.
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
            'Delete Site'
          )}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteSiteDialog;
