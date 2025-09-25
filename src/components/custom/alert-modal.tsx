import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDisclosure } from '@/hooks/use-disclosure';
import { cn } from '@/utils/utils';
import { AlertTriangle, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';

export interface AlertModalProps {
  /**
   * Title of the alert modal
   */
  title: string;

  /**
   * Description/message content
   */
  description: string;

  /**
   * Trigger button element
   */
  trigger?: ReactNode;

  /**
   * Trigger button props (if not providing custom trigger)
   */
  triggerProps?: {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
    children?: ReactNode;
    icon?: ReactNode;
  };

  /**
   * Confirm button text
   */
  confirmText?: string;

  /**
   * Cancel button text
   */
  cancelText?: string;

  /**
   * Confirm button variant
   */
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';

  /**
   * Loading state
   */
  isLoading?: boolean;

  /**
   * Loading text
   */
  loadingText?: string;

  /**
   * Callback when confirmed
   */
  onConfirm: () => void;

  /**
   * Callback when cancelled (optional)
   */
  onCancel?: () => void;

  /**
   * Alert type for styling
   */
  type?: 'danger' | 'warning' | 'info';

  /**
   * Auto close after confirmation
   */
  autoClose?: boolean;
}

export function AlertModal({
  title,
  description,
  trigger,
  triggerProps,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'destructive',
  isLoading = false,
  loadingText = 'Loading...',
  onConfirm,
  onCancel,
  type = 'danger',
  autoClose = true,
}: AlertModalProps) {
  const { isOpen, onClose, onOpenChange } = useDisclosure();

  const handleConfirm = () => {
    onConfirm();
    if (autoClose) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  // Icon based on type
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="h-6 w-6 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'info':
        return <AlertTriangle className="h-6 w-6 text-blue-600" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-red-600" />;
    }
  };

  // Default trigger button
  const defaultTrigger = (
    <Button
      variant={triggerProps?.variant || 'destructive'}
      size={triggerProps?.size || 'sm'}
      className={triggerProps?.className}
    >
      {triggerProps?.icon || <Trash2 className="h-4 w-4" />}
      {triggerProps?.children && (
        <span className={triggerProps?.icon ? 'ml-2' : ''}>{triggerProps?.children}</span>
      )}
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <div>
              <DialogTitle className={cn('text-lg font-semibold')}>{title}</DialogTitle>
              <DialogDescription className="mt-2 text-sm text-gray-600">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? loadingText : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
