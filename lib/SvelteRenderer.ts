import type { NodeViewProps } from '@tiptap/core';
import type { SvelteComponent } from 'svelte';

interface RendererOptions {
  element: HTMLElement
}

class SvelteRenderer {
  component: SvelteComponent

  dom: HTMLElement

  constructor(component: SvelteComponent, { element }: RendererOptions) {
    this.component = component;
    this.dom = element;

    this.dom.classList.add('svelte-renderer');
  }

  updateProps(props: Partial<NodeViewProps>): void {
    this.component.$set(props);
  }

  destroy(): void {
    this.component.$destroy();
  }
}

export default SvelteRenderer;
