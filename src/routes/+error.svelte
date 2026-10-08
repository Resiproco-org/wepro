<script lang="ts">import { page } from '$app/state';</script>
<section class="section"><div class="container"><h1>{page.status}</h1><p>{page.error?.message}</p><a class="button" href="/">Inicio / Home</a></div></section>
