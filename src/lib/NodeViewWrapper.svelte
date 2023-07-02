<script lang="ts">
  import { getContext, onMount, tick } from 'svelte';

  import { TIPTAP_NODE_VIEW } from './context';
  import type { TiptapNodeViewContext } from './types';

  const { onDragStart } = getContext<TiptapNodeViewContext>(TIPTAP_NODE_VIEW);
  let element: HTMLElement;
  export let as = 'div';

  onMount(async () => {
    await tick();
    element.style.whiteSpace = 'normal';
  });
</script>

<svelte:element
  this={as}
  bind:this={element}
  data-node-view-wrapper=""
  on:dragstart={onDragStart}
  role="none"
  {...$$restProps}
>
  <slot />
</svelte:element>
