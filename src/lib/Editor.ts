import { Editor as CoreEditor } from '@tiptap/core';

export class Editor extends CoreEditor {
  public contentElement: HTMLElement | null = null;
}
