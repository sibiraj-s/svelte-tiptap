<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Editor, EditorContent, FloatingMenu, BubbleMenu, createEditor,
} from '../lib';
  import StarterKit from '@tiptap/starter-kit';
  import type { Readable } from 'svelte/store';

  import { SvelteCounterExtension, SvelteEditableExtension } from './SvelteExtension';

  let editor: Readable<Editor>;

  onMount(() => {
    editor = createEditor({
      extensions: [StarterKit, SvelteCounterExtension, SvelteEditableExtension],
      content: `
        <p>This is still the text editor you’re used to, but enriched with node views.</p>
        <svelte-counter-component count="0"></svelte-counter-component>
        <p>This is an editable component</p>
        <svelte-editable-component>This is editable</svelte-editable-component>
        <p>Did you see that? That’s a Svelte component. We are really living in the future.</p>
      `,
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

{#if editor}
  <div class="menu">
    <button on:click={toggleHeading(1)} class:active={isActive('heading', { level: 1 })}> H1 </button>
    <button on:click={toggleHeading(2)} class:active={isActive('heading', { level: 2 })}> H2 </button>
    <button on:click={toggleBold} class:active={isActive('bold')}> B </button>
    <button on:click={toggleItalic} class:active={isActive('italic')}> I </button>
    <button on:click={setParagraph} class:active={isActive('paragraph')}> P </button>
  </div>
{/if}

{#if editor}
  <FloatingMenu editor={$editor}>
    <button on:click={toggleBold} class:active={isActive('bold')}> B </button>
    <button on:click={toggleItalic} class:active={isActive('italic')}> I </button>
  </FloatingMenu>
{/if}

{#if editor}
  <BubbleMenu editor={$editor}>
    <button on:click={toggleBold} class:active={isActive('bold')}> B </button>
    <button on:click={toggleItalic} class:active={isActive('italic')}> I </button>
  </BubbleMenu>
{/if}

<EditorContent editor={$editor} />

<style>
  .menu {
    margin-bottom: 1rem;
  }

  button {
    padding: 2px 6px;
    border-radius: 4px;
  }
  button.active {
    background: black;
    color: white;
  }
</style>
