<script lang="ts">
  import { NodeViewWrapper, NodeViewContent } from '$lib';
  import cx from 'clsx';
  import type { NodeViewProps } from '@tiptap/core';

  export let selected: NodeViewProps['selected'] = false;
</script>

<NodeViewWrapper
  id="svelte-component"
  data-selected={selected}
  class={cx('bg-yellow-200/90 border-black border-2 px-4 pb-4 rounded-md flex flex-col my-4', {
    'border-green-500': selected,
  })}
  data-drag-handle=""
>
  <span
    class="bg-black py-1 px-3 text-white rounded-b-md uppercase text-[0.6rem] font-bold w-max cursor-default"
    contenteditable="false">Svelte Editable Component</span
  >

  <NodeViewContent class="mt-4 border-dashed border-gray-900/20 border-2 p-2 rounded-md" id="editable-component" />
</NodeViewWrapper>
