export interface ContactConfig {
  githubUrl: string;
  emailFixture: string;
  email: string | null;
  linkedinUrl: string | null;
  cvUrl: string | null;
}

export const contactConfig: ContactConfig = {
  githubUrl: 'https://github.com/luchonicolini',
  emailFixture: 'contact@example.com',
  // Test fixture allowed only during unit/integration testing; null in production
  email: process.env.NODE_ENV === 'test' ? 'contact@example.com' : null,
  linkedinUrl: null,
  cvUrl: null
};
