<script lang="ts">
  import { getContext, onMount, tick } from 'svelte';

  import type { Action } from './types';
  import { doNothingAction } from './actions';
  import { TIPTAP_NODE_VIEW } from './context';

  const { onDragStart, isInline } = getContext(TIPTAP_NODE_VIEW);
  let element: HTMLElement;
  export let action: Action = doNothingAction;

  onMount(async () => {
    await tick();
    element.style.whiteSpace = 'normal';
  });
</script>

<!-- TODO: prefer dynamic componentns -->
<!-- Issue: https://github.com/sveltejs/svelte/issues/2324 -->
{#if isInline}
  <span bind:this={element} data-node-view-wrapper="" on:dragstart={onDragStart} use:action {...$$restProps}>
    <slot />
  </span>
{:else}
  <div bind:this={element} data-node-view-wrapper="" on:dragstart={onDragStart} use:action {...$$restProps}>
    <slot />
  </div>
{/if}
