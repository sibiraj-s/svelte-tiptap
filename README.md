# svelte-tiptap

> Svelte components for tiptap v2

[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/sibiraj-s/svelte-tiptap)
[![Tests](https://github.com/sibiraj-s/svelte-tiptap/actions/workflows/tests.yml/badge.svg)](https://github.com/sibiraj-s/svelte-tiptap/actions/workflows/tests.yml)
[![NPM Version](https://badgen.net/npm/v/svelte-tiptap)](https://www.npmjs.com/package/svelte-tiptap)
[![Total Downloads](https://badgen.net/npm/dt/svelte-tiptap)](https://www.npmjs.com/package/svelte-tiptap)
[![Monthly Downloads](https://badgen.net/npm/dm/svelte-tiptap)](https://www.npmjs.com/package/svelte-tiptap)
[![License](https://badgen.net/npm/license/svelte-tiptap)](https://github.com/sibiraj-s/svelte-tiptap/blob/master/LICENSE)

[demo on stackblitz](https://svelte-tiptap.stackblitz.io/) | [edit stackblitz](https://stackblitz.com/edit/svelte-tiptap)

## Installation

```bash
npm i svelte-tiptap

# or

yarn add svelte-tiptap
```

**Note**: This package just provides the bindings for angular. For configuring/customizing the editor, refer [tiptap's official documentation](https://www.tiptap.dev/).

For any issues with the editor. You may need to open the issue on [tiptap's repository](https://github.com/ueberdosis/tiptap/issues)

## Usage

A Simple editor.

```html
<script lang="typescript">
  import { onMount, onDestroy } from 'svelte';
  import {  Editor, EditorContent } from 'svelte-tiptap';

  let editor: Editor;

  onMount(() => {
    editor = new Editor({
      content: `Hello world!`,
      onTransaction: () => {
        editor = editor;
      },
    });
  });

  onDestroy(() => {
    editor.destroy();
  });
</script>

<EditorContent {editor} />
```

Refer https://www.tiptap.dev/api/commands/ for available commands

## Extensions

Refer: https://www.tiptap.dev/api/extensions

### Floating menu

This will make a contextual menu appear near a selection of text.

The markup and styling are totally up to you.

```html
<script lang="typescript">
  import { onMount, onDestroy } from 'svelte';
  import {  EditorContent, FloatingMenu } from 'svelte-tiptap';

  // ...create the editor instance on mount
</script>

<EditorContent {editor} />
<FloatingMenu {editor} />
```

Refer: https://www.tiptap.dev/api/extensions/floating-menu

### Bubble Menu

This will make a contextual menu appear near a selection of text. Use it to let users apply marks to their text selection.

The markup and styling are totally up to you.

```html
<script lang="typescript">
  import { onMount, onDestroy } from 'svelte';
  import {  EditorContent, BubbleMenu } from 'svelte-tiptap';

  // ...create the editor instance on mount
</script>

<EditorContent {editor} />
<BubbleMenu {editor} />
```

Refer: https://www.tiptap.dev/api/extensions/bubble-menu

## SvelteNodeViewRenderer

This enables rendering Angular Components as NodeViews.

### Create a Node Extension

```ts
import { Injector } from '@angular/core';
import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';

import CounterComponent from './Counter.svelte';

export const SvelteCounterExtension = Node.create({
  name: 'svelteCounterComponent',
  group: 'block',
  atom: true,
  draggable: true, // Optional: to make the node draggable
  inline: false,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'svelte-counter-component' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['svelte-counter-component', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return SvelteNodeViewRenderer(CounterComponent);
  },
});
```

### Create a Component

```html
<script lang="ts">
  import type { NodeViewProps } from '@tiptap/core';
  import type { Node as ProseMirrorNode } from 'prosemirror-model';
  import cx from 'classnames';

  import { NodeViewWrapper } from '../lib';

  export let node: ProseMirrorNode;
  export let selected = false;
  export let updateAttributes: NodeViewProps['updateAttributes'];

  const handleClick = () => {
    updateAttributes({ count: node.attrs.count + 1 });
  };
</script>

<NodeViewWrapper class={cx('svelte-component', { selected })}>
  <span class="label">Svelte Component</span>

  <div class="content">
    <button on:click={handleClick} type="button">
      This button has been clicked {node.attrs.count} times.
    </button>
  </div>
</NodeViewWrapper>
```

### Use the extension

```html
<script lang="typescript">
  import { onMount, onDestroy } from 'svelte';
  import {  Editor, EditorContent } from 'svelte-tiptap';
  import StarterKit from '@tiptap/starter-kit';

  import { SvelteCounterExtension } from './SvelteExtension';

  let editor: Editor;

  onMount(() => {
    editor = new Editor({
      extensions: [StarterKit, SvelteCounterExtension],
      content: `
        <p>This is still the text editor you’re used to, but enriched with node views.</p>
        <svelte-counter-component count="0"></svelte-counter-component>
        <p>Did you see that? That’s a Svelte component. We are really living in the future.</p>
      `,
      onTransaction: () => {
        editor = editor;
      },
    });
  });

  onDestroy(() => {
    editor.destroy();
  });
</script>
```

### Access/Update Attributes

Refer https://www.tiptap.dev/guide/node-views/react/#all-available-props for the list of all available attributes. You can access them like

```html
<script lang="ts">
  import type { NodeViewProps } from '@tiptap/core';
  import type { Node as ProseMirrorNode } from 'prosemirror-model';

  export let node: ProseMirrorNode;
  export let updateAttributes: NodeViewProps['updateAttributes'];
  // ...define other props as needed.

  // update attributes
  const handleClick = () => {
    updateAttributes({ count: node.attrs.count + 1 });
  };
</script>
```

### Dragging

To make your node views draggable, set `draggable: true` in the extension and add `draggable` action to the DOM element inside the component that should function as the drag handle.

```html
<script lang="ts">
  import { NodeViewWrapper, draggable } from 'prosemirror-model';
</script>

<NodeViewWrapper action="{draggable}" />
<!-- OR -->
<div use:draggable></div>
```

### Adding a content editable

There is another action called `editable` which helps you adding editable content to your node view. Here is an example.

```html
<script lang="ts">
  import { NodeViewWrapper, editable } from '../lib';
</script>

<NodeViewWrapper class="svelte-component">
  <span class="label">Svelte Editable Component</span>

  <!-- Content is inserted here -->
  <p use:editable class="content editable" />
</NodeViewWrapper>
```

Refer: https://www.tiptap.dev/guide/node-views/react/#adding-a-content-editable

## Contributing

All types of contributions are welcome. See [CONTRIBUTING.md][./.github/contributing.md] to get started.
