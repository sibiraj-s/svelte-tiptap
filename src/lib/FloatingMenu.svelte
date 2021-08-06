<script lang="ts">
  import { FloatingMenuPlugin, FloatingMenuPluginKey } from '@tiptap/extension-floating-menu';
  import type { FloatingMenuPluginProps } from '@tiptap/extension-floating-menu';
  import { onDestroy, onMount } from 'svelte';

  import type { Editor } from './Editor';

  export let editor: Editor;
  export let tippyOptions: FloatingMenuPluginProps['tippyOptions'] = {};
  let element: HTMLElement;

  if (!editor) {
    throw new Error('Missing editor instance.');
  }

  onMount(() => {
    editor.registerPlugin(
      FloatingMenuPlugin({
        editor,
        element,
        tippyOptions,
      }),
    );
  });

  onDestroy(() => {
    editor.unregisterPlugin(FloatingMenuPluginKey);
  });
</script>

<div bind:this={element} class={$$props.class} style="visibility: hidden;">
  <slot />
</div>
