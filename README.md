## React 仿明日方舟官网网页

[![Deploy to Cloudflare Pages](https://github.com/Quilljou/react-arknights-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/Quilljou/react-arknights-website/actions/workflows/deploy.yml)
React 实现的高仿明日方舟官网页

## Run

```sh
pnpm i
pnpm dev
```

## Tech Stack

- [vite](https://vitejs.dev/)
- [react](https://reactjs.org/)
- [shadcn ui](https://ui.shadcn.com/)
- [react-i18next](https://github.com/i18next/react-i18next)
- [react-lucide](https://lucide.dev/)
- [transmart](https://github.com/Quilljou/transmart)
- [react-query](https://tanstack.com/query/latest/)
- [tailwindcss](https://tailwindcss.com/)
- [less](http://lesscss.org/)
- [postcss](https://postcss.org/)
- [react-router-dom](https://reactrouter.com/en/6.16.0)
- [eslint](https://eslint.org/)/[stylelint](https://stylelint.io/)
- [prettier](https://prettier.io/)
- [svgr](https://react-svgr.com/)
- [editorconfig](https://editorconfig.org/)
- [husky](https://typicode.github.io/husky/#/)/[lint-staged](https://github.com/okonet/lint-staged)
- [commitlint](https://commitlint.js.org/)

## Project Structure

```sh
src
├── app.tsx     # App entry
├── assets      # Assets for images, favicon etc
├── components  # React components
├── hooks       # React hooks
├── i18n        # i18n files
├── lib         # Utils、tools、services
├── main.tsx    # File entry
├── pages       # One .tsx per page
├── router.tsx  # Routers
├── styles      # Less files
├── types       # Typescript types
└── vite-env.d.ts
```

## Deploy

[Cloudflare Pages](https://pages.cloudflare.com/) is my first option to deploy React App，follow [this documentation](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/#deploying-with-cloudflare-pages) to deploy your site. Don't forget build directory should choose `dist`

[Vercel](https://pages.cloudflare.com/) is a good option too，Go to [Vercel](https://vercel.com/new) and link to your Git Repo

