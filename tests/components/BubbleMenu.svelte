<script lang="typescript">
  import { Editor, BubbleMenu, EditorContent } from '../../lib';
  import StarterKit from '@tiptap/starter-kit';

  export let editor: Editor = new Editor({ extensions: [StarterKit] });

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };
</script>

<BubbleMenu {editor}>
  <button on:click={toggleBold} class:active={editor.isActive('bold')} data-testid="bold-button">B</button>
  <button on:click={toggleItalic} class:active={editor.isActive('italic')} data-testid="italics-button">I</button>
</BubbleMenu>

<EditorContent {editor} />
