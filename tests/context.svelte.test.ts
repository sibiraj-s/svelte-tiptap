import { it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/svelte';
import { flushSync } from 'svelte';
import { Node } from '@tiptap/core';
import { NodeSelection } from '@tiptap/pm/state';
import StarterKit from '@tiptap/starter-kit';

import { Editor, EditorContent, SvelteNodeViewRenderer } from '#lib';
import { TIPTAP_NODE_VIEW } from '../src/lib/context';
import ContextNode from './fixtures/ContextNode.svelte';
import RemountNode from './fixtures/RemountNode.svelte';

const createEditor = (context: Map<unknown, unknown>, component: typeof ContextNode = ContextNode) => {
  const ContextExtension = Node.create({
    name: 'contextNode',
    group: 'block',
    atom: true,
    draggable: true,

    addAttributes() {
      return { id: { default: null } };
    },

    parseHTML() {
      return [{ tag: 'context-node' }];
    },

    renderHTML({ HTMLAttributes }) {
      return ['context-node', HTMLAttributes];
    },

    addNodeView() {
      return SvelteNodeViewRenderer(component, { context });
    },
  });

  return new Editor({
    content: '<context-node id="a"></context-node><context-node id="b"></context-node>',
    extensions: [StarterKit, ContextExtension],
  });
};

it('should pass context values to node views', async () => {
  const settings = $state({ label: 'Node' });
  const editor = createEditor(new Map([['settings', settings]]));

  const { getByTestId } = render(EditorContent, { editor });
  await act();

  expect(getByTestId('handle-a').textContent).toBe('Node a');

  settings.label = 'Updated';
  flushSync();

  expect(getByTestId('handle-a').textContent).toBe('Updated a');
  expect(getByTestId('handle-b').textContent).toBe('Updated b');

  editor.destroy();
});

it('should not modify the context map passed in', async () => {
  const context = new Map<unknown, unknown>([['settings', { label: 'Node' }]]);
  const editor = createEditor(context);

  render(EditorContent, { editor });
  await act();

  expect([...context.keys()]).toEqual(['settings']);
  expect(context.has(TIPTAP_NODE_VIEW)).toBe(false);

  editor.destroy();
});

it('should drag its own node after the wrapper is re-created', async () => {
  // RemountNode never reads context itself, so the re-created wrapper reads the node view context directly
  const editor = createEditor(new Map(), RemountNode);

  const { getByTestId } = render(EditorContent, { editor });
  await act();

  // node "b" mounts last; a re-created wrapper on "a" must still drag "a"
  await fireEvent.click(getByTestId('remount-a'));
  await act();

  await fireEvent.dragStart(getByTestId('handle-a'));

  const { selection } = editor.state;
  expect(selection).toBeInstanceOf(NodeSelection);
  expect((selection as NodeSelection).node.attrs.id).toBe('a');

  editor.destroy();
});
