import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  BrutalistPanel,
  Button,
  Container,
  Divider,
  ImageFrame,
  ProjectCard,
  ProjectCardContent,
  ProjectCardDescription,
  ProjectCardMedia,
  ProjectCardMeta,
  ProjectCardTitle,
  Section,
  SectionHeading,
  Tag,
  TextLink,
  Typography
} from './components';
import {
  CopyButton,
  DialogLauncher,
  IconExampleButton,
  LanguageSwitcher
} from './client-components';
import { MotionShowcase } from './motion-patterns';
import styles from './design-system-preview.module.css';

const colors = [
  { name: 'colorCanvas', token: '--color-canvas', className: '' },
  { name: 'colorInk', token: '--color-ink', className: 'ink' },
  { name: 'colorPrimary', token: '--color-primary', className: '' },
  { name: 'colorMint', token: '--color-mint', className: '' },
  { name: 'colorCoral', token: '--color-coral', className: '' },
  { name: 'colorPink', token: '--color-pink', className: '' }
] as const;

const spacing = [1, 2, 3, 4, 6, 8, 12, 16] as const;

export async function DesignSystemPreview() {
  const t = await getTranslations('DesignSystemPreview');
  const locale = await getLocale();

  return (
    <main className={styles.preview}>
      <a className={styles.skipLink} href="#design-system-content">
        {locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>
      <Container>
        <header className={styles.masthead}>
          <Link className={styles.brand} href={`/${locale}`}>
            <span aria-hidden="true" className={styles.brandMark}>
              LN.
            </span>
            <span>
              LUCIANO
              <br />
              NICOLINI
            </span>
          </Link>
          <div className={styles.headerTools}>
            <span className={styles.previewMarker}>{t('previewLabel')}</span>
            <LanguageSwitcher
              englishLabel={t('switchLanguage')}
              spanishLabel={locale === 'es' ? 'Español' : 'Spanish'}
            />
          </div>
        </header>

        <div className={styles.intro} id="design-system-content">
          <h1 className={styles.introTitle}>{t('title')}</h1>
          <div className={styles.introSide}>
            <p>{t('intro')}</p>
            <TextLink href="#components">
              {t('componentsTitle')}{' '}
              <ArrowUpRight aria-hidden="true" size={18} />
            </TextLink>
          </div>
        </div>

        <div className={styles.sections}>
          <Section
            aria-labelledby="palette-heading"
            className={styles.paletteSection}
            id="color"
          >
            <SectionHeading
              description={t('colorDescription')}
              id="palette-heading"
              title={t('colorTitle')}
            />
            <div className={styles.swatches}>
              {colors.map((color) => (
                <div
                  className={`${styles.swatch} ${color.className === 'ink' ? styles.inkSwatch : ''}`}
                  key={color.token}
                  style={{ backgroundColor: `var(${color.token})` }}
                >
                  <span className={styles.swatchName}>{t(color.name)}</span>
                  <code className={styles.tokenCode}>{color.token}</code>
                </div>
              ))}
            </div>
          </Section>

          <Section
            aria-labelledby="type-heading"
            className={styles.typeSection}
            id="typography"
          >
            <SectionHeading
              description={t('typographyDescription')}
              id="type-heading"
              title={t('typographyTitle')}
            />
            <div className={styles.typeSamples}>
              <div className={styles.typeSample}>
                <span className={styles.typeLabel}>Display · clamp()</span>
                <Typography as="p" variant="display">
                  {t('displaySample')}
                </Typography>
              </div>
              <div className={styles.typeSample}>
                <span className={styles.typeLabel}>
                  Heading · Space Grotesk
                </span>
                <Typography as="p" variant="title">
                  {t('headingSample')}
                </Typography>
              </div>
              <div className={styles.typeSample}>
                <span className={styles.typeLabel}>Body · Space Grotesk</span>
                <Typography as="p" variant="body">
                  {t('bodySample')}
                </Typography>
              </div>
              <div className={styles.typeSample}>
                <span className={styles.typeLabel}>Code · Space Mono</span>
                <Typography as="code" variant="mono">
                  {t('monoSample')}
                </Typography>
              </div>
              <div
                aria-label={
                  locale === 'es' ? 'Pesos tipográficos' : 'Font weights'
                }
                className={styles.typeWeights}
              >
                <span className={styles.weightRegular}>Regular 400</span>
                <span className={styles.weightMedium}>Medium 500</span>
                <span className={styles.weightBold}>Bold 700</span>
              </div>
            </div>
          </Section>

          <Section
            aria-labelledby="spacing-heading"
            className={styles.structureSection}
            id="spacing"
          >
            <SectionHeading
              description={t('spacingDescription')}
              id="spacing-heading"
              title={t('spacingTitle')}
            />
            <div className={styles.structureGrid}>
              <div
                aria-label={
                  locale === 'es' ? 'Escala de espaciado' : 'Spacing scale'
                }
                className={styles.spacingList}
              >
                {spacing.map((step) => (
                  <div className={styles.spacingRow} key={step}>
                    <span>space-{step}</span>
                    <span
                      aria-hidden="true"
                      className={styles.spacingBar}
                      style={{ width: `var(--space-${step})` }}
                    />
                    <span>{step * 4}px</span>
                  </div>
                ))}
              </div>
              <div
                aria-label={
                  locale === 'es'
                    ? 'Vista de grilla: 12 columnas grandes, 4 compactas'
                    : 'Grid preview: 12 wide columns, 4 compact columns'
                }
                className={styles.gridDiagram}
                role="img"
              >
                {Array.from({ length: 12 }, (_, index) => (
                  <span
                    aria-hidden="true"
                    className={styles.gridCell}
                    key={index}
                  />
                ))}
              </div>
            </div>
          </Section>

          <Section
            aria-labelledby="components-heading"
            className={styles.componentsSection}
            id="components"
          >
            <SectionHeading
              description={t('componentsDescription')}
              id="components-heading"
              title={t('componentsTitle')}
            />
            <div className={styles.componentRows}>
              <div className={styles.controlPanel}>
                <h3>{t('buttonsLabel')}</h3>
                <div className={styles.controlRow}>
                  <Button type="button">{t('buttonPrimary')}</Button>
                  <Button type="button" variant="secondary">
                    {t('buttonSecondary')}
                  </Button>
                  <Button disabled type="button">
                    {t('buttonDisabled')}
                  </Button>
                  <IconExampleButton label={t('iconAction')} />
                </div>
                <TextLink href="#surfaces">
                  {t('textLink')} <ArrowUpRight aria-hidden="true" size={16} />
                </TextLink>
                <p className={styles.stateNote}>
                  {locale === 'es'
                    ? 'Probá foco con Tab, presión con clic y estado disabled.'
                    : 'Try focus with Tab, press with a click, and the disabled state.'}
                </p>
              </div>
              <div className={styles.controlPanel}>
                <h3>
                  {locale === 'es'
                    ? 'Acciones accesibles'
                    : 'Accessible actions'}
                </h3>
                <div className={styles.controlRow}>
                  <DialogLauncher
                    body={t('dialogBody')}
                    closeLabel={t('closeDialog')}
                    openLabel={t('openDialog')}
                    title={t('dialogTitle')}
                  />
                  <CopyButton
                    errorMessage={t('copyError')}
                    label={t('copyToken')}
                    successMessage={t('copySuccess')}
                    value="--color-primary: #FFDE00"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section
            aria-labelledby="surfaces-heading"
            className={styles.surfaceSection}
            id="surfaces"
          >
            <SectionHeading
              description={t('surfacesDescription')}
              id="surfaces-heading"
              title={t('surfacesTitle')}
            />
            <div className={styles.surfaceDemo}>
              <ProjectCard>
                <ProjectCardMedia>
                  <ImageFrame
                    alt={
                      locale === 'es'
                        ? 'Ilustración aprobada de una ventana gráfica con paisaje montañoso'
                        : 'Approved illustration of a graphic window with a mountain landscape'
                    }
                    caption={t('artCaption')}
                    className="graphic-tilt"
                    height={1086}
                    src="/artwork/hero-artwork.webp"
                    width={1448}
                  />
                </ProjectCardMedia>
                <ProjectCardContent>
                  <Tag>{t('tagSample')}</Tag>
                  <ProjectCardTitle>{t('cardTitle')}</ProjectCardTitle>
                  <ProjectCardDescription>
                    {t('cardDescription')}
                  </ProjectCardDescription>
                  <ProjectCardMeta>
                    <Tag>React</Tag>
                    <Tag>CSS</Tag>
                  </ProjectCardMeta>
                </ProjectCardContent>
              </ProjectCard>
              <div className={styles.statesDemo}>
                <BrutalistPanel className={styles.surfaceNote} tone="yellow">
                  <Typography as="h3" variant="title">
                    {locale === 'es'
                      ? 'Superficie de trabajo'
                      : 'Working surface'}
                  </Typography>
                  <p>
                    {locale === 'es'
                      ? 'Canvas claro, tinta negra, acentos planos y textura de papel discreta.'
                      : 'Light canvas, black ink, flat accents, and a restrained paper texture.'}
                  </p>
                  <Divider />
                  <div className={styles.surfaceAccents}>
                    <Tag>2px border</Tag>
                    <Tag>6px offset</Tag>
                    <Tag>0 radius</Tag>
                  </div>
                </BrutalistPanel>
                <ImageFrame
                  alt={
                    locale === 'es'
                      ? 'Textura de papel aplicada con baja opacidad'
                      : 'Paper texture used at low opacity'
                  }
                  caption={
                    locale === 'es'
                      ? 'Textura de papel · muestra de superficie'
                      : 'Paper texture · surface sample'
                  }
                  className={styles.textureFrame}
                  height={256}
                  ratio="square"
                  src="/artwork/paper-texture.webp"
                  width={256}
                />
              </div>
            </div>
          </Section>

          <Section
            aria-labelledby="states-heading"
            className={styles.statesSection}
            id="states"
          >
            <SectionHeading
              id="states-heading"
              title={locale === 'es' ? 'Estados visibles' : 'Visible states'}
            />
            <div className={styles.buttonStateList}>
              <div className={styles.buttonStateRow}>
                <Button type="button">
                  {locale === 'es' ? 'Normal' : 'Default'}
                </Button>
                <Button disabled type="button">
                  {t('buttonDisabled')}
                </Button>
              </div>
              <BrutalistPanel className={styles.surfaceNote} tone="mint">
                <Typography as="h3" variant="title">
                  {locale === 'es' ? 'Borde y sombra' : 'Border and shadow'}
                </Typography>
                <p className={styles.stateNote}>2px · 4px / 6px / 8px</p>
              </BrutalistPanel>
            </div>
          </Section>

          <Section
            aria-labelledby="motion-heading"
            className={styles.motionSection}
            id="motion"
          >
            <SectionHeading
              description={t('motionDescription')}
              id="motion-heading"
              title={t('motionTitle')}
            />
            <div className={styles.motionSurface}>
              <MotionShowcase
                gridLabel={t('motionGrid')}
                items={[
                  t('motionItemOne'),
                  t('motionItemTwo'),
                  t('motionItemThree')
                ]}
                listLabel={t('motionList')}
                playLabel={t('motionPlay')}
                replayLabel={t('motionReplay')}
              />
              <div className={`${styles.motionGraphic} graphic-tilt`}>
                <ImageFrame
                  alt={
                    locale === 'es'
                      ? 'Ilustración aprobada con marco gráfico'
                      : 'Approved illustration in a graphic frame'
                  }
                  height={1086}
                  ratio="square"
                  src="/artwork/hero-artwork.webp"
                  width={1448}
                />
              </div>
            </div>
          </Section>
        </div>

        <footer className={styles.footer}>
          <span>
            LN. / {locale === 'es' ? 'Sistema de diseño' : 'Design system'}
          </span>
          <span>{t('layoutDescription')}</span>
        </footer>
      </Container>
    </main>
  );
}
