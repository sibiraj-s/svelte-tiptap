<script lang="ts">
  import type { NodeViewProps } from '@tiptap/core';
  import type { Node as ProseMirrorNode } from 'prosemirror-model';
  import cx from 'classnames';

  import { draggable, NodeViewWrapper } from '../lib';

  export let node: ProseMirrorNode;
  export let selected = false;
  export let updateAttributes: NodeViewProps['updateAttributes'];

  const handleClick = () => {
    updateAttributes({ count: node.attrs.count + 1 });
  };
</script>

<NodeViewWrapper class={cx('svelte-component', { selected })} action={draggable}>
  <span class="label">Svelte Component</span>

  <div class="content">
    <button on:click={handleClick} type="button">
      This button has been clicked {node.attrs.count} times.
    </button>
  </div>
</NodeViewWrapper>
