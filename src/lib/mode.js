// `?mock` in dev swaps Supabase for canned data (see mock.js); always false in production builds.
export const MOCK = import.meta.env.DEV && new URLSearchParams(window.location.search).has('mock');
export const STORAGE_PREFIX = MOCK ? 'nagadle:mock' : 'nagadle:v1';
