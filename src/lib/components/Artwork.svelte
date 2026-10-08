<script lang="ts">
  let { kind = 'table', color = '#69765a', label = 'Ilustración de muestra', phase = 'pinta' }: { kind?: string; color?: string; label?: string; phase?: string } = $props();
</script>
<svg viewBox="0 0 600 430" role="img" aria-label={label} class="artwork">
  <rect width="600" height="430" fill="#e9e5dc" />
  <path d="M0 305L600 260V430H0Z" fill="#d8d1c3" />
  <path d="M0 310L600 266M0 360L600 316M95 430L355 282M430 430L535 270" stroke="#c9c0ae" stroke-width="2" />
  <ellipse cx="305" cy="351" rx="185" ry="27" fill="#a49f90" opacity=".22" />
  {#if kind === 'product'}
    <ellipse cx="300" cy="365" rx="70" ry="10" fill="#b6af9f"/>
    <rect x="246" y="91" width="108" height="266" rx="16" fill="#f9f7ef" stroke="#c9c4b8" stroke-width="2"/>
    <rect x="246" y="71" width="108" height="78" rx="15" fill={color}/>
    <path d="M252 145H348" stroke="#c5c0b4"/>
    <rect x="252" y="205" width="96" height="67" fill="#20221f"/>
    <text x="300" y="238" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="#fff" text-anchor="middle">WEPRO</text>
    <text x="300" y="258" font-family="Arial, sans-serif" font-size="9" fill="#fff" text-anchor="middle">{phase.toUpperCase()}</text>
    <text x="300" y="308" font-family="Arial, sans-serif" font-size="10" fill="#555" text-anchor="middle">DEMO / 400 ml</text>
    <path d="M261 158V197M261 283V334" stroke="white" stroke-width="4"/>
  {:else if kind === 'metal'}
    <path d="M130 341V153L466 106V294M130 197L466 150M130 233L466 186" stroke={color} stroke-width="14" fill="none"/>
    {#each [176,222,268,314,360,406] as x}<path d={`M${x} ${190-(x-130)*.14}V${331-(x-130)*.14}`} stroke={color} stroke-width="8" />{/each}
  {:else if kind === 'ceramic'}
    <path d="M224 175H385L359 344Q300 366 250 344Z" fill={color}/><ellipse cx="305" cy="174" rx="82" ry="20" fill="#343e2d"/>
    <path d="M305 170Q246 103 268 58Q313 84 305 170M305 170Q370 89 403 93Q392 153 305 170M305 170Q309 78 345 40" fill="#69765a" stroke="#46573b" stroke-width="4"/>
  {:else if kind === 'wall'}
    <rect x="125" y="74" width="357" height="261" fill={color}/><rect x="208" y="110" width="168" height="164" fill="#f4ede0"/><path d="M220 252L263 177L307 215L363 138V262H220Z" fill="#a8987e"/>
  {:else if kind === 'bodywork'}
    <path d="M114 287L154 216H214L258 155H393L446 219L490 246V312H114Z" fill={color}/><path d="M263 170H322V216H234ZM334 170H388L426 216H334Z" fill="#c2d2ce"/><circle cx="195" cy="310" r="32" fill="#242624"/><circle cx="420" cy="310" r="32" fill="#242624"/>
  {:else}
    <path d="M145 214L164 354H186L183 219M414 191L418 330H440L449 183M219 263L213 380H235L253 264M482 238L471 366H493L515 229" fill={color} stroke="#39432e" stroke-opacity=".25" stroke-width="2"/>
    <path d="M110 209L365 139L526 210L255 286Z" fill={color}/><path d="M110 209V230L255 307L526 232V210L255 286Z" fill={color} stroke="#242624" stroke-opacity=".15"/>
    <path d="M156 205L365 151L477 207M178 219L375 166M215 236L410 185" stroke="white" opacity=".12" stroke-width="2"/>
    <ellipse cx="345" cy="196" rx="32" ry="13" fill="#eadcc5"/><path d="M321 190L322 157Q346 147 369 157L368 190" fill="#bf805f"/><ellipse cx="345" cy="156" rx="24" ry="8" fill="#956042"/>
    <path d="M345 152V111M345 133Q307 115 323 95Q350 104 345 133M345 145Q378 123 370 108Q341 117 345 145" fill="#536849" stroke="#536849" stroke-width="3"/>
  {/if}
  <text x="25" y="403" font-family="Arial, sans-serif" font-size="11" fill="#585c53">WEPRO — DEMO ILLUSTRATION</text>
</svg>
