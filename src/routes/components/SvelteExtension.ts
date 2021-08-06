import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from '$lib';

import CounterComponent from './Counter.svelte';
import EditableComponent from './Editable.svelte';

export const SvelteCounterExtension = Node.create({
  name: 'svelteCounterComponent',
  group: 'block',
  atom: true,
  draggable: true,
  inline: false,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'svelte-counter-component' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['svelte-counter-component', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return SvelteNodeViewRenderer(CounterComponent);
  },
});

export const SvelteEditableExtension = Node.create({
  name: 'svelteEditableComponent',
  group: 'block',
  content: 'inline*',

  parseHTML() {
    return [{ tag: 'svelte-editable-component' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['svelte-editable-component', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return SvelteNodeViewRenderer(EditableComponent);
  },
});
