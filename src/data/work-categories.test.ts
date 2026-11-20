import { describe, expect, it } from 'vitest';
import { getAllProjects } from './projects';
import {
  filterProjects,
  parseWorkCategory,
  workCategories
} from './work-categories';

describe('work categories', () => {
  it('accepts the published category values and rejects unknown filters', () => {
    for (const category of workCategories)
      expect(parseWorkCategory(category)).toBe(category);
    expect(parseWorkCategory('unknown')).toBeNull();
    expect(parseWorkCategory(null)).toBeNull();
    expect(parseWorkCategory('')).toBeNull();
  });

  it('returns matching projects without changing the registry', () => {
    const projects = getAllProjects();
    expect(filterProjects(projects, 'all')).toEqual(projects);
    expect(
      filterProjects(projects, 'mobile').map((project) => project.slug)
    ).toEqual(['puente', 'scopeguard']);
    expect(
      filterProjects(projects, 'native-ios').map((project) => project.slug)
    ).toEqual(['dolarto']);
    expect(
      filterProjects(projects, 'full-stack').map((project) => project.slug)
    ).toEqual(['stitchhub']);
    expect(
      filterProjects(projects, 'engineering').map((project) => project.slug)
    ).toEqual(['leadradar']);
    expect(
      filterProjects(projects, 'web-design').map((project) => project.slug)
    ).toEqual(['rial-electronica']);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(
      projects.length
    );
  });
});
