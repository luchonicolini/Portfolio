import { describe, expect, it } from 'vitest';
import {
  projects,
  getFeaturedProjects,
  getAllProjects,
  getProjectBySlug
} from './projects';

describe('projects data', () => {
  it('contains verified projects inventory', () => {
    expect(projects.length).toBe(7);
    const slugs = projects.map((p) => p.slug);
    expect(slugs).toContain('puente');
    expect(slugs).toContain('dolarto');
    expect(slugs).toContain('stitchhub');
    expect(slugs).toContain('leadradar');
    expect(slugs).toContain('rial-electronica');
    expect(slugs).toContain('scopeguard');
    expect(slugs).toContain('nicolini-design');
  });

  it('filters featured primary projects correctly', () => {
    const featured = getFeaturedProjects();
    expect(featured.length).toBe(3);
    const featuredSlugs = featured.map((p) => p.slug);
    expect(featuredSlugs).toEqual(['puente', 'dolarto', 'stitchhub']);
  });

  it('retrieves all projects in priority order', () => {
    const all = getAllProjects();
    expect(all[0].id).toBe('puente');
    expect(all[1].id).toBe('dolarto');
    expect(all[2].id).toBe('stitchhub');
    expect(all[3].id).toBe('leadradar');
    expect(all[4].id).toBe('rial-electronica');
    expect(all[5].id).toBe('scopeguard');
    expect(all[6].id).toBe('nicolini-design');
  });

  it('retrieves a project by slug', () => {
    const puente = getProjectBySlug('puente');
    expect(puente).toBeDefined();
    expect(puente?.category).toBe('mobile');
    expect(puente?.technologies).toContain('Flutter');
    expect(puente?.es.title).toBe('Puente');
    expect(puente?.en.title).toBe('Puente');

    const nicolini = getProjectBySlug('nicolini-design');
    expect(nicolini).toBeDefined();
    expect(nicolini?.category).toBe('web-design');
    expect(nicolini?.technologies).toContain('Next.js 16');
    expect(nicolini?.technologies).toContain('Tailwind CSS v4');
    expect(nicolini?.liveUrl).toBe('https://nicolini-design.vercel.app/');
    expect(nicolini?.featured).toBe(false);
  });
});
