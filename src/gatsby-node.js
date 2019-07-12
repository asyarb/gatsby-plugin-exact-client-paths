const appendTrailingSlash = path => (path.match(/\/$/) ? path : `${path}/`)

const validatePathEntry = path => {
  if (typeof path !== 'string')
    throw Error(`found invalid path: ${path}. Must be of type String.`)
}

const validateClientPaths = clientPaths => {
  if (!Array.isArray(clientPaths))
    throw new Error(
      `found invalid clientPaths: Please provide array of exact paths.`,
    )
  clientPaths.forEach(validatePathEntry)
}

export const onCreatePage = async (
  { page, actions, reporter },
  { clientPaths },
) => {
  const { createPage } = actions
  const trailedSlashPath = appendTrailingSlash(page.path)
  let isMatchingPath = false

  try {
    validateClientPaths(clientPaths)
  } catch (error) {
    reporter.panic(`gatsby-plugin-exact-client-paths - ${error}`, error)
  }

  if (page.matchPath || page.path.match(/dev-404-page/)) {
    return
  }

  const regexClientPaths = clientPaths.map(
    path => new RegExp(`^${appendTrailingSlash(path)}`),
  )

  regexClientPaths.forEach(regex => {
    if (regex.test(trailedSlashPath)) isMatchingPath = true
  })

  if (isMatchingPath) {
    reporter.info(
      `gatsby-plugin-exact-client-paths - Client rendering path: ${trailedSlashPath}`,
    )
    page.matchPath = '/'

    createPage(page)
  }
}
