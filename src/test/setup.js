import { expect } from 'vitest'; // 👈 make sure this comes first
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'; // 👈 correct jest-dom setup for Vitest

afterEach(() => {
  cleanup();
});
