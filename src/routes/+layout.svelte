<script lang="ts">
  import { base } from '$app/paths';
  import '../app.scss';
</script>

<main class="container mx-auto py-10 px-4 sm:px-16 md:px-32">
  <nav class="mb-4 flex gap-4">
    <a href="{base}/" class="text-blue-600 hover:underline">Advanced Editor</a>
    <a href="{base}/floating-menu" class="text-blue-600 hover:underline">Floating Menu</a>
    <a href="{base}/bubble-menu" class="text-blue-600 hover:underline">Bubble Menu</a>
  </nav>
  <slot />
</main>
