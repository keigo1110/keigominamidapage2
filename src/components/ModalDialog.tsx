'use client'

import { useEffect, useRef, type KeyboardEventHandler, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalDialogProps {
  open: boolean
  onDismiss: () => void
  labelledBy: string
  id?: string
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>
  children: ReactNode
}

/** Native modal behavior keeps background content inert and above the page. */
export function ModalDialog({ open, onDismiss, labelledBy, id, onKeyDown, children }: ModalDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return

    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    dialog.querySelector<HTMLElement>('[data-dialog-close]')?.focus()

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (trigger?.isConnected && trigger.getClientRects().length > 0) trigger.focus()
    }
  }, [open])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <dialog
      ref={dialogRef}
      id={id}
      aria-labelledby={labelledBy}
      aria-modal="true"
      className="site-dialog"
      onCancel={(event) => {
        event.preventDefault()
        onDismiss()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onDismiss()
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented || event.key !== 'Tab') return

        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex]',
        )).filter((element) => element.tabIndex >= 0
          && !element.matches(':disabled')
          && element.getClientRects().length > 0
          && getComputedStyle(element).visibility !== 'hidden')
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (!first || !last) {
          event.preventDefault()
          event.currentTarget.focus()
        } else if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === event.currentTarget)) {
          event.preventDefault()
          first.focus()
        }
      }}
    >
      {children}
    </dialog>,
    document.body,
  )
}
