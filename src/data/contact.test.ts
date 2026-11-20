import { describe, expect, it } from 'vitest';
import { contactConfig } from './contact';

describe('contact config', () => {
  it('points to verified GitHub profile', () => {
    expect(contactConfig.githubUrl).toBe('https://github.com/luchonicolini');
  });

  it('uses the standard example.com fixture for testing', () => {
    expect(contactConfig.emailFixture).toBe('contact@example.com');
  });
});
