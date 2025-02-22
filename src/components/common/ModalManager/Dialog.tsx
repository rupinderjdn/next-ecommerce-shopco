"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "../../../lib/utils"

const Dialog = ({className, children,open,onOpenChange, ...props }: { className?: string, children: React.ReactNode, open: boolean, onOpenChange: (open: boolean) => void, props?: any }) => (
  <DialogPrimitive.Root modal={true} open={open} onOpenChange={onOpenChange}  {...props}>
    {children}
  </DialogPrimitive.Root>
);

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

interface DialogOverlayProps {
    className? : string,
}

const DialogOverlay = ({ className, ...props } : DialogOverlayProps)  => (
  <DialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/60  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props} />
)

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = ({ className, children, disableClose, ...props }: { className?: string, children: React.ReactNode, disableClose?: boolean, props: any }) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}>
      <div className="fixed top-[20px] right-[20px] z-[60]"> {/* Increased z-index */}
        {disableClose ? null : <DialogPrimitive.Close
          className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground p-1 text-gray-900 "
        >
          <X className="h-4 w-4 text-gray-900 font-semibold"/>
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>}
      </div>
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
)

DialogContent.displayName = DialogPrimitive.Content.displayName

interface DialogHeaderProps {
    className ? : string,
    children: React.ReactNode,
}
const DialogHeader = ({ children, className, ...props } : DialogHeaderProps) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props} >
    {children}
  </div>
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ children, className, ...props }: { children: React.ReactNode, className?: string, props: any }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = ({ children, className, ...props }: { children: React.ReactNode, className?: string, props: any }) => (
  <DialogPrimitive.Title
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} >
    {children}
  </DialogPrimitive.Title>
)
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = ({ children, className, ...props }: { children: React.ReactNode, className?: string, props: any }) => (
  <DialogPrimitive.Description
    className={cn("text-sm text-muted-foreground", className)}
    {...props} >
    {children}
  </DialogPrimitive.Description>
)
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
