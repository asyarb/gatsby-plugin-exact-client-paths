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
        clientPaths: ['/preview', '/clientOnly'],
      },
    },
  ],
}
```

### How is this different from `gatsby-plugin-create-client-paths`?

This plugin attempts to address the inability to client-side render singular
routes in Gatsby, most particularly with top level routes such as `/preview`.

With `gatsby-plugin-create-client-paths`, you must create at least 1 route that
is still processed via Gatsby's SSR pipeline that handles the client-side
routing for nested paths. This can be problematic when top level client-side
routes like `https://hostname.com/preview` are needed, and we don't want to
imperatively define a `<Router>` component directly in our homepage index
component.

This plugin establishes a `<Router>` behind the scenes of your index page that
will normally display your SSR'd content _or_ a client rendered page if the
current path matches a path specified in the `clientPaths` plugin options.

## Current Limitations

- Client rendered paths & component trees that call Gatsby's `useStaticQuery`
  hook will crash.

## Run tests

```sh
yarn test
```

## 📝 License

This project is
[MIT](https://github.com/asyarb/gatsby-plugin-exact-client-paths/blob/master/LICENSE)
licensed.
