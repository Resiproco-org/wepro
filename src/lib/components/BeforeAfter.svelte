<script lang="ts">
  import { useDemo } from '#lib/demo.svelte';
  import Artwork from './Artwork.svelte';
  const demo = useDemo();
  let value = $state(50);
</script>
<div><div class="compare"><Artwork color="#69765a" label={demo.t('Mesa después · ilustración demo', 'Table after · demo illustration')}/><div class="before" style={`clip-path:inset(0 ${100-value}% 0 0)`}><Artwork color="#a8987e" label={demo.t('Mesa antes · ilustración demo', 'Table before · demo illustration')}/></div><span style="left:15px">{demo.t('ANTES', 'BEFORE')}</span><span style="right:15px">{demo.t('DESPUÉS', 'AFTER')}</span></div><label style="margin-top:18px">{demo.t('Desliza para comparar · imágenes de muestra', 'Slide to compare · sample images')}<input type="range" min="0" max="100" bind:value={value}/></label></div>
