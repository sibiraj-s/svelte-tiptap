<script lang="ts">
import type { NodeViewProps } from '@tiptap/core';
import type { Node as ProseMirrorNode } from 'prosemirror-model';
import cx from 'classnames';

import { NodeViewWrapper } from '../../lib';

// export let editor: Editor = null;
export let node: ProseMirrorNode;
export let selected = false;
export let updateAttributes: NodeViewProps['updateAttributes'];

const handleClick = () => {
  updateAttributes({ count: node.attrs.count + 1 });
};
</script>

<NodeViewWrapper class={cx('svelte-component', { selected })} data-testid="nodeview-wrapper">
  <span class="label">Svelte Component</span>

  <div class="content">
    <button on:click={handleClick} type="button" data-testid="counter-button">
      This button has been clicked {node.attrs.count} times.
    </button>
  </div>
</NodeViewWrapper>
