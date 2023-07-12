<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { BubbleMenuPlugin, type BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';

  import type { Editor } from './Editor';

  export let editor: Editor;
  export let tippyOptions: BubbleMenuPluginProps['tippyOptions'] = {};
  export let pluginKey: BubbleMenuPluginProps['pluginKey'] = 'SvelteTiptapBubbleMenu';
  export let shouldShow: BubbleMenuPluginProps['shouldShow'] = null;
  export let updateDelay: BubbleMenuPluginProps['updateDelay'] = 250;
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
  });

  onDestroy(() => {
    editor.unregisterPlugin(pluginKey);
  });
</script>

<div bind:this={element} class={$$props.class} style="visibility: hidden;">
  <slot />
</div>
