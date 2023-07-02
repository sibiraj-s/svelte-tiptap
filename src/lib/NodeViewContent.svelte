<script lang="ts">
  import { onMount, tick } from 'svelte';

  let element: HTMLElement;
  export let as = 'div';

  onMount(async () => {
    await tick();
    element.style.whiteSpace = 'pre-wrap';
  });
</script>

<svelte:element this={as} bind:this={element} data-node-view-content="" {...$$restProps}>
  <slot />
</svelte:element>
