<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import { FloatingMenuPlugin, type FloatingMenuPluginProps } from '@tiptap/extension-floating-menu';

  import type { Editor } from './Editor';

  interface Props {
    editor: Editor;
    tippyOptions?: FloatingMenuPluginProps['tippyOptions'];
    pluginKey?: FloatingMenuPluginProps['pluginKey'];
    shouldShow?: FloatingMenuPluginProps['shouldShow'];
    class?: string;
    children: Snippet;
  }

  let {
    editor,
    tippyOptions = {},
    pluginKey = 'SvelteTiptapFloatingMenu',
    shouldShow = null,
    class: klass,
    children,
  }: Props = $props();
  let element: HTMLElement;

  if (!editor) {
    throw new Error('Missing editor instance.');
  }

  onMount(() => {
    const plugin = FloatingMenuPlugin({
      pluginKey,
      editor,
      element,
      tippyOptions,
      shouldShow,
    });

    editor.registerPlugin(plugin);

    return () => editor.unregisterPlugin(pluginKey);
  });
</script>

<div bind:this={element} class={klass} style="visibility: hidden;">
  {@render children?.()}
</div>
