import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const DeleteConfirmModal = ({ open, onClose, onConfirm, book }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete <strong>{book?.name}</strong>?
        </p>
        <DialogFooter className="mt-4">
          <Button variant="outline" className="cursor-pointer" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" className="cursor-pointer" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmModal;
