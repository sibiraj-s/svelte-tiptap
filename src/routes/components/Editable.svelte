<script lang="ts">
  import { NodeViewWrapper, editable } from '$lib';
</script>

<NodeViewWrapper class="svelte-component editable-component">
  <span class="label">Svelte Editable Component</span>

  <p use:editable class="content editable" />
</NodeViewWrapper>
