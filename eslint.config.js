const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,

  // Extension source: vanilla-DOM content scripts and popup, loaded as plain
  // <script>s (no modules). docs.js and docassist.js share globals at runtime
  // because the manifest concatenates them into the same page context.
  {
    files: ['src/**/*.js'],
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

  // Node tooling config (this file, etc.).
  {
    files: ['*.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
  },
];
