<script lang="ts">
  import Tiptap from './Tiptap.svelte';
  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
  <Tiptap />
</main>

<style>
  main {
    max-width: 90%;
    margin: 0 auto;
  }
</style>
