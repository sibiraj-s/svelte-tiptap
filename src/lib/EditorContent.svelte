<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte';
  import type { ComponentInputProps } from './types';

  type Props = ComponentInputProps<{}>;

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

{#if children}
  {@render children()}
{/if}
