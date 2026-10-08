import { kits, productById, variantById } from './data';
import type { CartLine, KitSelection, Project } from './types';
export function defaultKit(project: Project, complete = false): KitSelection[] {
  const kit = kits.find((k) => k.projectId === project.id)!;
  return [...kit.products.map((p) => ({ productId: p.productId, variantId: productById(p.productId).variants[0].id, quantity: p.quantity, selected: true })), ...(complete ? [{ productId: kit.accessoryId, variantId: productById(kit.accessoryId).variants[0].id, quantity: 1, selected: true }] : [])];
}
export function kitPrice(selections: KitSelection[]) {
  const selected = selections.filter((s) => s.selected);
  const subtotal = selected.reduce((sum, s) => sum + variantById(s.productId, s.variantId).price * s.quantity, 0);
  // Demo rule: 10% on a selection containing all four method phases.
  const complete = ['repara', 'prepara', 'pinta', 'protege'].every((phase) => selected.some((s) => productById(s.productId).phase === phase));
  const discount = complete ? Math.round(subtotal * 0.1) : 0;
  return { subtotal, discount, total: subtotal - discount };
}
export function linePrice(line: CartLine): number {
  return line.kind === 'kit' ? kitPrice(line.selections ?? []).total : variantById(line.productId!, line.variantId!).price;
}
export function cartPrice(lines: CartLine[], promo = '', market: 'EU' | 'US' = 'EU') {
  const subtotal = lines.reduce((sum, line) => sum + linePrice(line) * line.quantity, 0);
  const discount = promo.toUpperCase() === 'DEMO10' ? Math.round(subtotal * 0.1) : 0;
  const threshold = market === 'EU' ? 6000 : 10000;
  const shipping = subtotal === 0 || subtotal - discount >= threshold ? 0 : market === 'EU' ? 490 : 1490;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping, remaining: Math.max(0, threshold - subtotal + discount) };
}
export const money = (cents: number, language = 'es') => new Intl.NumberFormat(language === 'es' ? 'es-ES' : 'en-GB', { style: 'currency', currency: 'EUR' }).format(cents / 100);
