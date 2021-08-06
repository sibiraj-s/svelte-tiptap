export const editable = (node: HTMLElement):void => {
  node.setAttribute('data-node-view-content', '');
  node.style.whiteSpace = 'pre-wrap';
};

export const draggable = (node: HTMLElement):void => {
  node.setAttribute('data-drag-handle', '');
};

export const doNothingAction = (_: HTMLElement):void => {}; // eslint-disable-line
