<script lang="ts">
  import { onMount } from 'svelte';
  import type { Readable } from 'svelte/store';
  import StarterKit from '@tiptap/starter-kit';
  import { createEditor, EditorContent, type Editor } from '#lib';

  const { show = true, onEditor }: { show?: boolean; onEditor?: (editor: Editor) => void } = $props();
  let editor = $state() as Readable<Editor>;

  onMount(() => {
    editor = createEditor({ extensions: [StarterKit], content: 'Hello world!' });
    onEditor?.($editor);
  });
</script>

{#if show && $editor}
  <EditorContent editor={$editor} />
{/if}
