<script lang="ts">
  import { goto } from '$app/navigation';
  import { useDemo } from '#lib/demo.svelte';
  import { productById, projects, variantById } from '#lib/data';
  import { cartPrice, linePrice, money } from '#lib/pricing';
  const demo = useDemo();
  let code = $state('');
  let promoMessage = $state('');
  const totals = $derived(cartPrice(demo.state.cart, demo.state.promo, demo.state.market));
  const nextProduct = $derived.by(() => { const last = demo.state.cart.find((l) => l.kind === 'product'); if (!last) return productById('herramientas'); const p = productById(last.productId!); return productById(p.phase === 'repara' ? 'imprimacion-madera' : p.phase === 'prepara' ? 'pintura-water-based' : p.phase === 'pinta' ? 'barniz-acrilico' : 'herramientas'); });
  function checkout() { const id = demo.checkout(); if (id) goto(`/pedidos/${id}`); }
</script>
<h2>{demo.t('Tu carrito', 'Your cart')} <span class="muted">({demo.state.cart.reduce((n, l) => n + l.quantity, 0)})</span></h2>
<p class="demo-note">{demo.t('Importes ficticios. No hay cobros ni envíos reales.', 'Fictional amounts. No real charges or shipments.')}</p>
{#if !demo.state.cart.length}<div class="empty"><p>{demo.t('Tu próximo proyecto empieza aquí.', 'Your next project starts here.')}</p><a class="button" href="/productos" onclick={() => demo.drawer = false}>{demo.t('Explorar productos', 'Explore products')}</a></div>{:else}
  {#each demo.state.cart as line (line.id)}
    <article class="cart-line"><div><h3>{line.kind === 'kit' ? `Kit · ${projects.find((p) => p.id === line.projectId)?.title[demo.state.language]}` : productById(line.productId!).name}</h3>
    {#if line.kind === 'product'}{@const v = variantById(line.productId!, line.variantId!)}<p class="muted">{v.format} · {v.color} {v.ral ? `RAL ${v.ral}` : ''} · {v.finish}</p>{:else}<details><summary>{demo.t('Ver contenido del kit', 'View kit contents')}</summary>{#each line.selections?.filter((s) => s.selected) ?? [] as s}<p>{s.quantity} × {productById(s.productId).name} · {variantById(s.productId, s.variantId).format} · {variantById(s.productId, s.variantId).color}</p>{/each}</details><a href={`/proyectos/${line.projectId}?edit=${line.id}#kit`} onclick={() => demo.drawer = false}>{demo.t('Editar kit', 'Edit kit')}</a>{/if}</div>
    <div class="row between"><div class="quantity"><button aria-label={demo.t('Reducir cantidad', 'Decrease quantity')} disabled={line.quantity <= 1} onclick={() => demo.quantity(line.id, line.quantity - 1)}>−</button><span>{line.quantity}</span><button aria-label={demo.t('Aumentar cantidad', 'Increase quantity')} onclick={() => demo.quantity(line.id, line.quantity + 1)}>+</button></div><strong>{money(linePrice(line) * line.quantity, demo.state.language)}</strong><button class="text-button" onclick={() => demo.remove(line.id)}>{demo.t('Eliminar', 'Remove')}</button></div></article>
  {/each}
  <label>{demo.t('Mercado simulado', 'Simulated market')}<select bind:value={demo.state.market}><option value="EU">UE / EU · EUR</option><option value="US">EE. UU. / US · EUR</option></select></label>
  <p class="muted">{demo.t('Entrega demo:', 'Demo delivery:')} {demo.state.market === 'EU' ? '3–5' : '7–10'} {demo.t('días. Impuestos de muestra incluidos; sin aranceles reales.', 'days. Sample taxes included; no real customs duties.')}</p>
  <p>{totals.remaining ? `${demo.t('Para envío demo gratis faltan', 'Remaining for free demo shipping')} ${money(totals.remaining, demo.state.language)}` : demo.t('Envío demo gratis', 'Free demo shipping')}</p>
  <div class="callout"><h3>{demo.t('Completa tu proyecto', 'Complete your project')}</h3><p>{nextProduct.name} · {demo.t('Siguiente fase / accesorio de muestra', 'Next phase / sample accessory')}</p><button class="secondary" onclick={() => demo.add({ kind: 'product', productId: nextProduct.id, variantId: nextProduct.variants[0].id, quantity: 1 })}>+ {demo.t('Añadir', 'Add')}</button></div>
  <form class="row" onsubmit={(e) => { e.preventDefault(); demo.state.promo = code.toUpperCase() === 'DEMO10' ? 'DEMO10' : ''; promoMessage = demo.t(code.toUpperCase() === 'DEMO10' ? 'Descuento demo aplicado' : 'Código no válido. Prueba DEMO10.', code.toUpperCase() === 'DEMO10' ? 'Demo discount applied' : 'Invalid code. Try DEMO10.'); }}><label>{demo.t('Código de muestra: DEMO10', 'Sample code: DEMO10')}<input bind:value={code}/></label><button class="secondary">{demo.t('Aplicar', 'Apply')}</button></form><p role="status">{promoMessage}</p>
  <dl class="totals"><div><dt>Subtotal</dt><dd>{money(totals.subtotal, demo.state.language)}</dd></div><div><dt>{demo.t('Descuento', 'Discount')}</dt><dd>−{money(totals.discount, demo.state.language)}</dd></div><div><dt>{demo.t('Envío demo', 'Demo shipping')}</dt><dd>{money(totals.shipping, demo.state.language)}</dd></div><div class="grand"><dt>Total</dt><dd>{money(totals.total, demo.state.language)}</dd></div></dl>
  <button class="wide" onclick={checkout}>{demo.t('Crear pedido ficticio local', 'Create fictional local order')}</button><p class="muted">{demo.t('No cobra ni envía información. Compra demo sin registro.', 'No charge and no information sent. Guest demo checkout.')}</p><button class="secondary wide" onclick={checkout}>{demo.t('Compra exprés · simulada', 'Express checkout · simulated')}</button>
{/if}
