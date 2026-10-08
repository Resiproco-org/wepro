<script lang="ts">
  import { useDemo } from '#lib/demo.svelte';
  import { products, projects } from '#lib/data';
  import ProductCard from '#lib/components/ProductCard.svelte';
  import ProjectCard from '#lib/components/ProjectCard.svelte';
  const demo = useDemo();
</script>
<section class="section"><div class="container"><h1>{demo.t('Tus favoritos','Your wishlist')}</h1><p>{demo.t('Guardados en este navegador.','Saved in this browser.')}</p>{#if !demo.state.wishlist.length}<p class="empty">{demo.t('Todavía no has guardado ningún producto o proyecto.','No products or projects saved yet.')}</p><a class="button" href="/productos">{demo.t('Explorar productos','Explore products')}</a>{/if}<div class="grid cols-3">{#each demo.state.wishlist as id}<div>{#if products.find((p) => p.id === id)}<ProductCard product={products.find((p) => p.id === id)!}/>{:else if projects.find((p) => p.id === id)}<ProjectCard project={projects.find((p) => p.id === id)!}/>{/if}<button class="text-button" onclick={() => demo.favorite(id)}>{demo.t('Eliminar favorito','Remove favorite')}</button></div>{/each}</div></div></section>
