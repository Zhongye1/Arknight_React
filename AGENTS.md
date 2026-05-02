# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-03
**Commit:** 71761dd
**Branch:** main

## OVERVIEW
Vite + React 18 + TypeScript + Tailwind CSS SPA starter with shadcn/ui, Arco Design, react-query, and react-router-dom v6 (hash-based routing).

## STRUCTURE
```
./
├── src/              # All application source
│   ├── app.tsx       # App shell (QueryClient, Router, Helmet)
│   ├── main.tsx      # DOM entry (createRoot)
│   ├── router.tsx    # Route definitions + layout wiring
│   ├── components/   # React components (1 dir per component)
│   ├── pages/        # Page components (default export)
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utilities, constants, env helpers
│   ├── styles/       # Less + Tailwind (CSS variables theming)
│   ├── types/        # TypeScript types (currently empty)
│   └── assets/       # Static assets, SVG icons
├── public/           # Static public assets
├── vite.config.ts    # Vite config (svgr, Arco plugin, Less, alias)
├── tailwind.config.js # Tailwind + shadcn/ui CSS variables
├── components.json   # shadcn/ui registry config
└── tsconfig.json     # Strict TS, path alias @/* and src/*
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Add a page | `src/pages/` + `src/router.tsx` | Create `pagename/index.tsx` with default export, add route object |
| Add a component | `src/components/component-name/index.tsx` | One dir per component |
| Add shadcn/ui component | `src/components/ui/` | Run `pnpm dlx shadcn-ui add <name>` |
| Add a custom hook | `src/hooks/` | Single-file pattern |
| Add utility/helper | `src/lib/` | `utils.ts` for general, `constants.ts` for constants |
| Theme/styling | `src/styles/globals.less` + `tailwind.config.js` | CSS variables at `:root` and `.dark` |
| Route definitions | `src/router.tsx` | `routerObjects` array, `RouteObject[]` |
| Layout per page | `src/components/layout/index.tsx` | `getDefaultLayout` / page-specific `getLayout` static |

## CONVENTIONS

### Formatting
- **Prettier**: no semicolons, single quotes, trailing commas, 120 print width, 2-space indent
- **ESLint**: `@typescript-eslint` recommended, unused imports warn, react-in-jsx-scope off
- **Stylelint**: kebab-case CSS class names (`selector-class-pattern: "^([a-z]+)(-[a-z0-9]+)*$"`)
- **EditorConfig**: 2-space, LF, UTF-8, trim trailing whitespace

### Code Organization
- Path aliases: `@/*` → `./src/*` and `src/*` → `./src/*`
- Import style: `import { cn } from 'src/lib/utils'` (not relative)
- Components: `export function` or `export const` for layout helpers, `export default` for pages
- shadcn/ui components: re-exported from `src/components/ui/`
- Arco Design: used alongside shadcn/ui (e.g., `@arco-design/web-react` Card, Button, Tag)

### Commits
- Conventional commits enforced via commitlint (`feat:`, `fix:`, etc.)
- Husky + lint-staged: auto-lint staged files on commit (eslint on ts/tsx, stylelint on less/css)

## COMMANDS
```bash
pnpm dev              # Start dev server (port 5000)
pnpm build            # Typecheck + vite build (outputs dist/)
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint src + stylelint src
pnpm lint:fix         # eslint --fix + stylelint --fix
```

## NOTES
- i18n (transmart/react-i18next) was removed; `transmart.config.ts` is empty stub
- Hash-based routing (`createHashRouter`), no server-side routing needed
- CSS variables theming in `globals.less: :root` for light, `.dark` for dark mode
- Package manager: `pnpm` (pnpm-lock.yaml present)
