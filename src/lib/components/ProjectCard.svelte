<script lang="ts">
  import type { Project } from '#lib/types';
  import { useDemo } from '#lib/demo.svelte';
  import { materials, difficulties, environments } from '#lib/data';
  import { defaultKit, kitPrice, money } from '#lib/pricing';
  import Artwork from './Artwork.svelte';
  let { project, kit = false }: { project: Project; kit?: boolean } = $props();
  const demo = useDemo();
</script>
<article class="card">
  <a href={`/proyectos/${project.id}${kit ? '#kit' : ''}`}><Artwork kind={project.material} color={project.color} label={project.title[demo.state.language] + ' · demo'} /></a>
  <div class="card-body"><div class="eyebrow">{materials[project.material][demo.state.language]} · {demo.t('PROYECTO DEMO', 'DEMO PROJECT')}</div><h3><a href={`/proyectos/${project.id}`}>{kit ? 'Kit · ' : ''}{project.title[demo.state.language]}</a></h3><p class="muted">{difficulties[project.difficulty][demo.state.language]} · {project.hours} h + {demo.t('secado de muestra', 'sample drying')} · {environments[project.environment][demo.state.language]}</p><div class="row between"><strong>{money(kitPrice(defaultKit(project)).total, demo.state.language)}</strong><a href={`/proyectos/${project.id}${kit ? '#kit' : ''}`}>{demo.t(kit ? 'Editar kit →' : 'Ver qué necesito →', kit ? 'Edit kit →' : 'What I need →')}</a></div></div>
</article>
