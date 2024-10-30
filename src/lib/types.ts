import type { Snippet } from 'svelte';

import type { Editor } from './Editor';

export interface TiptapNodeViewContext {
  onDragStart: (event: DragEvent) => void;
}

export type ComponentInputProps<T> = Partial<T> & {
  editor: Editor;
  class?: string;
  children?: Snippet;
};
