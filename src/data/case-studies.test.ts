import { describe, expect, it } from 'vitest';
import {
  caseStudies,
  getAllCaseStudySlugs,
  getCaseStudy,
  hasCaseStudy
} from './case-studies';
import { getAllProjects } from './projects';

describe('case-studies data inventory and fact verification', () => {
  const expectedSlugs = [
    'puente',
    'dolarto',
    'stitchhub',
    'leadradar',
    'rial-electronica',
    'scopeguard'
  ];

  it('contains entries for all 6 verified projects in inventory', () => {
    const slugs = getAllCaseStudySlugs();
    expect(slugs.sort()).toEqual(expectedSlugs.sort());
    expect(slugs.length).toBe(6);

    const projectSlugs = getAllProjects().map((p) => p.slug);
    for (const slug of projectSlugs) {
      expect(hasCaseStudy(slug)).toBe(true);
      expect(getCaseStudy(slug)).toBeDefined();
    }
  });

  it('provides complete bilingual copy for every case study', () => {
    for (const slug of expectedSlugs) {
      const study = caseStudies[slug];
      expect(study).toBeDefined();

      for (const locale of ['es', 'en'] as const) {
        const copy = study[locale];
        expect(copy.problem.trim().length).toBeGreaterThan(20);
        expect(copy.implementation.trim().length).toBeGreaterThan(20);
        expect(copy.architecture.trim().length).toBeGreaterThan(20);
        expect(copy.design.trim().length).toBeGreaterThan(20);
        expect(copy.limitations.trim().length).toBeGreaterThan(20);
      }
    }
  });

  describe('Puente fact constraints', () => {
    const puente = caseStudies.puente;

    it('does not claim Firebase or cloud AI capabilities', () => {
      const content = `${puente.es.architecture} ${puente.en.architecture} ${puente.es.implementation} ${puente.en.implementation}`;
      expect(content).not.toMatch(/firebase/i);
      expect(content).not.toMatch(/cloud ai/i);
    });

    it('documents Riverpod and local audio lifecycle', () => {
      expect(puente.es.architecture).toContain('Riverpod');
      expect(puente.en.architecture).toContain('Riverpod');
      expect(puente.es.architecture).toMatch(/audio/i);
      expect(puente.en.architecture).toMatch(/audio/i);
    });

    it('acknowledges pending physical-device and user validation', () => {
      expect(puente.es.limitations).toMatch(/personas usuarias/i);
      expect(puente.es.limitations).toMatch(/dispositivos físicos/i);
      expect(puente.en.limitations).toMatch(/user validation/i);
      expect(puente.en.limitations).toMatch(/physical.*testing/i);
    });

    it('identifies onboarding artwork as conceptual illustration, not an app screenshot', () => {
      expect(puente.es.disclaimer).toMatch(/ilustración conceptual/i);
      expect(puente.en.disclaimer).toMatch(/illustration/i);
      expect(puente.es.design).toMatch(/ilustración/i);
      expect(puente.en.design).toMatch(/illustration/i);
    });
  });

  describe('DolarTo fact constraints', () => {
    const dolarto = caseStudies.dolarto;

    it('documents native SwiftUI, MVVM and public DolarApi', () => {
      expect(dolarto.es.architecture).toContain('SwiftUI');
      expect(dolarto.es.architecture).toContain('MVVM');
      expect(dolarto.en.architecture).toContain('SwiftUI');
      expect(dolarto.en.architecture).toContain('MVVM');
      expect(dolarto.es.implementation).toContain('DolarApi');
      expect(dolarto.en.implementation).toContain('DolarApi');
    });

    it('states that real-time financial rates are not guaranteed', () => {
      expect(dolarto.es.limitations).toMatch(/tiempo real/i);
      expect(dolarto.en.limitations).toMatch(/real-time/i);
    });

    it('notes that public App Store listing is pending verification', () => {
      expect(dolarto.es.limitations).toMatch(/App Store/i);
      expect(dolarto.en.limitations).toMatch(/App Store/i);
    });
  });

  describe('StitchHub fact constraints', () => {
    const stitchhub = caseStudies.stitchhub;

    it('documents Next.js, Supabase and Motion architecture', () => {
      expect(stitchhub.es.architecture).toContain('Next.js');
      expect(stitchhub.es.architecture).toContain('Supabase');
      expect(stitchhub.es.architecture).toContain('Motion');
      expect(stitchhub.en.architecture).toContain('Next.js');
      expect(stitchhub.en.architecture).toContain('Supabase');
      expect(stitchhub.en.architecture).toContain('Motion');
    });

    it('clarifies that screenshot values are demo fixtures, not verified metrics', () => {
      expect(stitchhub.es.limitations).toMatch(/demostrativos|métricas/i);
      expect(stitchhub.en.limitations).toMatch(/demonstrative|metrics/i);
      expect(stitchhub.es.disclaimer).toMatch(/métricas/i);
      expect(stitchhub.en.disclaimer).toMatch(/metrics/i);
    });
  });

  describe('LeadRadar fact constraints', () => {
    const leadradar = caseStudies.leadradar;

    it('documents atomic queue, heartbeat/fencing and pre-connection SSRF mitigations', () => {
      expect(leadradar.es.implementation).toMatch(/cola.*atómica/i);
      expect(leadradar.es.implementation).toMatch(/heartbeat/i);
      expect(leadradar.en.implementation).toMatch(/atomic.*queue/i);
      expect(leadradar.en.implementation).toMatch(/heartbeat/i);
      expect(leadradar.es.architecture).toMatch(/SSRF/i);
      expect(leadradar.en.architecture).toMatch(/SSRF/i);
    });

    it('identifies LeadRadar as private internal tooling with sanitized architecture', () => {
      expect(leadradar.es.limitations).toMatch(/privada/i);
      expect(leadradar.en.limitations).toMatch(/private/i);
      expect(leadradar.es.design).toMatch(/desinfectados|confidencialidad/i);
      expect(leadradar.en.design).toMatch(/sanitized|confidentiality/i);
    });

    it('includes structured sanitized architecture steps in both languages', () => {
      expect(leadradar.es.architectureSteps).toBeDefined();
      expect(leadradar.en.architectureSteps).toBeDefined();
      expect(leadradar.es.architectureSteps?.length).toBe(4);
      expect(leadradar.en.architectureSteps?.length).toBe(4);
    });
  });

  describe('Rial Electrónica fact constraints', () => {
    const rial = caseStudies['rial-electronica'];

    it('clarifies independent unofficial demo status with no real payments', () => {
      expect(rial.es.limitations).toMatch(/independiente/i);
      expect(rial.es.limitations).toMatch(/no oficial/i);
      expect(rial.es.limitations).toMatch(/pagos reales/i);
      expect(rial.en.limitations).toMatch(/independent/i);
      expect(rial.en.limitations).toMatch(/unofficial/i);
      expect(rial.en.limitations).toMatch(/real payments/i);
    });
  });

  describe('ScopeGuard fact constraints', () => {
    const scopeguard = caseStudies.scopeguard;

    it('identifies local demonstrative prototype status without backend or real approvals', () => {
      expect(scopeguard.es.limitations).toMatch(/backend.*remoto|prototipo/i);
      expect(scopeguard.es.limitations).toMatch(/aprobaciones reales/i);
      expect(scopeguard.en.limitations).toMatch(/remote backend|prototype/i);
      expect(scopeguard.en.limitations).toMatch(/real approvals/i);
    });
  });

  describe('helper functions', () => {
    it('retrieves existing study by slug', () => {
      const study = getCaseStudy('stitchhub');
      expect(study).toBeDefined();
      expect(study?.es.problem).toBeDefined();
    });

    it('returns undefined for non-existent slug', () => {
      const missing = getCaseStudy('non-existent-project');
      expect(missing).toBeUndefined();
    });

    it('checks existence correctly with hasCaseStudy', () => {
      expect(hasCaseStudy('puente')).toBe(true);
      expect(hasCaseStudy('invalid')).toBe(false);
    });
  });
});
