import { getContext, setContext } from 'svelte';
import { cartPrice } from './pricing';
import { variantById } from './data';
import type { CartLine, DemoState, Language } from './types';
const key = 'wepro-demo-v1';
const browser = typeof window !== 'undefined';
const initial = (): DemoState => ({ language: 'es', cart: [], answers: {}, orders: [], wishlist: [], notifications: [], reviews: [], promo: '', market: 'EU' });
export class Demo {
  state = $state<DemoState>(initial());
  ready = $state(false);
  notice = $state('');
  drawer = $state(false);
  init() {
    if (browser) { try { const saved = localStorage.getItem(key); if (saved) this.state = { ...initial(), ...JSON.parse(saved) }; } catch { this.notice = 'No se pudo recuperar la demo / Could not restore demo'; } this.ready = true; }
  }
  persist() { if (browser && this.ready) { try { localStorage.setItem(key, JSON.stringify(this.state)); } catch { this.notice = 'Almacenamiento no disponible / Storage unavailable'; } } }
  t(es: string, en: string) { return this.state.language === 'es' ? es : en; }
  language(value: Language) { this.state.language = value; }
  add(line: Omit<CartLine, 'id'>) {
    if (line.kind === 'product' && variantById(line.productId!, line.variantId!).stock === 0) return;
    if (line.kind === 'kit' && (!line.selections?.some((s) => s.selected) || line.selections.some((s) => s.selected && variantById(s.productId, s.variantId).stock === 0))) return;
    const existing = this.state.cart.find((item) => item.kind === line.kind && item.productId === line.productId && item.variantId === line.variantId && item.projectId === line.projectId && JSON.stringify(item.selections) === JSON.stringify(line.selections));
    if (existing) existing.quantity += line.quantity;
    else this.state.cart.push({ ...JSON.parse(JSON.stringify(line)), id: crypto.randomUUID() });
    this.drawer = true;
    this.notice = this.t('Añadido a tu carrito de demostración', 'Added to your demo cart');
  }
  quantity(id: string, quantity: number) { const line = this.state.cart.find((l) => l.id === id); if (line) line.quantity = Math.max(1, Math.floor(quantity)); }
  remove(id: string) { this.state.cart = this.state.cart.filter((l) => l.id !== id); }
  favorite(id: string) { this.state.wishlist = this.state.wishlist.includes(id) ? this.state.wishlist.filter((v) => v !== id) : [...this.state.wishlist, id]; }
  checkout() {
    if (!this.state.cart.length) return null;
    const totals = cartPrice(this.state.cart, this.state.promo, this.state.market);
    const order = { id: `DEMO-${Date.now().toString(36).toUpperCase()}`, created: new Date().toISOString(), lines: JSON.parse(JSON.stringify(this.state.cart)), ...totals, market: this.state.market, status: 0, reminders: [] };
    this.state.orders.unshift(order); this.state.cart = []; this.state.promo = ''; this.drawer = false; this.persist(); return order.id;
  }
  reset() { this.state = initial(); this.drawer = false; this.notice = this.t('Demo reiniciada', 'Demo reset'); this.persist(); }
}
const context = Symbol('demo');
export function provideDemo() { return setContext(context, new Demo()); }
export function useDemo() { return getContext<Demo>(context); }
