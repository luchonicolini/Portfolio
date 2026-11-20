'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import styles from './components.module.css';
import { Button, IconButton } from './components';

export function LanguageSwitcher({
  spanishLabel,
  englishLabel
}: {
  spanishLabel: string;
  englishLabel: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(es|en)(?=\/|$)/, '') || '';
  const locales = [
    { id: 'es', label: 'ES', name: spanishLabel },
    { id: 'en', label: 'EN', name: englishLabel }
  ];

  return (
    <nav
      aria-label={locale === 'es' ? 'Idioma' : 'Language'}
      className={styles.languageSwitcher}
    >
      {locales.map((item) =>
        item.id === locale ? (
          <span
            aria-current="page"
            aria-label={`${item.label} — ${item.name}`}
            className={styles.languageLink}
            key={item.id}
          >
            {item.label}
          </span>
        ) : (
          <Link
            aria-label={`${item.label} — ${item.name}`}
            className={styles.languageLink}
            href={`/${item.id}${pathWithoutLocale}`}
            key={item.id}
            lang={item.id}
            hrefLang={item.id}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}

export function CopyButton({
  value,
  label,
  successMessage,
  errorMessage
}: {
  value: string;
  label: string;
  successMessage: string;
  errorMessage: string;
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }

  useEffect(() => {
    if (status === 'idle') return undefined;
    const timeout = window.setTimeout(() => setStatus('idle'), 2400);
    return () => window.clearTimeout(timeout);
  }, [status]);

  return (
    <div>
      <Button onClick={handleCopy} type="button" variant="secondary">
        {label}
      </Button>
      <p aria-live="polite" className={styles.liveMessage} role="status">
        {status === 'copied'
          ? successMessage
          : status === 'error'
            ? errorMessage
            : ''}
      </p>
    </div>
  );
}

function AccessibleDialog({
  open,
  onOpenChange,
  title,
  body,
  closeLabel
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  body: string;
  closeLabel: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      aria-labelledby={titleId}
      className={styles.dialog}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      ref={dialogRef}
    >
      <h3 className={styles.dialogTitle} id={titleId}>
        {title}
      </h3>
      <p className={styles.dialogBody}>{body}</p>
      <Button
        autoFocus
        onClick={() => onOpenChange(false)}
        type="button"
        variant="primary"
      >
        {closeLabel}
      </Button>
    </dialog>
  );
}

export function DialogLauncher({
  body,
  closeLabel,
  openLabel,
  title
}: {
  body: string;
  closeLabel: string;
  openLabel: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} type="button" variant="secondary">
        {openLabel}
      </Button>
      <AccessibleDialog
        body={body}
        closeLabel={closeLabel}
        onOpenChange={setOpen}
        open={open}
        title={title}
      />
    </>
  );
}

export function IconExampleButton({ label }: { label: string }) {
  return (
    <IconButton
      aria-label={label}
      onClick={() => document.getElementById('motion')?.scrollIntoView()}
      type="button"
    >
      <ArrowUpRight aria-hidden="true" size={20} />
    </IconButton>
  );
}
