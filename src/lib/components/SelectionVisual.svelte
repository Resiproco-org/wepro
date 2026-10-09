<script lang="ts">
  let { category, value, label }: { category: string; value: string; label: string } = $props();
  const photographs: Record<string, Record<string, string>> = {
    need: { repair: 'workshop', renew: 'furniture', paint: 'painting', protect: 'finish', restore: 'metal', vehicle: 'bodywork', outdoor: 'outdoor', personalize: 'ceramic' },
    material: { wood: 'timber', metal: 'metal', plastic: 'furniture', stone: 'stone', ceramic: 'ceramic', bodywork: 'bodywork', glass: 'finish', wall: 'wall' },
    environment: { interior: 'interior', exterior: 'exterior' },
    finish: { matte: 'furniture', satin: 'interior', gloss: 'finish', effect: 'wall' }
  };
  const photograph = $derived(photographs[category][value]);
</script>

<img src={`/images/selection/${photograph}.jpg`} alt={label} aria-label={label} width="760" height="820" loading="lazy"/>

<style>
  img { display: block; width: 100%; height: 100%; object-fit: cover; }
</style>
