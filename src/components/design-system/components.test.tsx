import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AccessibleDialog } from './client-components';
import {
  BrutalistPanel,
  Button,
  IconButton,
  ImageFrame,
  ProjectCard,
  ProjectCardTitle,
  SectionHeading,
  Typography
} from './components';

describe('design-system primitives', () => {
  it('exposes button state and accessible icon naming', () => {
    render(
      <>
        <Button disabled>Unavailable</Button>
        <IconButton aria-label="Open motion example">
          <span aria-hidden="true">icon</span>
        </IconButton>
      </>
    );

    expect(screen.getByRole('button', { name: 'Unavailable' })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Open motion example' })
    ).toBeEnabled();
  });

  it('keeps content primitives semantic and labels images', () => {
    const { container } = render(
      <>
        <SectionHeading id="sample-heading" title="Sample section" />
        <BrutalistPanel as="section" tone="mint">
          <ProjectCard>
            <ProjectCardTitle>Illustrative project</ProjectCardTitle>
          </ProjectCard>
        </BrutalistPanel>
        <Typography as="code" variant="mono">
          --color-primary
        </Typography>
        <ImageFrame
          alt="Approved sample artwork"
          height={1086}
          src="/artwork/hero-artwork.webp"
          width={1448}
        />
      </>
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Sample section' })
    ).toHaveAttribute('id', 'sample-heading');
    expect(container.querySelector('[data-tone="mint"]')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Illustrative project' })
    ).toBeInTheDocument();
    expect(screen.getByText('--color-primary').tagName).toBe('CODE');
    expect(
      screen.getByRole('img', { name: 'Approved sample artwork' })
    ).toBeInTheDocument();
  });

  it('renders accessible dialog primitive with title and close button', () => {
    HTMLDialogElement.prototype.showModal =
      HTMLDialogElement.prototype.showModal ||
      function (this: HTMLDialogElement) {
        this.open = true;
      };
    HTMLDialogElement.prototype.close =
      HTMLDialogElement.prototype.close ||
      function (this: HTMLDialogElement) {
        this.open = false;
      };

    render(
      <AccessibleDialog
        closeLabel="Cerrar"
        onOpenChange={() => {}}
        open={true}
        title="Diálogo modal de prueba"
      >
        <p>Contenido modal accesible</p>
      </AccessibleDialog>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Diálogo modal de prueba' })
    ).toBeInTheDocument();
    expect(screen.getByText('Contenido modal accesible')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument();
  });
});
