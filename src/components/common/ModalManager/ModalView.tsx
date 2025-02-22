import React from 'react'
import { DownloadIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./Dialog"
import { cn } from '../../../lib/utils'
// import { DataTable } from "./DataTable"


// TODO we can have some icon array to render some functionlity in the toolbar for future
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string; // title is optional
  children : React.ReactNode,
  className?: string,
  contentClassName?: string,
  disableClose?: boolean,
}

export const ModalView: React.FC<ModalProps> = ({isOpen, onClose, title, children, className, contentClassName,disableClose}) => {

  const contentProps = disableClose ? {onInteractOutside: (e: any) => e.preventDefault(), onEscapeKeyDown: (e: any) => e.preventDefault(), onPointerDownOutside: (e: any) => e.preventDefault()} : {};

  return (
    <div>
        <Dialog open={isOpen} onOpenChange={onClose} className={cn("",className)} >
          <DialogContent props={contentProps} disableClose={disableClose} className={cn("max-w-3xl font-nunito-sans ",contentClassName)} >
            <DialogHeader>
              <DialogTitle props={{ className: "flex items-center justify-between" }}>
                <span className='text-gray-900'>{title || ""}</span>
              </DialogTitle>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
    </div>
  )
}
