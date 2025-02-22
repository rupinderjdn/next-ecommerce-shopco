import React from 'react';
import { Button } from '../ButtonInput/ButtonInput'; // Assuming you have a Button component
import { ModalView } from './ModalView';
import { cn } from '../../../lib/utils';

interface ModalAlertProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  onSubmit: (result: boolean) => void;
  yesButtonText?: string;
  noButtonText?: string;
  yesButtonClassName?: string;
  noButtonClassName?: string;
  className?: string;
  contentClassName?: string;
  disableClose?: boolean;
}

export const ModalAlert: React.FC<ModalAlertProps> = ({
  isOpen,
  onClose,
  title,
  message,
  onSubmit,
  yesButtonText = 'Yes',
  noButtonText = 'No',
  yesButtonClassName,
  noButtonClassName,
  className,
  contentClassName,
  disableClose,
}) => {
  const handleResponse = (result: boolean) => {
    onSubmit(result);
    onClose();
  };

  return (
    <ModalView
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className={className}
      contentClassName={contentClassName}
      disableClose={disableClose}
    >
      <div className="flex flex-col gap-6">
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => handleResponse(false)}
            className={cn("bg-gray-200 text-gray-700 hover:bg-gray-300", noButtonClassName)}
          >
            {noButtonText}
          </Button>
          <Button
            onClick={() => handleResponse(true)}
            className={cn("bg-blue-600 text-white hover:bg-blue-700", yesButtonClassName)}
          >
            {yesButtonText}
          </Button>
        </div>
      </div>
    </ModalView>
  );
};
