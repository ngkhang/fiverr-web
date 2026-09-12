# Fiverr Web with Next.js

- [Fiverr Web with Next.js](#fiverr-web-with-nextjs)
  - [Tech stack](#tech-stack)
  - [How to run?](#how-to-run)
    - [Requirements](#requirements)
    - [Getting Started](#getting-started)
    - [Scripts](#scripts)
  - [About Me](#about-me)

## Tech stack

- Framework: Next.js 16 App Router
- Language: TypeScript
- Styling: Tailwind CSS v4
- Package manager: pnpm
- Linting/Formatting: ESLint, Prettier, EditorConfig
- Git hooks: Husky, lint-staged, Commitlint

## How to run?

### Requirements

```json
{
  "engines": {
    "node": ">=20.9.0",
    "pnpm": ">=9.0.0"
  }
}
```

### Getting Started

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Build production
pnpm build

# Run the production build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Script              | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `pnpm lint`         | Linting with ESLint                                  |
| `pnpm lint:fix`     | Fix linting (if ESLint supported)                    |
| `pnpm format:check` | Validation style code with Prettier                  |
| `pnpm format`       | Format style code with Prettier                      |
| `pnpm typecheck`    | Validate type                                        |
| `pnpm check:all`    | Linting, check formatting, and type-safe             |
| `pnpm fix:all`      | Fix linting (if ESLint supported), format style code |

## About Me

- Khang Nguyen [GitHub](https://github.com/ngkhang)
