<script lang="ts">
  import { onMount } from 'svelte';
  import { FloatingMenuPlugin, type FloatingMenuPluginProps } from '@tiptap/extension-floating-menu';

  import type { ComponentInputProps } from './types';
  import { invariant } from './utils';

  type Props = ComponentInputProps<FloatingMenuPluginProps>;

  const {
    editor,
    options = {},
    pluginKey = 'SvelteTiptapFloatingMenu',
    shouldShow = null,
    class: className,
    children,
  }: Props = $props();

  invariant(editor, 'Missing editor instance.');

  let element: HTMLElement;

  onMount(() => {
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';

    const plugin = FloatingMenuPlugin({
      pluginKey,
      editor,
      element,
      options,
      shouldShow,
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
