import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
})

export default [
  {
    ignores: ['node_modules/*', '.next/*', 'dist/*'],
  },
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      'import/order': 'off',
      'import/first': 'off',
      'import/newline-after-import': 'off',
      'import/no-duplicates': 'off',
      'import/no-unresolved': 'off',
      'import/no-empty-line-between-groups': 'off',
      'import/no-empty-lines': 'off',
      'import/no-empty-line-after-import': 'off',
      'import/no-empty-line-before-import': 'off',
    },
  },
]
