<script lang="ts" generics="T extends keyof SvelteHTMLElements = 'div'">
  import { onMount, tick } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';

  type Props = SvelteHTMLElements[T] & {
    as?: T;
  };

  const { as = 'div' as T, children, ...rest }: Props = $props();

  let element: HTMLElement;

  onMount(async () => {
    await tick();
    element.style.whiteSpace = 'pre-wrap';
  });
</script>

<svelte:element this={as} bind:this={element} data-node-view-content {...rest}>
  {@render children?.()}
</svelte:element>
