import { render, act } from '@testing-library/svelte';
import StarterKit from '@tiptap/starter-kit';

import { BubbleMenu, Editor } from '../lib';
import BubbleMenuComponent from './components/BubbleMenu.svelte';

it('should render the bubble menu correctly', async () => {
  const editor = new Editor({
    content: 'Hello world!',
    extensions: [StarterKit],
  });

  const { getByTestId } = render(BubbleMenuComponent, { editor });
  await act();

  editor.commands.selectAll();
  await act();

  expect(getByTestId('bold-button')).toBeDefined();
});

it('should throw error if editor instance is not provided', () => {
  expect(() => { render(BubbleMenu); }).toThrow();
});
