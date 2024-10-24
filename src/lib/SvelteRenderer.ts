import { unmount } from 'svelte';
import type { NodeViewProps } from '@tiptap/core';

interface RendererOptions {
  element: HTMLElement;
  reactiveProps: NodeViewProps;
}

class SvelteRenderer {
  component: Record<string, unknown>;
  reactiveProps: NodeViewProps;

  dom: HTMLElement;

  constructor(component: Record<string, unknown>, { element, reactiveProps }: RendererOptions) {
    this.component = component;
    this.reactiveProps = reactiveProps;
    this.dom = element;

    this.dom.classList.add('svelte-renderer');
  }

  updateProps(props: Partial<NodeViewProps>): void {
    Object.assign(this.reactiveProps, props);
  }

  destroy(): void {
    unmount(this.component);
  }
}

export default SvelteRenderer;
