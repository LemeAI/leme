// Flat config: exigida pelo eslint-config-next 16, que só publica esse
// formato e pede ESLint >= 9. Substitui o .eslintrc.json antigo, e o
// `next lint` (removido no Next 16) deu lugar ao CLI do próprio ESLint.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      // Backend Python: tem o próprio lint (ruff), ver backend/pyproject.toml
      "backend/**",
    ],
  },
  ...nextCoreWebVitals,
];

export default config;
