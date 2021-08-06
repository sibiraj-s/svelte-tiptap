<script lang="ts">
  import { BubbleMenuPlugin, BubbleMenuPluginKey } from '@tiptap/extension-bubble-menu';
  import type { BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';
  import { onDestroy, onMount } from 'svelte';

  import type { Editor } from './Editor';

  export let editor: Editor;
  export let tippyOptions: BubbleMenuPluginProps['tippyOptions'] = {};
  let element: HTMLElement;

  if (!editor) {
    throw new Error('Missing editor instance.');
  }

  onMount(() => {
    editor.registerPlugin(
      BubbleMenuPlugin({
        editor,
        element,
        tippyOptions,
      }),
    );
  });

  onDestroy(() => {
    editor.unregisterPlugin(BubbleMenuPluginKey);
  });
</script>

<div bind:this={element} class={$$props.class} style="visibility: hidden;">
  <slot />
</div>
