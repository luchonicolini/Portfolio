import { useTranslations } from 'next-intl';

export default function FoundationPage() {
  const t = useTranslations('Foundation');

  return (
    <main className="foundation" aria-labelledby="foundation-title">
      <p className="foundation__eyebrow">LN. / PORTFOLIO</p>
      <h1 id="foundation-title">{t('status')}</h1>
      <p className="foundation__note">{t('title')}</p>
    </main>
  );
}
