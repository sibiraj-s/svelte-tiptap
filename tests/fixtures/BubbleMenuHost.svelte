<script lang="ts">
  import { BubbleMenu, EditorContent, type Editor } from '#lib';

  const { editor }: { editor: Editor } = $props();
</script>

<EditorContent {editor} />
<!-- happy-dom never focuses the editor, which the default shouldShow requires -->
<BubbleMenu {editor} updateDelay={0} shouldShow={() => true}>
  <div id="bubble-menu">Menu</div>
</BubbleMenu>
