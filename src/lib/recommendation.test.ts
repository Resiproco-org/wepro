import { describe, expect, it } from 'vitest';
import { recommend } from './recommendation';
import { products, projects, materials, needs, environments, finishes } from './data';
import type { Environment, Finish, Material, Need } from './types';
describe('local recommendation rules', () => {
  it('waits for all four answers', () => expect(recommend({ need:'renew',material:'wood',environment:'interior' })).toBeNull());
  it('routes the main journey to the wooden table', () => expect(recommend({ need:'renew',material:'wood',environment:'interior',finish:'satin' })).toEqual({ kind:'project',id:'renovar-mesa-madera',exact:true }));
  it('routes protection to varnish and outdoor metal to the railing', () => {
    expect(recommend({ need:'protect',material:'wood',environment:'interior',finish:'matte' })?.id).toBe('barniz-acrilico');
    expect(recommend({ need:'restore',material:'metal',environment:'exterior',finish:'gloss' })?.id).toBe('restaurar-barandilla');
  });
  it('returns stable existing targets or an explicit no-match for all visible combinations', () => {
    for (const need of Object.keys(needs) as Need[]) for (const material of Object.keys(materials) as Material[]) for (const environment of Object.keys(environments) as Environment[]) for (const finish of Object.keys(finishes) as Finish[]) {
      const answers = { need,material,environment,finish };
      const result = recommend(answers);
      expect(recommend(answers)).toEqual(result);
      if (result) expect((result.kind === 'project' ? projects : products).some((entry) => entry.id === result.id)).toBe(true);
    }
  });
});
