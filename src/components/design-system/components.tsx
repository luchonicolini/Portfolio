import Image from 'next/image';
import Link from 'next/link';
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import styles from './components.module.css';

type ClassName = { className?: string };
type ButtonVariant = 'primary' | 'secondary' | 'quiet';

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  const variantClass = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
    quiet: styles.buttonQuiet
  }[variant];

  return (
    <button
      className={joinClasses(
        'button-press',
        styles.button,
        variantClass,
        className
      )}
      {...props}
    />
  );
}

export function IconButton({
  'aria-label': ariaLabel,
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ClassName) {
  return (
    <button
      aria-label={ariaLabel}
      className={joinClasses('button-press', styles.iconButton, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TextLink({
  className,
  ...props
}: React.ComponentProps<typeof Link> & ClassName) {
  return (
    <Link className={joinClasses(styles.textLink, className)} {...props} />
  );
}

export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={joinClasses(styles.container, className)} {...props} />
  );
}

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className={joinClasses(styles.section, className)} {...props} />
  );
}

export function SectionHeading({
  title,
  description,
  id
}: {
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <header className={styles.sectionHeading}>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

type TypographyProps = HTMLAttributes<HTMLElement> & {
  as?: 'code' | 'div' | 'h1' | 'h2' | 'h3' | 'p' | 'span';
  variant?:
    'display' | 'title' | 'lead' | 'body' | 'small' | 'mono' | 'eyebrow';
};

export function Typography({
  as: Component = 'p',
  variant = 'body',
  className,
  ...props
}: TypographyProps) {
  const variantClass = {
    display: styles.typeDisplay,
    title: styles.typeTitle,
    lead: styles.typeLead,
    body: styles.typeBody,
    small: styles.typeSmall,
    mono: styles.typeMono,
    eyebrow: styles.eyebrow
  }[variant];

  return (
    <Component
      className={joinClasses(styles.typography, variantClass, className)}
      {...props}
    />
  );
}

type PanelProps = HTMLAttributes<HTMLElement> & {
  as?: 'article' | 'div' | 'section';
  tone?: 'canvas' | 'yellow' | 'mint' | 'coral' | 'pink';
};

export function BrutalistPanel({
  as: Component = 'div',
  tone = 'canvas',
  className,
  ...props
}: PanelProps) {
  return (
    <Component
      className={joinClasses(styles.panel, className)}
      data-tone={tone}
      {...props}
    />
  );
}

export function ProjectCard({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <article
      className={joinClasses(styles.projectCard, className)}
      {...props}
    />
  );
}

export function ProjectCardMedia({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={joinClasses(styles.projectCardMedia, className)}
      {...props}
    />
  );
}

export function ProjectCardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={joinClasses(styles.projectCardContent, className)}
      {...props}
    />
  );
}

export function ProjectCardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={joinClasses(styles.projectCardTitle, className)}
      {...props}
    />
  );
}

export function ProjectCardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={joinClasses(styles.projectCardDescription, className)}
      {...props}
    />
  );
}

export function ProjectCardMeta({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={joinClasses(styles.projectCardMeta, className)}
      {...props}
    />
  );
}

export function Tag({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { children: ReactNode }) {
  return (
    <span className={joinClasses(styles.tag, className)} {...props}>
      {children}
    </span>
  );
}

export function Divider({
  className,
  ...props
}: HTMLAttributes<HTMLHRElement>) {
  return <hr className={joinClasses(styles.divider, className)} {...props} />;
}

export function ImageFrame({
  src,
  alt,
  caption,
  ratio = 'landscape',
  className,
  sizes = '(max-width: 672px) 100vw, 45vw',
  width,
  height
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  ratio?: 'landscape' | 'portrait' | 'square';
  sizes?: string;
} & ClassName) {
  return (
    <figure className={joinClasses(styles.imageFrame, className)}>
      <div className={styles.imageFrameMedia} data-ratio={ratio}>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
        />
      </div>
      {caption ? (
        <figcaption className={styles.imageCaption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
