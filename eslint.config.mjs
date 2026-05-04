import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".aiox-core/**",
      ".antigravity/**",
      ".claude/**",
      ".codex/**",
      ".cursor/**",
      ".gemini/**",
      ".github/**",
      "node_modules/**",
    ],
  },
  ...nextVitals,
  ...nextTypescript,
];

export default eslintConfig;
