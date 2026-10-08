<script lang="ts">
  import { untrack } from 'svelte';
  import { useDemo } from '#lib/demo.svelte';
  import { environments, finishes, materials, needs, phaseNames, productById, projects, variantById } from '#lib/data';
  import { recommend } from '#lib/recommendation';
  import { defaultKit, kitPrice, money } from '#lib/pricing';
  import type { Answers, Copy, Finish, KitSelection } from '#lib/types';
  import Artwork from './Artwork.svelte';
  import SelectionVisual from './SelectionVisual.svelte';

  const demo = useDemo();
  const defaults: Required<Answers> = { need: 'renew', material: 'wood', environment: 'interior', finish: 'satin' };
  const answers = $derived({ ...defaults, ...demo.state.answers });
  const columns: { key: keyof Answers; title: Copy; options: Record<string, Copy> }[] = [
    { key: 'need', title: { es: 'Tu idea', en: 'Your idea' }, options: needs },
    { key: 'material', title: { es: 'El material', en: 'The material' }, options: materials },
    { key: 'environment', title: { es: 'El lugar', en: 'The setting' }, options: environments },
    { key: 'finish', title: { es: 'El acabado', en: 'The finish' }, options: finishes }
  ];

  function surprise() {
    const project = projects[Math.floor(Math.random() * projects.length)];
    const finish = (['matte', 'satin', 'gloss'] as Finish[])[Math.floor(Math.random() * 3)];
    demo.state.answers = { need: project.need, material: project.material, environment: project.environment, finish };
  }
  $effect(() => {
    if (!demo.ready) return;
    untrack(() => {
      if (!Object.values(demo.state.answers).some(Boolean)) surprise();
      else demo.state.answers = { ...defaults, ...demo.state.answers };
    });
  });
  function change(key: keyof Answers, value: string) {
    demo.state.answers = { ...answers, [key]: value };
  }

  const result = $derived(recommend(answers));
  const project = $derived(result?.kind === 'project' ? projects.find((p) => p.id === result.id) : undefined);
  const selections = $derived.by((): KitSelection[] => {
    if (!result) return [];
    const items = project ? defaultKit(project) : [{ productId: result.id, variantId: productById(result.id).variants[0].id, quantity: 1, selected: true }];
    return items.map((item) => {
      const variant = productById(item.productId).variants.find((v) => v.finish === answers.finish && v.stock > 0);
      return variant ? { ...item, variantId: variant.id } : item;
    });
  });
  const total = $derived(kitPrice(selections));
  const signature = $derived(JSON.stringify(answers));
  function add() {
    if (project) demo.add({ kind: 'kit', projectId: project.id, selections, quantity: 1 });
    else if (selections[0]) demo.add({ kind: 'product', productId: selections[0].productId, variantId: selections[0].variantId, quantity: 1 });
  }
</script>

