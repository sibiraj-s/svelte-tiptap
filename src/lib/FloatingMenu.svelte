<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { FloatingMenuPlugin } from '@tiptap/extension-floating-menu';
  import type { FloatingMenuPluginProps } from '@tiptap/extension-floating-menu';

  import type { Editor } from './Editor';

  export let editor: Editor;
  export let tippyOptions: FloatingMenuPluginProps['tippyOptions'] = {};
  export let pluginKey: FloatingMenuPluginProps['pluginKey'] = 'SvelteTiptapFloatingMenu';
  export let shouldShow: FloatingMenuPluginProps['shouldShow'] = null;
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
