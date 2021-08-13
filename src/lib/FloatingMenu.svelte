<script lang="ts">
  import { FloatingMenuPlugin } from '@tiptap/extension-floating-menu';
  import type { FloatingMenuPluginProps } from '@tiptap/extension-floating-menu';
  import { onDestroy, onMount } from 'svelte';

  import type { Editor } from './Editor';

  export let editor: Editor;
  export let tippyOptions: FloatingMenuPluginProps['tippyOptions'] = {};
  export let key: FloatingMenuPluginProps['key'] = 'SvelteTiptapFloatingMenu';
  export let shouldShow: FloatingMenuPluginProps['shouldShow'] = null;
  let element: HTMLElement;

  if (!editor) {
    throw new Error('Missing editor instance.');
  }

  onMount(() => {
    editor.registerPlugin(
      FloatingMenuPlugin({
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
