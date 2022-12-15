import { afterEach } from 'vitest';
import { cleanup, configure } from '@testing-library/svelte';

afterEach(cleanup);

configure({
  testIdAttribute: 'id',
});
