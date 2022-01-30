<script lang="ts">
  import { onMount } from 'svelte';
  import { Editor, EditorContent, createEditor } from '$lib';
  import StarterKit from '@tiptap/starter-kit';
  import type { Readable } from 'svelte/store';
  import cx from 'classnames';

  import { SvelteCounterExtension, SvelteEditableExtension } from './_components/SvelteExtension';

  let editor: Readable<Editor>;

  onMount(() => {
    editor = createEditor({
      extensions: [StarterKit, SvelteCounterExtension, SvelteEditableExtension],
      content: `
        <p>This is still the text editor you're used to, but enriched with node views.</p>
        <svelte-counter-component count="0"></svelte-counter-component>
        <p>This is an editable component</p>
        <svelte-editable-component>This is editable</svelte-editable-component>
        <p>Did you see that? That's a Svelte component. We are really living in the future.</p>
      `,
      editorProps: {
        attributes: {
          class: 'border-2 border-black rounded-b-md p-3 outline-none ',
        },
      },
    });
  });

  const toggleHeading = (level: 1 | 2) => {
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

  const setParagraph = () => {
    $editor.chain().focus().setParagraph().run();
  };

  $: isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);
</script>

<svelte:head>
  <title>Tiptap Svelte</title>
</svelte:head>

<h1 class="mb-2">Editor with Nodeview Renderer</h1>

{#if editor}
  <div class="border-black border-2 border-b-0 rounded-t-md p-2 flex">
    <button
      class={cx('hover:bg-black hover:text-white w-7 h-7 rounded', {
        'bg-black text-white': isActive('heading', { level: 1 }),
      })}
      on:click={toggleHeading(1)}
    >
      H1
    </button>
    <button
      class={cx('hover:bg-black hover:text-white w-7 h-7 rounded ml-1', {
        'bg-black text-white': isActive('heading', { level: 2 }),
      })}
      on:click={toggleHeading(2)}
    >
      H2
    </button>
    <button
      class={cx('hover:bg-black hover:text-white w-7 h-7 rounded ml-1', {
        'bg-black text-white': isActive('bold'),
      })}
      on:click={toggleBold}
    >
      B
    </button>
    <button
      class={cx('hover:bg-black hover:text-white w-7 h-7 rounded ml-1', {
        'bg-black text-white': isActive('italic'),
      })}
      on:click={toggleItalic}
    >
      I
    </button>
    <button
      class={cx('hover:bg-black hover:text-white w-7 h-7 rounded ml-1', {
        'bg-black text-white': isActive('paragraph'),
      })}
      on:click={setParagraph}
    >
      P
    </button>
  </div>
{/if}

<EditorContent editor={$editor} />
