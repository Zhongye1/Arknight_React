# src/ — Application Source

## OVERVIEW
All React application code: entry points, routing, components, pages, hooks, utilities, styles.

## STRUCTURE
```
src/
├── main.tsx           # DOM mount (createRoot → <App />)
├── app.tsx            # Providers shell (Helmet, QueryClient, Router)
├── router.tsx         # Route definitions + layout wiring via routerObjects
├── vite-env.d.ts      # Vite client type references
├── components/
│   ├── ui/            # shadcn/ui primitives (button, popover)
│   ├── layout/        # Layout helpers (getDefaultLayout, getNoneLayout)
│   ├── header/        # Site header (logo + GitHub link)
│   ├── hero/          # Landing hero section
│   └── error-page/     # Route error boundary
├── pages/
│   ├── home/          # Home page (Arco Design showcase)
│   └── about/         # About page (boilerplate)
├── hooks/
│   └── use-localstorage-state.ts  # localStorage-backed useState
├── lib/
│   ├── utils.ts       # cn() helper (clsx + tailwind-merge)
│   ├── constants.ts   # App constants
│   └── env.ts         # Vite env helpers (getEnv, isLocal)
├── styles/
│   └── globals.less   # Tailwind directives + CSS variable theming
├── types/             # Shared TypeScript types (empty)
└── assets/
    └── icons/         # SVG icon files
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Routing | `router.tsx` | `routerObjects: RouteObject[]` — add entries here |
| Page layouts | `components/layout/index.tsx` | `getDefaultLayout` wraps pages with Header |
| Providers | `app.tsx` | QueryClient, Helmet, Router setup |
| App-wide state | `app.tsx` | QueryClient (react-query) for server state |
| Local state | `hooks/use-localstorage-state.ts` | Persistent state via localStorage |
| Environment | `lib/env.ts` | `import.meta.env.MODE`, `import.meta.env.DEV` |
| CSS theming | `styles/globals.less` | `:root` / `.dark` CSS custom properties |

## CONVENTIONS
- Pages use **default export** (e.g., `export default function Home()`)
- Components use **named export** for functions, or `export const` for helpers
- Each component/page lives in its own directory with `index.tsx`
- Layout helpers return `React.ReactElement` wrappers
- Route-level layout: `Component.getLayout` static property or falls back to `getDefaultLayout`
- Duplicate stack: Arco Design for complex UI, shadcn/ui for primitives — co-exist in same pages

## ANTI-PATTERNS
- `@ts-ignore` used in `router.tsx:17` for Component type — fix with proper typing
- About page (`pages/about/index.tsx:5`) still references Next.js — artfact from template
- `pages/about/index.tsx` exports `function Home()` conflicting with home page name
