<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Snippet } from 'svelte';

  import '../app.css';

  interface Props {
    children?: Snippet;
  }

  const { children }: Props = $props();
</script>

<main class="container mx-auto py-10 px-4 sm:px-16 md:px-32">
  <nav class="mb-4 flex gap-4 font-medium">
    <a href={resolve('/')} class="text-blue-600 hover:underline">Advanced Editor</a>
    <a href={resolve('/floating-menu')} class="text-blue-600 hover:underline">Floating Menu</a>
    <a href={resolve('/bubble-menu')} class="text-blue-600 hover:underline">Bubble Menu</a>
  </nav>
  {#if children}
    {@render children()}
  {/if}
</main>
