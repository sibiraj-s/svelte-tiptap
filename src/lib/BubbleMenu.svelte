<script lang="ts">
  import { onMount } from 'svelte';
  import { BubbleMenuPlugin, type BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';

  import type { ComponentInputProps } from './types';
  import { invariant } from './utils';

  type Props = ComponentInputProps<BubbleMenuPluginProps>;

  const {
    editor,
    options = {},
    pluginKey = 'SvelteTiptapBubbleMenu',
    shouldShow = null,
    updateDelay = 250,
    children,
    class: className,
  }: Props = $props();

  invariant(editor, 'Missing editor instance.');

  let element: HTMLElement;

  onMount(() => {
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';

    const plugin = BubbleMenuPlugin({
      pluginKey,
      editor,
      element,
      options,
      shouldShow,
      updateDelay,
    });

    editor.registerPlugin(plugin);

    return () => {
      editor?.unregisterPlugin(pluginKey);
      window.requestAnimationFrame(() => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  });
</script>

<div bind:this={element} class={className} style="visibility: hidden;">
  {#if children}
    {@render children()}
  {/if}
</div>
