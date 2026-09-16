import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**', 'apps/sonarqube/docker/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      // Evita variables sin usar salvo las que empiezan por _
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Obliga a tipar explícitamente en vez de usar any
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  // Prettier va el último: desactiva las reglas de formato que chocarían con él
  prettier,
);
