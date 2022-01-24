<script lang="ts">
  import { beforeUpdate, onDestroy, onMount, tick } from 'svelte';
  import type { Editor } from './Editor';

  let element: HTMLElement;
  export let editor: Editor;

  const init = async () => {
    await tick();
    if (!editor || !editor.options.element) {
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
  beforeUpdate(init);

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

<div bind:this={element} />
