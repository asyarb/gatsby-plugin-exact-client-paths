<h1 align="center">gatsby-plugin-exact-client-paths</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/asyarb/gatsby-plugin-exact-client-paths/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

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
        root: __dirname,
        clientPaths: ['/preview'],
      },
    },
  ],
}
```

## Limitations

- Client rendered components that use `useStaticQuery` will cause your app to
  crash.

## Run tests

```sh
yarn test
```

## 📝 License

This project is
[MIT](https://github.com/asyarb/gatsby-plugin-exact-client-paths/blob/master/LICENSE)
licensed.
