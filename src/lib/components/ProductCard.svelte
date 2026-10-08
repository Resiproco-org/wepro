<script lang="ts">
  import type { Product } from '#lib/types';
  import { useDemo } from '#lib/demo.svelte';
  import { phaseNames } from '#lib/data';
  import { money } from '#lib/pricing';
  import Artwork from './Artwork.svelte';
  let { product }: { product: Product } = $props();
  const demo = useDemo();
  let variantId = $state('');
  const selected = $derived(product.variants.find((v) => v.id === variantId) ?? product.variants[0]);
</script>
<article class="card product-card">
  <a href={`/productos/${product.id}`} aria-label={product.name}><Artwork kind="product" color={selected.hex} phase={product.phase} label={product.name + ' · demo'} /></a>
  <div class="card-body">
    <div class="eyebrow">{phaseNames[product.phase][demo.state.language]} · {demo.t('MUESTRA', 'SAMPLE')}</div>
    <h3><a href={`/productos/${product.id}`}>{product.name}</a></h3>
    <label class="compact">{demo.t('Variante', 'Variant')}<select bind:value={variantId} aria-label={`${demo.t('Variante de', 'Variant for')} ${product.name}`}><option value="">{demo.t('Seleccionar', 'Select')} · {product.variants[0].format}</option>{#each product.variants as v}<option value={v.id}>{v.format} · {v.color} {v.ral ? `RAL ${v.ral}` : ''} · {v.finish}{v.stock === 0 ? ' · 0 stock' : ''}</option>{/each}</select></label>
    <div class="row between"><strong>{money(selected.price, demo.state.language)}</strong><small>{selected.stock > 0 ? demo.t('Stock demo', 'Demo stock') : demo.t('Agotado demo', 'Demo out of stock')}</small></div>
    <div class="row"><a class="button secondary" href={`/productos/${product.id}`}>{demo.t('Ver producto', 'View product')}</a><button disabled={!selected.stock} onclick={() => demo.add({ kind: 'product', productId: product.id, variantId: selected.id, quantity: 1 })}>{demo.t('Añadir', 'Add')}</button></div>
  </div>
</article>
