import { render, act } from '@testing-library/svelte';
import StarterKit from '@tiptap/starter-kit';

import { Editor, FloatingMenu } from '$lib';
import FloatingMenuComponent from './components/FloatingMenu.svelte';

it('should render the floating menu correctly', async () => {
  const editor = new Editor({
    content: 'Hello world!',
    extensions: [StarterKit],
  });

  const { getByTestId } = render(FloatingMenuComponent, { editor });
  await act();

  editor.chain().clearContent().focus().run();
  await act();

  expect(getByTestId('bold-button')).toBeDefined();
  expect(getByTestId('italics-button')).toBeDefined();
});

it('should throw error if editor instance is not provided', () => {
  expect(() => { render(FloatingMenu); }).toThrow();
});
