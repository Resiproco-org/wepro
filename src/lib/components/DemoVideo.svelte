<script lang="ts">
  import { useDemo } from '#lib/demo.svelte';
  const demo = useDemo();
  let { title = 'WEPRO', vertical = false }: { title?: string; vertical?: boolean } = $props();
  let playing = $state(false);
  let frame = $state(0);
  $effect(() => { if (!playing) return; const timer = setInterval(() => frame = (frame + 1) % 4, 2000); return () => clearInterval(timer); });
  const steps = ['REPARA / REPAIR', 'PREPARA / PREPARE', 'PINTA / PAINT', 'PROTEGE / PROTECT'];
</script>
<div class="video-stage" class:playing style={vertical ? 'aspect-ratio:9/16' : ''}><small>{demo.t('ANIMACIÓN LOCAL DE MUESTRA · SIN AUDIO', 'LOCAL SAMPLE ANIMATION · NO AUDIO')}</small><strong>{playing ? steps[frame] : title}</strong>{#if playing}<p>{demo.t('Secuencia ilustrativa. No es un tutorial técnico aprobado.', 'Illustrative sequence. This is not an approved technical tutorial.')}</p><div class="video-progress"></div>{/if}<button class="secondary" style="margin-top:20px" onclick={() => playing = !playing}>{playing ? demo.t('Pausar', 'Pause') : demo.t('▶ Reproducir demo', '▶ Play demo')}</button></div>
