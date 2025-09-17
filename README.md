# Refine-Mantine

# Login

- props
    - `useEmailField`: `boolean`
        - renders username input field with `type="email"` if 
    - `method`: `oauth` | `password` | `otp` | `mfa`
        - `oauth`: no credentials fields will be rendered but `providers` prop is mandatory 
        - `password`:
            - email/username and password fields will be rendered
            - can be combined with oauth providers prop
        - `otp`
            - only email/username field will be rendered
            - a one-time-password will be requested after hitting submit
            - can be combined with oauth providers prop
        - `mfa`
            - email/username and password fields will be rendered
            - a one-time-password will be requested after hitting submit
    - `providers`: `OAuthProviderMantine[]`
        - similar to `OAuthProvider` but with `buttonProps` for easier customization

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
