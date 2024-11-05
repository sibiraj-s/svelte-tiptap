import { NodeView, Editor, getRenderedAttributes } from '@tiptap/core';
import type { NodeViewRenderer, NodeViewProps, NodeViewRendererOptions, DecorationWithType } from '@tiptap/core';
import type { Decoration, DecorationSource } from '@tiptap/pm/view';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { type Component, mount } from 'svelte';

import SvelteRenderer from './SvelteRenderer';
import { TIPTAP_NODE_VIEW } from './context';
import { invariant } from './utils';

interface RendererUpdateProps {
  oldNode: ProseMirrorNode;
  oldDecorations: readonly Decoration[];
  oldInnerDecorations: DecorationSource;
  newNode: ProseMirrorNode;
  newDecorations: readonly Decoration[];
  newInnerDecorations: DecorationSource;
  updateProps: () => void;
}

type AttrProps =
  | Record<string, string>
  | ((props: { node: ProseMirrorNode; HTMLAttributes: Record<string, any> }) => Record<string, string>);

export interface SvelteNodeViewRendererOptions extends NodeViewRendererOptions {
  update: ((props: RendererUpdateProps) => boolean) | null;
  as?: string;
  attrs?: AttrProps;
}

class SvelteNodeView extends NodeView<Component<NodeViewProps>, Editor, SvelteNodeViewRendererOptions> {
  declare renderer: SvelteRenderer;
  declare contentDOMElement: HTMLElement | null;

  override mount(): void {
    const Component = this.component;

    const props = $state<NodeViewProps>({
      editor: this.editor,
      node: this.node,
      decorations: this.decorations as DecorationWithType[],
      innerDecorations: this.innerDecorations,
      view: this.view,
      selected: false,
      extension: this.extension,
      HTMLAttributes: this.HTMLAttributes,
      getPos: () => this.getPos(),
      updateAttributes: (attributes = {}) => this.updateAttributes(attributes),
      deleteNode: () => this.deleteNode(),
    });

    this.contentDOMElement = this.node.isLeaf ? null : document.createElement(this.node.isInline ? 'span' : 'div');

    if (this.contentDOMElement) {
      // For some reason the whiteSpace prop is not inherited properly in Chrome and Safari
      // With this fix it seems to work fine
      // See: https://github.com/ueberdosis/tiptap/issues/1197
      this.contentDOMElement.style.whiteSpace = 'inherit';
    }

    const context = new Map();
    context.set(TIPTAP_NODE_VIEW, {
      onDragStart: this.onDragStart.bind(this),
    });

    const as = this.options.as ?? (this.node.isInline ? 'span' : 'div');
    const target = document.createElement(as);
    target.classList.add(`node-${this.node.type.name}`);

    this.handleSelectionUpdate = this.handleSelectionUpdate.bind(this);
    this.editor.on('selectionUpdate', this.handleSelectionUpdate);

    const svelteComponent = mount(Component, { target, props, context });

    this.renderer = new SvelteRenderer(svelteComponent, {
      element: target,
      props,
    });

    this.appendContendDom();
    this.updateElementAttributes();
  }

  private appendContendDom() {
    const contentElement = this.dom.querySelector('[data-node-view-content]');

    if (this.contentDOMElement && contentElement && !contentElement.contains(this.contentDOMElement)) {
      contentElement.appendChild(this.contentDOMElement);
    }
  }

  override get dom() {
    invariant(
      this.renderer.dom.firstElementChild?.hasAttribute('data-node-view-wrapper'),
      'Please use the NodeViewWrapper component for your node view.',
    );

    return this.renderer.dom;
  }

  override get contentDOM() {
    if (this.node.isLeaf) {
      return null;
    }

    return this.contentDOMElement;
  }

  handleSelectionUpdate() {
    const { from, to } = this.editor.state.selection;
    const pos = this.getPos();

    if (typeof pos !== 'number') {
      return;
    }

    if (from <= pos && to >= pos + this.node.nodeSize) {
      if (this.renderer.props.selected) {
        return;
      }

      this.selectNode();
    } else {
      if (!this.renderer.props.selected) {
        return;
      }

      this.deselectNode();
    }
  }

  update(node: ProseMirrorNode, decorations: readonly Decoration[], innerDecorations: DecorationSource): boolean {
    const updateProps = (props: Partial<NodeViewProps>) => {
      this.renderer.updateProps(props);

      if (typeof this.options.attrs === 'function') {
        this.updateElementAttributes();
      }
    };

    if (typeof this.options.update === 'function') {
      const oldNode = this.node;
      const oldDecorations = this.decorations;
      const oldInnerDecorations = this.innerDecorations;

      this.node = node;
      this.decorations = decorations;
      this.innerDecorations = innerDecorations;

      return this.options.update({
        oldNode,
        oldDecorations,
        oldInnerDecorations,
        newNode: node,
        newDecorations: decorations,
        newInnerDecorations: innerDecorations,
        updateProps: () =>
          updateProps({
            node,
            decorations: decorations as DecorationWithType[],
            innerDecorations,
          }),
      });
    }

    if (node.type !== this.node.type) {
      return false;
    }

    if (node === this.node && this.decorations === decorations && this.innerDecorations === innerDecorations) {
      return true;
    }

    this.node = node;
    this.decorations = decorations;
    this.innerDecorations = innerDecorations;

    updateProps({
      node,
      decorations: decorations as DecorationWithType[],
      innerDecorations,
    });

    return true;
  }

  selectNode(): void {
    this.renderer.updateProps({ selected: true });
    this.renderer.dom.classList.add('ProseMirror-selectednode');
  }

  deselectNode(): void {
    this.renderer.updateProps({ selected: false });
    this.renderer.dom.classList.remove('ProseMirror-selectednode');
  }

  destroy(): void {
    this.renderer.destroy();
    this.editor.off('selectionUpdate', this.handleSelectionUpdate);
    this.contentDOMElement = null;
  }

  /**
   * Update the attributes of the top-level element that holds the React component.
   * Applying the attributes defined in the `attrs` option.
   */
  updateElementAttributes() {
    if (this.options.attrs) {
      let attrsObj: Record<string, string> = {};
      if (typeof this.options.attrs === 'function') {
        const extensionAttributes = this.editor.extensionManager.attributes;
        const HTMLAttributes = getRenderedAttributes(this.node, extensionAttributes);
        attrsObj = this.options.attrs({ node: this.node, HTMLAttributes });
      } else {
        attrsObj = this.options.attrs;
      }
      this.renderer.updateAttributes(attrsObj);
    }
  }
}

const SvelteNodeViewRenderer = (
  component: Component<NodeViewProps>,
  options?: Partial<SvelteNodeViewRendererOptions>,
): NodeViewRenderer => {
  return (props): SvelteNodeView => new SvelteNodeView(component, props, options);
};

export default SvelteNodeViewRenderer;
