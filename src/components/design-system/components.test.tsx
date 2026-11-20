import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
});
