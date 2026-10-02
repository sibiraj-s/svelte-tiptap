<script lang="ts">
  import type { NodeViewProps } from '@tiptap/core';

  import { NodeViewWrapper } from '#lib';

  const { node }: NodeViewProps = $props();

  // Re-creating the wrapper makes it read the node view context again after mount
  let version = $state(0);
</script>

{#key version}
  <NodeViewWrapper>
    <span data-drag-handle id="handle-{node.attrs.id}">{node.attrs.id}</span>
    <button id="remount-{node.attrs.id}" onclick={() => (version += 1)}>remount</button>
  </NodeViewWrapper>
{/key}
