# GC Svelte

Sito web multilingue (🇮🇹 italiano / 🇪🇸 spagnolo) dedicato a slot machine, roulette e casinò online.  
Costruito con **SvelteKit** (SSR), **TypeScript**, **Paraglide** per l'internazionalizzazione e distribuito su **Vercel**.

Funzionalità principali:

- Catalogo slot e roulette con pagine di dettaglio per slug
- Sezione casinò con comparatore e griglia
- Sistema di preferiti, valutazioni e sessioni di gioco
- Sitemap XML generata dinamicamente per ogni locale
- Ricerca full-text tramite Web Worker

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.13.0 create --template minimal --types ts --add prettier eslint --install yarn gc-svelte
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
