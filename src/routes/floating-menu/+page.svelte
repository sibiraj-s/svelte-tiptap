<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';
  import type { Readable } from 'svelte/store';
  import StarterKit from '@tiptap/starter-kit';
  import cx from 'clsx';
  import { Editor, EditorContent, FloatingMenu, createEditor } from '$lib';

  let editor = $state() as Readable<Editor>;
  type Level = 1 | 2 | 3 | 4 | 5 | 6;

  onMount(() => {
    editor = createEditor({
      extensions: [StarterKit],
      content: `
        <p>This is an example of a Medium-like editor. Enter a new line and some buttons will appear.</p>
      `,
      editorProps: {
        attributes: {
          class: 'border-2 border-black rounded-md p-3 outline-none',
        },
      },
    });
  });

  const toggleHeading = (level: Level) => {
    return () => {
      $editor.chain().focus().toggleHeading({ level }).run();
    };
  };

  const toggleBold = () => {
    $editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    $editor.chain().focus().toggleItalic().run();
  };

  const isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);
</script>

<svelte:head>
  <title>Floating Menu | Tiptap Svelte</title>
</svelte:head>

<h1 class="mb-2 font-bold">Editor with Floating Menu</h1>

{#if editor}
  <FloatingMenu editor={$editor}>
    <div data-test-id="floating-menu">
      <button
        class={cx('border border-black rounded px-2 hover:bg-black hover:text-white', {
          'bg-black text-white': isActive('heading', { level: 1 }),
        })}
        type="button"
        onclick={toggleHeading(1)}
      >
        h1
      </button>
      <button
        class={cx('border border-black rounded px-2 hover:bg-black hover:text-white', {
          'bg-black text-white': isActive('bold'),
        })}
        type="button"
        onclick={toggleBold}
      >
        bold
      </button>
      <button
        class={cx('border border-black rounded px-2 hover:bg-black hover:text-white', {
          'bg-black text-white': isActive('italic'),
        })}
        type="button"
        onclick={toggleItalic}
      >
        italic
      </button>
    </div>
  </FloatingMenu>
{/if}

<EditorContent editor={$editor} />
