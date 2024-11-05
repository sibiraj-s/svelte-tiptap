import { mount, unmount } from 'svelte';
import type { NodeViewProps } from '@tiptap/core';

interface RendererOptions {
  element: HTMLElement;
  props: NodeViewProps;
}

type App = ReturnType<typeof mount>;

class SvelteRenderer {
  component: App;
  props: NodeViewProps;
  dom: HTMLElement;

  constructor(component: App, { element, props }: RendererOptions) {
    this.component = component;
    this.props = props;
    this.dom = element;

    this.dom.classList.add('svelte-renderer');
  }

  updateProps(props: Partial<NodeViewProps>): void {
    Object.assign(this.props, props);
  }

  updateAttributes(attributes: Record<string, string>): void {
    Object.keys(attributes).forEach((key) => {
      this.dom.setAttribute(key, attributes[key]);
    });
  }

  destroy(): void {
    unmount(this.component);
  }
}

export default SvelteRenderer;
