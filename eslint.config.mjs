import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "dist/**",
    ".vercel/**",
    "build/**",
    "next-env.d.ts",
    // App Streamlit (Python) — não deve ser lintado; o .venv tem JS empacotado
    // gigante que estoura a memória do ESLint.
    "demos-logistica/**",
  ]),
]);

export default eslintConfig;
