<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import { BubbleMenuPlugin, type BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';

  import type { Editor } from './Editor';

  interface Props {
    editor: Editor;
    tippyOptions?: BubbleMenuPluginProps['tippyOptions'];
    pluginKey?: BubbleMenuPluginProps['pluginKey'];
    shouldShow?: BubbleMenuPluginProps['shouldShow'];
    updateDelay?: BubbleMenuPluginProps['updateDelay'];
    class?: string;
    children?: Snippet;
  }

  let {
    editor,
    tippyOptions = {},
    pluginKey = 'SvelteTiptapBubbleMenu',
    shouldShow = null,
    updateDelay = 250,
    class: klass,
    children,
  }: Props = $props();

  let element: HTMLElement;

  if (!editor) {
    throw new Error('Missing editor instance.');
  }

  onMount(() => {
    const plugin = BubbleMenuPlugin({
      pluginKey,
      editor,
      element,
      tippyOptions,
      shouldShow,
      updateDelay,
    });

    editor.registerPlugin(plugin);

    return () => editor.unregisterPlugin(pluginKey);
  });
</script>

<div bind:this={element} class={klass} style="visibility: hidden;">
  {@render children?.()}
</div>
