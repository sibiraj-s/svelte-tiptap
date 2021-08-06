<script lang="ts">
  import { NodeViewWrapper, editable } from '$lib';
</script>

<NodeViewWrapper class="svelte-component">
  <span class="label">Svelte Editable Component</span>

  <p use:editable class="content editable" data-testid="editable" />
</NodeViewWrapper>
