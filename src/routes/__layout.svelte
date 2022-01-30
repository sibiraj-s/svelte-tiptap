<script lang="ts">
  import '../app.scss';
</script>

<main class="container mx-auto py-10 md:px-32">
  <nav class="mb-4">
    <a href="/" class="text-blue-600 hover:underline">Advanced Editor</a>
    <a href="/floating-menu" class="text-blue-600 hover:underline ml-1">Floating Menu</a>
    <a href="/bubble-menu" class="text-blue-600 hover:underline ml-1">Bubble Menu</a>
  </nav>
  <slot />
</main>
