"use client"

import * as React from "react"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Thin, unstyled-by-default wrapper around @base-ui/react's Dialog —
 * already an installed dependency (see components.json's "base-nova"
 * style). Follows the same composition pattern shadcn uses for Radix:
 * Root/Trigger/Close passed straight through, Content/Header/Footer
 * add project styling.
 */

const Dialog = BaseDialog.Root
const DialogTrigger = BaseDialog.Trigger
const DialogClose = BaseDialog.Close

function DialogPortal({
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Portal>) {
  return (
    <BaseDialog.Portal {...props}>
      <BaseDialog.Backdrop
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-150",
          "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0"
        )}
      />
      {children}
    </BaseDialog.Portal>
  )
}

interface DialogContentProps extends React.ComponentProps<typeof BaseDialog.Popup> {
  /** Hide the built-in close (×) button, e.g. for a forced-choice dialog. */
  showClose?: boolean
}

function DialogContent({ className, children, showClose = true, ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <BaseDialog.Popup
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
          "max-h-[85vh] overflow-y-auto rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xl outline-none",
          "transition-[scale,opacity] duration-150 ease-out",
          "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
          "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
          className
        )}
        {...props}
      >
        {children}
        {showClose && (
          <DialogClose
            aria-label="Close dialog"
            className={cn(
              "absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            )}
          >
            <X className="size-4" aria-hidden="true" />
          </DialogClose>
        )}
      </BaseDialog.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-4 flex flex-col gap-1.5 pr-6", className)} {...props} />
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      className={cn("font-heading text-xl font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof BaseDialog.Description>) {
  return <BaseDialog.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}