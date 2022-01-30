<script lang="ts">
  import { NodeViewWrapper, editable } from '$lib';
</script>

<NodeViewWrapper
  id="svelte-component"
  class="bg-yellow-200/90 border-black border-2 px-4 pb-4 my-4 rounded-md flex flex-col"
>
  <span class="bg-black py-1 px-3 text-white rounded-b-md uppercase text-[0.6rem] font-bold w-max"
    >Svelte Editable Component</span
  >

  <p id="editable-component" use:editable class="mt-4 border-dashed border-gray-900/20 border-2 p-2 rounded-md" />
</NodeViewWrapper>
