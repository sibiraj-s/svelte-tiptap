<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';
  import type { Readable } from 'svelte/store';
  import StarterKit from '@tiptap/starter-kit';
  import cx from 'clsx';
  import { Editor, EditorContent, BubbleMenu, createEditor } from '$lib';

  let editor = $state() as Readable<Editor>;

  onMount(() => {
    editor = createEditor({
      extensions: [StarterKit],
      content: `
        <p>Hey, try to select some text here. There will popup a menu for selecting some inline styles.
           Remember: you have full control about content and styling of this menu..</p>
      `,
      editorProps: {
        attributes: {
          class: 'border-2 border-black rounded-md p-3 outline-hidden',
        },
      },
    });
  });

  const toggleBold = () => {
    $editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    $editor.chain().focus().toggleItalic().run();
  };

  const isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);
</script>

<svelte:head>
  <title>Bubble Menu | Tiptap Svelte</title>
</svelte:head>

<h1 class="mb-2 font-bold">Editor with Bubble Menu</h1>

{#if editor}
  <BubbleMenu editor={$editor}>
    <div data-test-id="bubble-menu" class="flex">
      <button
        class={cx('px-2 bg-black text-white/90 hover:text-white', {
          'text-white!': isActive('bold'),
        })}
        type="button"
        onclick={toggleBold}
      >
        bold
      </button>
      <button
        class={cx('px-2 bg-black text-white/90 hover:text-white', {
          'text-white!': isActive('italic'),
        })}
        type="button"
        onclick={toggleItalic}
      >
        italic
      </button>
    </div>
  </BubbleMenu>
{/if}

<EditorContent editor={$editor} />
