<script lang="ts">
  import { getContext, onMount, tick } from 'svelte';
  import { doNothingAction } from './actions';

  const { onDragStart, isInline } = getContext('TitTapNodeView');
  let element: HTMLElement;
  export let action = doNothingAction;

  onMount(async () => {
    await tick();
    element.style.whiteSpace = 'normal';
  });
</script>

<!-- TODO: prefer dynamic componentns -->
<!-- Issue: https://github.com/sveltejs/svelte/issues/2324 -->
{#if isInline}
  <span {...$$restProps} bind:this={element} data-node-view-wrapper="" on:dragstart={onDragStart} use:action>
    <slot />
  </span>
{:else}
  <div {...$$restProps} bind:this={element} data-node-view-wrapper="" on:dragstart={onDragStart} use:action>
    <slot />
  </div>
{/if}
