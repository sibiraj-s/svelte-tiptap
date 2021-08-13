<script lang="ts">
  import { BubbleMenuPlugin } from '@tiptap/extension-bubble-menu';
  import type { BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';
  import { onDestroy, onMount } from 'svelte';

  import type { Editor } from './Editor';

  export let editor: Editor;
  export let tippyOptions: BubbleMenuPluginProps['tippyOptions'] = {};
  export let key: BubbleMenuPluginProps['key'] = 'SvelteTiptapBubbleMenu';
  export let shouldShow: BubbleMenuPluginProps['shouldShow'] = null;
  let element: HTMLElement;

  if (!editor) {
    throw new Error('Missing editor instance.');
  }

  onMount(() => {
    editor.registerPlugin(
      BubbleMenuPlugin({
        key,
        editor,
        element,
        tippyOptions,
        shouldShow,
      }),
    );
  });

  onDestroy(() => {
    editor.unregisterPlugin(key);
  });
</script>

<div bind:this={element} class={$$props.class} style="visibility: hidden;">
  <slot />
</div>
