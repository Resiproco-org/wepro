import { describe, expect, it } from 'vitest';
import { defaultKit, kitPrice, cartPrice, linePrice } from './pricing';
import { productById, projects } from './data';
import type { CartLine } from './types';
describe('project kit amounts in integer cents', () => {
  it('applies a sample saving only with all four phases', () => {
    const kit = defaultKit(projects[0]);
    expect(kitPrice(kit)).toEqual({ subtotal: 5620, discount: 562, total: 5058 });
    kit[0].selected = false;
    expect(kitPrice(kit)).toEqual({ subtotal: 4470, discount: 0, total: 4470 });
  });
  it('recalculates formats, quantities and complete-kit tools', () => {
    const kit = defaultKit(projects[0], true);
    kit[2].variantId = productById('pintura-water-based').variants.find((v) => v.format === '200 ml')!.id;
    kit[2].quantity = 2;
    expect(kitPrice(kit)).toEqual({ subtotal: 7700, discount: 770, total: 6930 });
    kit.forEach((s) => s.selected = false);
    expect(kitPrice(kit).total).toBe(0);
  });
});
describe('cart quantities, discounts and delivery', () => {
  const product: CartLine = { id:'product',kind:'product',productId:'pintura-water-based',variantId:productById('pintura-water-based').variants[0].id,quantity:2 };
  const kit: CartLine = { id:'kit',kind:'kit',projectId:projects[0].id,selections:defaultKit(projects[0]),quantity:1 };
  it('combines kit and product and recalculates after removal', () => {
    expect(linePrice(kit)).toBe(5058);
    expect(cartPrice([product,kit])).toEqual({ subtotal:8238,discount:0,shipping:0,total:8238,remaining:0 });
    expect(cartPrice([product]).total).toBe(3670);
    expect(cartPrice([]).total).toBe(0);
  });
  it('applies promo before calculating the free shipping threshold', () => {
    expect(cartPrice([product], 'DEMO10')).toEqual({ subtotal:3180,discount:318,shipping:490,total:3352,remaining:3138 });
    expect(cartPrice([kit], '', 'US').shipping).toBe(1490);
    expect(cartPrice([kit], 'unknown').discount).toBe(0);
  });
});
