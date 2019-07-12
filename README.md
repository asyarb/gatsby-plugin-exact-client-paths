<h1 align="center">gatsby-plugin-exact-client-paths</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/asyarb/gatsby-plugin-exact-client-paths/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

- [Install](#Install)
- [Usage](#Usage)
  - [How is this different from `gatsby-plugin-create-client-paths`?](#How-is-this-different-from-gatsby-plugin-create-client-paths)
- [Current Limitations](#Current-Limitations)
- [Run tests](#Run-tests)
- [📝 License](#%F0%9F%93%9D-License)

> Gatsby plugin for client rendering exact page routes.

## Install

```sh
yarn add gatsby-plugin-exact-client-paths
```

## Usage

```js
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-exact-client-paths',
      options: {
        clientPaths: ['/preview'],
      },
    },
  ],
}
```

### How is this different from `gatsby-plugin-create-client-paths`?

This plugin attempts to address the inability to client-side render singular
routes in Gatsby, most particularly with top level routes such as `/preview`.

With `gatsby-plugin-create-client-paths`, you must create at least 1 route that
is _still_ run through Gatsby's SSR pipeline that will handle the
client-side-routing. This can be problematic when you want top level client
routes like `https://hostname.com/preview` for client-side previews that are
heavily reliant on browser specific accessors like `window`.

This plugin establishes a `<Router>` behind the scenes of your index page that
will render your SSR'd index page or a client rendered page if the current path
matches what you specify in the `clientPaths` plugin options.

## Current Limitations

- Client rendered components that call the `useStaticQuery` hook will cause your
  app to crash.

## Run tests

```sh
yarn test
```

## 📝 License

This project is
[MIT](https://github.com/asyarb/gatsby-plugin-exact-client-paths/blob/master/LICENSE)
licensed.
