import { afterEach, vi } from 'vitest';
import { cleanup, configure } from '@testing-library/svelte';

afterEach(cleanup);

configure({
  testIdAttribute: 'id',
});

// @fixme
// see https://github.com/testing-library/svelte-testing-library/issues/222
vi.mock('svelte', async () => {
  const actual = (await vi.importActual('svelte')) as object;
  return {
    ...actual,
    onMount: (await import('svelte/internal')).onMount,
  };
});
