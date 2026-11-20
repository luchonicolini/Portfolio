import type { Project } from './projects';

export const workCategories = [
  'all',
  'mobile',
  'native-ios',
  'full-stack',
  'engineering',
  'web-design'
] as const;

export type WorkCategory = (typeof workCategories)[number];

export function parseWorkCategory(value: string | null): WorkCategory | null {
  return workCategories.find((category) => category === value) ?? null;
}

export function filterProjects(
  projects: Project[],
  category: WorkCategory
): Project[] {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
}
