import { it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/svelte';

import EditorHost from './fixtures/EditorHost.svelte';

// https://github.com/sibiraj-s/svelte-tiptap/issues/81
it('should not warn about mutating the editor prop', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

  // EditorContent assigns `contentElement` and calls `setOptions` on the editor when mounting and destroying
  const { rerender } = render(EditorHost, { show: true });
  await act();
  await rerender({ show: false });
  await rerender({ show: true });

  const ownershipWarnings = warn.mock.calls.filter((args) => String(args[0]).includes('ownership_invalid_mutation'));
  expect(ownershipWarnings).toEqual([]);

  warn.mockRestore();
});
