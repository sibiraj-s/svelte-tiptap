# svelte-tiptap

> Svelte components for tiptap v2

[![Tests](https://github.com/sibiraj-s/svelte-tiptap/actions/workflows/tests.yml/badge.svg)](https://github.com/sibiraj-s/svelte-tiptap/actions/workflows/tests.yml)
[![NPM Version](https://badgen.net/npm/v/svelte-tiptap/1)](https://www.npmjs.com/package/svelte-tiptap)
[![Total Downloads](https://badgen.net/npm/dt/svelte-tiptap)](https://www.npmjs.com/package/svelte-tiptap)
[![Monthly Downloads](https://badgen.net/npm/dm/svelte-tiptap)](https://www.npmjs.com/package/svelte-tiptap)
[![License](https://badgen.net/npm/license/svelte-tiptap)](https://github.com/sibiraj-s/svelte-tiptap/blob/master/LICENSE)

> [!NOTE]
> This is the documentation for **svelte-tiptap v1**, which is compatible with Svelte 4.
> If you're using Svelte 5, check out the latest version [here](https://github.com/sibiraj-s/svelte-tiptap/?tab=readme-ov-file#svelte-tiptap).

## Installation

```bash
npm i svelte-tiptap@1
# or
yarn add svelte-tiptap@1
```

> [!NOTE]
> This package just provides components for svelte. For configuring/customizing the editor, refer [tiptap's official documentation](https://www.tiptap.dev/).

For any issues with the editor. You may need to open the issue on [tiptap's repository](https://github.com/ueberdosis/tiptap/issues)

You can find some [examples for the editor here](./src/routes/)

## Usage

A Simple editor.

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import type { Readable } from 'svelte/store';
  import { createEditor, Editor, EditorContent } from 'svelte-tiptap';
  import StarterKit from '@tiptap/starter-kit';

  let editor = $state() as Readable<Editor>;

  onMount(() => {
    editor = createEditor({
      extensions: [StarterKit],
      content: `Hello world!`,
    });
  });
</script>

<EditorContent editor={$editor} />
```

Refer https://www.tiptap.dev/api/commands/ for available commands

## Extensions

Refer: https://www.tiptap.dev/api/extensions

### Floating menu

This will make a contextual menu appear near a selection of text.

The markup and styling are totally up to you.

```svelte
<script lang="ts">
  import { EditorContent, FloatingMenu } from 'svelte-tiptap';

  // ...create the editor instance on mount
</script>

<EditorContent editor={$editor} />
<FloatingMenu editor={$editor} />
```

Refer: https://www.tiptap.dev/api/extensions/floating-menu

### Bubble Menu

This will make a contextual menu appear near a selection of text. Use it to let users apply marks to their text selection.

The markup and styling are totally up to you.

```svelte
<script lang="ts">
  import { EditorContent, BubbleMenu } from 'svelte-tiptap';

  // ...create the editor instance on mount
</script>

<EditorContent editor={$editor} />
<BubbleMenu editor={$editor} />
```

Refer: https://www.tiptap.dev/api/extensions/bubble-menu

## SvelteNodeViewRenderer

SvelteNodeViewRenderer enables rendering Svelte Components as NodeViews. The following is an example for creating a counter component

### Create a Node Extension

```ts
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

```svelte
<script lang="ts">
  import type { NodeViewProps } from '@tiptap/core';
  import cx from 'clsx';
  import { NodeViewWrapper } from 'svelte-tiptap';

  let { node, updateAttributes }: NodeViewProps = $props();

  const handleClick = () => {
    updateAttributes({ count: node.attrs.count + 1 });
  };
</script>

<NodeViewWrapper>
  <span>Svelte Component</span>

  <div>
    <button onclick={handleClick} type="button">
      This button has been clicked {node.attrs.count} times.
    </button>
  </div>
</NodeViewWrapper>
```

### Use the extension

```ts
import { onMount, onDestroy } from 'svelte';
import type { Readable } from 'svelte/store';
import { Editor, EditorContent } from 'svelte-tiptap';
import StarterKit from '@tiptap/starter-kit';

import { SvelteCounterExtension } from './SvelteExtension';

let editor = $state() as Readable<Editor>;

onMount(() => {
  editor = createEditor({
    extensions: [StarterKit, SvelteCounterExtension],
    content: `
        <p>This is still the text editor you’re used to, but enriched with node views.</p>
        <svelte-counter-component count="0"></svelte-counter-component>
        <p>Did you see that? That’s a Svelte component. We are really living in the future.</p>
      `,
  });
});
```

### Access/Update Attributes

Refer https://www.tiptap.dev/guide/node-views/react/#all-available-props for the list of all available attributes. You can access them like

```ts
import type { NodeViewProps } from '@tiptap/core';

let { node, updateAttributes }: NodeViewProps = $props();

// update attributes
const handleClick = () => {
  updateAttributes({ count: node.attrs.count + 1 });
};
```

### Dragging

To make your node views draggable, set `draggable: true` in the extension and add `data-drag-handle` to the DOM element that should function as the drag handle.

### Adding a content editable

There is another action called `editable` which helps you adding editable content to your node view. Here is an example.

```svelte
<script lang="ts">
  import { NodeViewWrapper, NodeViewContent } from 'svelte-tiptap';
</script>

<NodeViewWrapper class="svelte-component">
  <span class="label" contenteditable="false">Svelte Editable Component</span>

  <!-- Content is inserted here -->
  <NodeViewContent />
</NodeViewWrapper>
```

The NodeViewWrapper and NodeViewContent components render a `<div>` HTML tag (`<span>` for inline nodes),
but you can change that. For example `<NodeViewContent as="p">` should render a paragraph.
One limitation though: That tag must not change during runtime.

Refer: https://www.tiptap.dev/guide/node-views/react/#adding-a-content-editable

## Contributing

All types of contributions are welcome. See [CONTRIBUTING.md](./.github/CONTRIBUTING.md) to get started.
