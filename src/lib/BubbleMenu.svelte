<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
  import type { BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';

  import type { Editor } from './Editor';

  export let editor: Editor;
  export let tippyOptions: BubbleMenuPluginProps['tippyOptions'] = {};
  export let pluginKey: BubbleMenuPluginProps['pluginKey'] = 'SvelteTiptapBubbleMenu';
  export let shouldShow: BubbleMenuPluginProps['shouldShow'] = null;
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
    });

    editor.registerPlugin(plugin);
  });

  onDestroy(() => {
    editor.unregisterPlugin(pluginKey);
  });
</script>

<!-- Wrapping empty div to fix error with unmount -->
<!-- https://github.com/ueberdosis/tiptap/issues/2241 -->
<!-- https://github.com/sveltejs/svelte/pull/6996 -->
<!-- https://github.com/sveltejs/svelte/pull/6910 -->
<div>
  <div bind:this={element} class={$$props.class} style="visibility: hidden;">
    <slot />
  </div>
</div>
