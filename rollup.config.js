import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return id => pattern.test(id)
}

const externalPkgs = makeExternalPredicate([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
])

export default [
  {
    input: 'src/gatsby-node.js',
    output: { file: 'dist/gatsby-node.js', format: 'cjs' },
    external: externalPkgs,
    plugins: [babel()],
  },
  {
    input: 'src/gatsby-browser.js',
    output: { file: 'dist/gatsby-browser.js', format: 'cjs', sourcemap: true },
    external: externalPkgs,
    plugins: [babel()],
  },
]
