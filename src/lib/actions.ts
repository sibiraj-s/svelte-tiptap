export const editable = (node: HTMLElement): void => {
  node.setAttribute('data-node-view-content', '');
  node.style.whiteSpace = 'pre-wrap';
};

export const draggable = (node: HTMLElement): void => {
  node.setAttribute('data-drag-handle', '');
};

export const doNothingAction = (): void => { /* do nothing */ };

export type Action = (node: HTMLElement) => void
