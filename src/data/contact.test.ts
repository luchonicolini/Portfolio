import { describe, expect, it } from 'vitest';
import { contactConfig } from './contact';
import { testContactFixture } from '../../tests/fixtures/contact';

describe('contact config', () => {
  it('points to verified GitHub profile', () => {
    expect(contactConfig.githubUrl).toBe('https://github.com/luchonicolini');
  });

  it('keeps production contact channels null until verified values are configured', () => {
    expect(contactConfig.email).toBeNull();
    expect(contactConfig.linkedinUrl).toBeNull();
    expect(contactConfig.cvUrl).toBeNull();
  });

  it('isolates test email fixture in test module only', () => {
    expect(testContactFixture.email).toBe('contact@example.com');
  });
});
