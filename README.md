# frontend-boilerplate-v2

Frontend boilerplate with batteries included for fast development.

## Features

- Updated frequently
- Auto reloads after changes
- Optimizes JS, CSS & Imgs
- Transpiles modern JS
- Auto prefixes CSS
- Linters with recommended defaults
- Validates commit messages

## Tools

- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [SASS](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)
- [Autoprefixer](https://autoprefixer.github.io/)
- [Cssnano](https://cssnano.co/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [StyleLint](https://stylelint.io/)
- [BrowserSync](https://browsersync.io/)
- [Normalize.css](https://necolas.github.io/normalize.css/)
- [Browserlist](https://browserl.ist/)

## Requirements

- Docker
- Docker-Compose

## Setup

```bash
$ git clone git@github.com:verzola/frontend-boilerplate.git
$ cd frontend-boilerplate
$ docker-compose up -d
```

## URLs

- BrowserSync: http://localhost:8080
- BrowserSync UI: http://localhost:3001
- Webpack Dev Server: http://localhost:3000

## SASS

The SASS structure is based on [Sass Boilerplate](https://github.com/HugoGiraudel/sass-boilerplate) with some tweaks.

## Commands

Start webpack development server

```bash
$ npm run dev
```

Build project for production

```bash
$ npm run build
```

Format files with prettier

```bash
$ npm run format
```

Run JS & CSS linter

```bash
$ npm run lint
```

Run JS linter only

```bash
$ npm run lint:js
```

Run CSS linter only

```bash
$ npm run lint:css
```

Same as dev

```bash
$ npm start
```

Profile application, this will generate `stats.json` file that can be uploaded to some tools like [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/)

```bash
$ npm run profile
```

Enter in container shell to run commands inside container

```bash
$ npm run shell
```

Stops and removes containers

```bash
$ npm run prune
```

Prunes and recreates containers

```bash
$ npm run reset
```

## Configuration

You can rename the `.env.example` file to `.env` and configure
some things without messing with webpack configuration.
