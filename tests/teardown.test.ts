import { it, expect } from 'vitest';
import { render, act } from '@testing-library/svelte';
import { flushSync } from 'svelte';

import type { Editor } from '#lib';
import EditorHost from './fixtures/EditorHost.svelte';

// https://github.com/sibiraj-s/svelte-tiptap/issues/76
it('should not throw when a transaction is dispatched while EditorContent is destroyed', async () => {
  let editor!: Editor;
  const { rerender } = render(EditorHost, { show: true, onEditor: (instance: Editor) => (editor = instance) });
  await act();

  // In a browser, detaching the focused editor DOM fires blur, which dispatches a transaction
  // synchronously while Svelte is tearing down the block. Simulate that here.
  let dispatched = 0;
  const setOptions = editor.setOptions.bind(editor);
  editor.setOptions = (options) => {
    setOptions(options);
    dispatched++;
    editor.view.dispatch(editor.state.tr.setMeta('focus', false));
  };

  await rerender({ show: false });
  flushSync();

  expect(dispatched).toBe(1);
  expect(editor.isDestroyed).toBe(false);

  await rerender({ show: true });
  expect(editor.getText()).toBe('Hello world!');
});
