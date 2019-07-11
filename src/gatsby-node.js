const appendTrailingSlash = path => (path.match(/\/$/) ? path : `${path}/`)

const validatePathEntry = path => {
  if (typeof path !== 'string')
    throw Error(
      `Plugin "gatsby-plugin-exact-client-paths" found invalid path: ${path}. Must be of type String.`,
    )
}

const validateClientPaths = clientPaths => {
  if (!Array.isArray(clientPaths))
    throw new Error(
      `Plugin "gatsby-plugin-exact-client-paths" found invalid clientPaths: Please provide array of exact paths.`,
    )
  clientPaths.forEach(validatePathEntry)
}

export const onCreatePage = ({ page, actions }, { clientPaths }) => {
  const { createPage } = actions
  const trailedSlashPath = appendTrailingSlash(page.path)
  let isMatchingPath = false

  validateClientPaths(clientPaths)

  if (page.path.match(/dev-404-page/)) {
    return
  }

  const regexClientPaths = clientPaths.map(
    path => new RegExp(`^${appendTrailingSlash(path)}`),
  )

  regexClientPaths.forEach(regex => {
    if (regex.test(trailedSlashPath)) isMatchingPath = true
  })

  if (isMatchingPath) {
    return
  }

  createPage(page)
}
