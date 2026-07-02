const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,

  // Content scripts (plain <script> context, access to DOM + VFA_DOCS globals).
  // docs.js and docassist.js share globals at runtime because the manifest
  // loads them in the same page context.
  {
    files: ['src/docs.js', 'src/docassist.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        chrome: 'readonly',
        // Defined in docs.js, consumed by docassist.js.
        VFA_DOCS: 'writable',
        VFA_DOCS_SELECTOR: 'writable',
      },
    },
    rules: {
      // Don't flag the shared VFA_* globals as unused/redeclared across files.
      'no-unused-vars': ['warn', { varsIgnorePattern: '^VFA_' }],
      'no-redeclare': ['error', { builtinGlobals: false }],
    },
  },

  // Background service worker (no DOM; runs in a ServiceWorkerGlobalScope).
  {
    files: ['src/background.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      globals: {
        ...globals.serviceworker,
        chrome: 'readonly',
      },
    },
  },

  // Node tooling config (this file, etc.).
  {
    files: ['*.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
  },
];
