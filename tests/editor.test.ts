import { it, expect } from 'vitest';
import { render, act } from '@testing-library/svelte';
import StarterKit from '@tiptap/starter-kit';

import { Editor, EditorContent } from '$lib';

it('should render the content correctly', async () => {
  const editor = new Editor({
    content: 'Hello world!',
    extensions: [StarterKit],
  });

  const { getByText } = render(EditorContent, { editor });

  await act();
  expect(getByText('Hello world!'));

  editor.destroy();
});
