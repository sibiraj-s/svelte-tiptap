import { it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/svelte';
import StarterKit from '@tiptap/starter-kit';

import { BubbleMenu, Editor } from '#lib';
import { SvelteCounterExtension } from '../src/routes/_components/SvelteExtension';
import BubbleMenuHost from './fixtures/BubbleMenuHost.svelte';

it('should throw error if editor instance is not provided', () => {
  expect(() => {
    render(BubbleMenu);
  }).toThrow();
});

// https://github.com/sibiraj-s/svelte-tiptap/issues/78
it('should position the menu for a selected svelte node view', async () => {
  const errors: unknown[] = [];
  const onError = (event: ErrorEvent) => errors.push(event.error);
  window.addEventListener('error', onError);

  const editor = new Editor({
    content: '<svelte-counter-component count="1"></svelte-counter-component>',
    extensions: [StarterKit, SvelteCounterExtension],
  });

  const { getByTestId } = render(BubbleMenuHost, { editor });
  await act();

  // Svelte renders comment anchors inside the node view wrapper, which tiptap v2 measured by mistake
  const wrapper = editor.view.dom.querySelector('[data-node-view-wrapper]');
  expect(wrapper?.firstChild?.nodeType).toBe(Node.COMMENT_NODE);

  editor.commands.setNodeSelection(0);
  await vi.waitFor(() => {
    expect(getByTestId('bubble-menu').parentElement?.style.visibility).toBe('visible');
  });

  window.removeEventListener('error', onError);
  expect(errors).toEqual([]);

  editor.destroy();
});
