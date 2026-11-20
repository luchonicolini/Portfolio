export interface ContactConfig {
  githubUrl: string;
  email: string | null;
  linkedinUrl: string | null;
  cvUrl: string | null;
}

export const contactConfig: ContactConfig = {
  githubUrl: 'https://github.com/luchonicolini',
  email: null,
  linkedinUrl: null,
  cvUrl: null
};
