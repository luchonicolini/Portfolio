import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DesignSystemPreview } from '@/components/design-system/design-system-preview';

export const metadata: Metadata = {
  title: 'Design System Preview — Luciano Nicolini',
  robots: { index: false, follow: false }
};

export default function DesignSystemPreviewPage() {
  if (process.env.NODE_ENV !== 'development') notFound();

  return <DesignSystemPreview />;
}
