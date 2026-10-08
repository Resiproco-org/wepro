<script lang="ts">
  let { category, value, label }: { category: string; value: string; label: string } = $props();
  const actions: Record<string, string> = {
    repair: 'M82 131L104 110L116 122L137 99M101 83L112 101M131 124L143 142',
    renew: 'M87 92A39 39 0 1 1 82 131M87 92V73M87 92H107',
    paint: 'M80 78H139V101H80ZM139 89H151V117H115V147',
    protect: 'M115 72L150 86V111Q150 139 115 154Q80 139 80 111V86ZM98 110L110 122L134 98',
    restore: 'M76 147L142 81M130 76L149 95M86 123L101 138M76 147L90 145',
    vehicle: 'M70 130V109L84 100L98 80H132L147 100L160 109V130ZM87 100H144M91 130V141M141 130V141',
    outdoor: 'M115 149V97M115 117Q76 111 82 80Q115 82 115 117M115 133Q150 126 150 94Q116 98 115 133',
    personalize: 'M115 72L125 101L155 111L125 121L115 151L105 121L75 111L105 101M151 68V84M143 76H159'
  };
</script>

<svg viewBox="0 0 230 210" role="img" aria-label={label}>
  <rect width="230" height="210" rx="20" fill="#e9eddf"/>
  <circle cx="115" cy="109" r="72" fill="#d9ee9c" opacity=".55"/>
  <ellipse cx="115" cy="175" rx="59" ry="6" fill="#22251f" opacity=".08"/>
  <g stroke="#35432b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    {#if category === 'need'}
      <path d={actions[value] ?? actions.renew}/>
    {:else if category === 'environment'}
      {#if value === 'interior'}
        <path d="M67 104L115 65L163 104M79 98V151H151V98M103 151V115H128V151"/>
        <path d="M91 87V69H101"/>
      {:else}
        <circle cx="145" cy="77" r="15" fill="#e8bc75" stroke="#8a693e"/>
        <path d="M145 49V43M173 77H179M164 57L170 51M81 148V95M81 124Q51 114 58 86Q87 90 81 124M81 133Q111 125 106 101Q80 106 81 133M58 156H171"/>
      {/if}
    {:else if category === 'finish'}
      <path d="M69 99L115 73L162 99L115 128ZM69 99V138L115 164L162 138V99M115 128V164" fill={value === 'effect' ? '#b36a4c' : '#69765a'}/>
      {#if value === 'gloss' || value === 'effect'}
        <path d="M145 53V79M132 66H158M92 91L120 107" stroke="#fff"/>
      {:else if value === 'satin'}
        <path d="M87 99L114 114M97 93L124 108" stroke="#e9eddf" stroke-width="3"/>
      {:else}
        <path d="M90 97H91M106 91H107M106 105H107M122 99H123M122 113H123M138 106H139" stroke="#d9ee9c" stroke-width="3"/>
      {/if}
    {:else if value === 'wood'}
      <path d="M67 84L142 65L166 137L90 157ZM82 90Q110 80 111 104T146 137M94 83Q136 95 126 120T136 142M100 125Q111 117 117 127T106 137" fill="#d5b68a"/>
    {:else if value === 'metal'}
      <path d="M69 78H159V146H69ZM83 92H144V132H83ZM69 78L83 92M159 78L144 92M159 146L144 132M69 146L83 132" fill="#b4c2bd"/>
    {:else if value === 'plastic'}
      <path d="M87 72H139V124H87ZM87 124H148V138H87ZM92 138L86 158M139 138L146 158M139 72L148 124" fill="#b36a4c"/>
    {:else if value === 'ceramic'}
      <path d="M81 83H142V118Q142 151 111 151Q81 151 81 118ZM142 90H150Q175 111 142 126" fill="#dbba83"/>
    {:else if value === 'glass'}
      <path d="M83 73H147L138 149H92ZM97 91L124 118M119 89L132 102" fill="#c0d6cf"/>
    {:else if value === 'bodywork'}
      <path d={actions.vehicle} fill="#a7b7c4"/>
    {:else if value === 'wall'}
      <path d="M65 77H165V151H65ZM65 101H165M65 126H165M96 77V101M133 101V126M96 126V151" fill="#dbba83"/>
    {:else}
      <path d="M72 83L126 65L161 105L145 151L90 157L65 119ZM72 83L108 109L126 65M108 109L145 151M108 109L65 119M108 109L161 105" fill="#c0bfb4"/>
    {/if}
  </g>
</svg>

<style>
  svg { display: block; width: 100%; height: 100%; }
</style>