<div class="project-selector">
  <div class="selector-intro">
    <p>{demo.t('Una idea para empezar. Cambia cualquier opción y descubre lo que necesitas.', 'An idea to get started. Change any option and discover what you need.')}</p>
    <button class="secondary" onclick={surprise}><span aria-hidden="true">↻</span> {demo.t('Probar otra idea', 'Try another idea')}</button>
  </div>

  <div class="selection-columns">
    {#each columns as column, i}
      <div class="selection-step">
        <div class="step-heading"><span class="number">0{i + 1}</span><span>{column.title[demo.state.language]}</span></div>
        <div class="selection-card">
          <div class="selection-image">
            {#key answers[column.key]}
              <div class="visual-enter"><SelectionVisual category={column.key} value={answers[column.key]} label={column.options[answers[column.key]][demo.state.language]}/></div>
            {/key}
          </div>
          <label>
            <span>{column.title[demo.state.language]}</span>
            <select aria-label={column.title[demo.state.language]} value={answers[column.key]} onchange={(event) => change(column.key, event.currentTarget.value)}>
              {#each Object.entries(column.options) as [value, copy]}<option {value}>{copy[demo.state.language]}</option>{/each}
            </select>
          </label>
        </div>
      </div>
    {/each}
  </div>

  <div class="collection-connector" aria-hidden="true"><span>↓</span></div>
  <div class="collection-panel" aria-live="polite" aria-atomic="true">
    {#key signature}
      <div class="collection-content visual-enter">
        {#if result}
          <div class="collection-heading">
            <div><div class="eyebrow">{demo.t('TU SELECCIÓN · DEMO', 'YOUR SELECTION · DEMO')}</div><h3>{project ? demo.t('Tu proyecto, en un kit.', 'Your project, in one kit.') : demo.t('El producto para tu idea.', 'The product for your idea.')}</h3><p>{project ? project.title[demo.state.language] : productById(result.id).name}</p></div>
            <span class="selection-badge">{selections.length} {demo.t('productos', 'products')} · {finishes[answers.finish][demo.state.language]}</span>
          </div>
          <div class="collection-layout">
            <div class="collection-products">
              {#each selections as selection}
                {@const product = productById(selection.productId)}
                {@const variant = variantById(selection.productId, selection.variantId)}
                <a class="collection-product" href={`/productos/${product.id}`}>
                  <Artwork kind="product" color={variant.hex} phase={product.phase} label={product.name}/>
                  <div class="product-copy"><span class="product-phase">{phaseNames[product.phase][demo.state.language]}</span><h4>{product.name}</h4><span class="product-detail">{selection.quantity} × {variant.format} · {finishes[variant.finish][demo.state.language]}</span><strong>{money(variant.price * selection.quantity, demo.state.language)}</strong></div>
                </a>
              {/each}
            </div>
            <aside class="order-summary">
              <span class="summary-label">{demo.t('LISTO PARA TU CARRITO', 'READY FOR YOUR CART')}</span>
              {#if total.discount}<span class="subtotal">{money(total.subtotal, demo.state.language)}</span>{/if}
              <div class="price">{money(total.total, demo.state.language)}</div>
              {#if total.discount}<p>{demo.t('Ahorro demo', 'Demo saving')}: {money(total.discount, demo.state.language)}</p>{/if}
              <button class="wide" onclick={add} disabled={!demo.ready}>{project ? demo.t('Añadir kit al carrito', 'Add kit to cart') : demo.t('Añadir al carrito', 'Add to cart')} <span aria-hidden="true">↗</span></button>
              <a href={project ? `/proyectos/${project.id}?finish=${answers.finish}` : `/productos/${result.id}`}>{project ? demo.t('Ver proyecto y editar kit', 'View project and edit kit') : demo.t('Ver producto recomendado', 'View recommended product')} →</a>
            </aside>
          </div>
          <p class="recommendation-note">{result.exact ? demo.t('Selección por reglas de demostración. No es una recomendación técnica aprobada.', 'Selected by demo rules. This is not an approved technical recommendation.') : demo.t('No hay coincidencia exacta: te mostramos una alternativa de muestra para este material y uso.', 'No exact match: here is a sample alternative for this material and use.')}</p>
        {:else}
          <h3>{demo.t('Probemos otra combinación.', 'Let’s try another combination.')}</h3>
          <p>{demo.t('No hay una alternativa en estos datos de muestra. Cambia una opción o explora el catálogo.', 'There is no alternative in this sample data. Change an option or explore the catalog.')}</p>
          <a class="button" href="/productos">{demo.t('Ver catálogo', 'View catalog')} →</a>
        {/if}
      </div>
    {/key}
  </div>
</div>

<style>
  .selector-intro { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin: 12px 0 32px; }
  .selector-intro p { color: #ced4c5; max-width: 580px; margin: 0; }
  .selector-intro button { flex-shrink: 0; }
  .selection-columns { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
  .selection-step { min-width: 0; }
  .step-heading { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; font-size: 14px; font-weight: 600; }
  .number { display: grid; place-items: center; width: 42px; height: 42px; border: 1px solid #738063; border-radius: 50%; color: var(--lime); font-size: 12px; letter-spacing: .05em; }
  .selection-card { padding: 12px; border: 1px solid #56624b; background: #30382a; border-radius: 24px; transition: border-color 180ms, transform 180ms; }
  .selection-card:focus-within { border-color: var(--lime); transform: translateY(-3px); }
  .selection-image { overflow: hidden; border-radius: 16px; aspect-ratio: 230 / 210; }
  .visual-enter { animation: selection-in 280ms ease-out; height: 100%; }
  .selection-card label { margin-top: 14px; }
  .selection-card label > span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .selection-card select { background: #252d20; color: #fff; border-color: #657258; font-size: 13px; padding-inline: 10px; cursor: pointer; }
  .collection-connector { display: flex; justify-content: center; height: 56px; }
  .collection-connector span { display: grid; place-items: center; width: 1px; background: #657258; color: var(--lime); font-size: 23px; }
  .collection-panel { border: 1px solid #657258; border-radius: 26px; padding: 28px; background: #f3f5ed; color: var(--ink); }
  .collection-heading { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-bottom: 24px; }
  .collection-heading .eyebrow { color: #5d6552; margin-bottom: 8px; }
  .collection-heading h3 { font-size: clamp(25px, 3vw, 32px); margin-bottom: 8px; letter-spacing: -.04em; }
  .collection-heading p { margin: 0; color: #64695c; }
  .selection-badge { background: #e2ebcf; border-radius: 24px; padding: 10px 14px; font-size: 12px; white-space: nowrap; }
  .collection-layout { display: grid; grid-template-columns: minmax(0, 1fr) 240px; gap: 24px; }
  .collection-products { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; align-items: start; }
  .collection-product { display: block; background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #dce1d2; height: 100%; transition: border-color 180ms; }
  .collection-product:hover { border-color: #849c48; text-decoration: none; }
  .collection-product :global(.artwork) { display: block; width: 100%; aspect-ratio: 1.1; }
  .product-copy { padding: 14px; }
  .product-phase { font-size: 9px; letter-spacing: .12em; color: #64695c; }
  h4 { font-size: 13px; line-height: 1.4; margin: 8px 0; }
  .product-detail { display: block; font-size: 11px; color: #64695c; line-height: 1.5; }
  .product-copy strong { display: block; margin-top: 12px; font-size: 15px; }
  .order-summary { display: flex; flex-direction: column; align-items: flex-start; padding: 22px; border-radius: 18px; background: #e5edda; }
  .summary-label { font-size: 9px; letter-spacing: .1em; margin-bottom: 18px; }
  .subtotal { font-size: 13px; text-decoration: line-through; color: #64695c; margin-bottom: 6px; }
  .order-summary .price { font-size: 36px; }
  .order-summary p { font-size: 12px; margin: 10px 0 0; }
  .order-summary button { margin-top: 22px; padding-inline: 12px; font-size: 13px; }
  .order-summary a { font-size: 12px; margin-top: 16px; line-height: 1.5; }
  .recommendation-note { font-size: 11px; color: #64695c; margin: 20px 0 0; }
  @keyframes selection-in { from { opacity: .3; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @media (max-width: 1000px) {
    .selection-columns { gap: 12px; }
    .collection-layout { grid-template-columns: 1fr; }
    .order-summary { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; align-items: center; }
    .order-summary button { grid-column: 2; grid-row: 1 / span 3; margin: 0; }
    .order-summary a { grid-column: 2; margin: 0; }
    .summary-label { margin: 0; }
    .order-summary p { margin: 0; }
    .subtotal { margin: 0; }
  }
  @media (max-width: 650px) {
    .selector-intro { align-items: flex-start; flex-direction: column; gap: 16px; }
    .selection-columns { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px 12px; }
    .step-heading { gap: 8px; font-size: 12px; margin-bottom: 10px; }
    .number { width: 32px; height: 32px; font-size: 10px; }
    .selection-card { padding: 8px; border-radius: 18px; }
    .selection-card select { font-size: 12px; padding-inline: 6px; }
    .collection-panel { padding: 18px; border-radius: 22px; }
    .collection-heading { flex-direction: column; gap: 12px; }
    .collection-products { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .product-copy { padding: 12px; }
    .order-summary { display: flex; gap: 0; padding: 20px; }
    .summary-label { margin-bottom: 14px; }
    .order-summary p { margin-top: 10px; }
    .order-summary button { margin-top: 20px; }
    .order-summary a { margin-top: 16px; }
  }
  @media (prefers-reduced-motion: reduce) { .visual-enter { animation: none; } .selection-card { transition: none; } }
</style>
