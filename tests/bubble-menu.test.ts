import { it, expect } from 'vitest';
import { render } from '@testing-library/svelte';

import { BubbleMenu } from '$lib';

it('should throw error if editor instance is not provided', () => {
  expect(() => {
    render(BubbleMenu);
  }).toThrow();
});
