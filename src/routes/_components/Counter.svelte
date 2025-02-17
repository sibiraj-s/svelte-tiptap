<script lang="ts">
  import type { NodeViewProps } from '@tiptap/core';
  import cx from 'clsx';
  import { NodeViewWrapper } from '$lib';

  const { node, updateAttributes, selected }: NodeViewProps = $props();

  const handleClick = (): void => {
    updateAttributes({ count: node.attrs.count + 1 });
  };
</script>

<NodeViewWrapper
  id="svelte-component"
  data-selected={selected}
  class={cx('bg-yellow-200/90 border-black border-2 px-4 pb-4 rounded-md flex flex-col my-4', {
    'border-green-500': selected,
  })}
  data-drag-handle=""
>
  <span class="bg-black py-1 px-3 text-white rounded-b-md uppercase text-[0.6rem] font-bold w-max"
    >Svelte Component</span
  >

  <div class="mt-4">
    <button
      id="counter-button"
      class="bg-gray-200 border-black border rounded-sm px-1"
      onclick={handleClick}
      type="button"
    >
      This button has been clicked {node.attrs.count} times.
    </button>
  </div>
</NodeViewWrapper>
