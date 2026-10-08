import { products, projects, recommendationRules } from './data';
import type { Answers } from './types';
export function recommend(answers: Answers): { kind: 'project' | 'product'; id: string; exact: boolean } | null {
  if (!answers.need || !answers.material || !answers.environment || !answers.finish) return null;
  const rule = recommendationRules.find((rule) => (['need', 'material', 'environment', 'finish'] as const).every((key) => !rule[key] || rule[key] === answers[key]));
  if (rule) return { ...rule.target, exact: true };
  const project = projects.find((p) => p.material === answers.material && p.environment === answers.environment);
  if (project) return { kind: 'project', id: project.id, exact: false };
  const phase = answers.need === 'repair' ? 'repara' : answers.need === 'protect' ? 'protege' : 'pinta';
  const product = products.find((p) => p.phase === phase && p.materials.includes(answers.material!) && p.environments.includes(answers.environment!));
  return product ? { kind: 'product', id: product.id, exact: false } : null;
}
