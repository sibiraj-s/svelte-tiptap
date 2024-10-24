<script lang="ts">
  import { onDestroy, onMount, type Snippet, tick } from 'svelte';
  import type { Editor } from './Editor';

  interface Props {
    editor: Editor;
    children?: Snippet;
  }

  const { editor, children }: Props = $props();
  let element: HTMLElement;

  const init = async () => {
    await tick();
    if (!editor?.options.element) {
      return;
    }

    if (editor.contentElement) {
      return;
    }

    element.append(...Array.from(editor.options.element.childNodes));
    editor.setOptions({ element });

    editor.contentElement = element;
  };

  onMount(init);
  $effect.pre(() => {
    // Subscribe to the editor state, this needs to be done as async dependencies aren't tracked
    // And init() is an async function
    if (editor) {
      // empty
    }
    init();
  });

  onDestroy(() => {
    if (!editor) {
      return;
    }

    editor.contentElement = null;

    if (!editor.options.element.firstChild) {
      return;
    }

    const newElement = document.createElement('div');
    newElement.append(...Array.from(editor.options.element.childNodes));

    editor.setOptions({
      element: newElement,
    });
  });
</script>

<div bind:this={element}></div>
{@render children?.()}
