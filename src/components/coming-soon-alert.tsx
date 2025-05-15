"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ComingSoonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ComingSoonDialog({
  open,
  onOpenChange,
}: ComingSoonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">🚧 Coming Soon</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600 text-center">
          This feature is currently under development. Please check back later!
        </p>
        <DialogFooter className="flex justify-center mt-4">
          <div className="flex justify-center w-full">
            <Button className="bg-main" onClick={() => onOpenChange(false)}>
              Got it
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
