import type { EditorOptions } from '@tiptap/core';
import { readable, type Readable } from 'svelte/store';

import { Editor } from './Editor';

const createEditor = (options: Partial<EditorOptions>): Readable<Editor> => {
  const editor = new Editor(options);

  return readable(editor, (set) => {
    editor.on('transaction', () => {
      set(editor);
    });

    return () => {
      editor.destroy();
    };
  });
};

export default createEditor;
