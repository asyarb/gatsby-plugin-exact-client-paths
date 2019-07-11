import { onCreatePage } from '../gatsby-node'

describe('onCreatePage', () => {
  const page = {
    path: '/preview',
  }
  const actions = {
    createPage: jest.fn(),
  }

  const gatsbyObj = { page, actions }

  afterEach(() => {
    actions.createPage.mockClear()
  })

  it('throws error when client paths is undefined', () => {
    expect(() => onCreatePage(gatsbyObj, {})).toThrow(/array of exact paths./i)
    expect(() => onCreatePage(gatsbyObj, { clientPaths: undefined })).toThrow(
      /array of exact paths./i,
    )
  })

  it('throws error when client paths contains invalid types', () => {
    const clientPaths = [1, 2, '/preview']

    expect(() => onCreatePage(gatsbyObj, { clientPaths })).toThrow(
      /must be of type string/i,
    )
  })

  it('does not create a page when page is in clientPaths', () => {
    const clientPaths = ['/preview']

    onCreatePage(gatsbyObj, { clientPaths })

    expect(actions.createPage).not.toHaveBeenCalled()
  })

  it('creates a page when page is not in clientPaths', () => {
    const clientPaths = ['/preview']

    const page = {
      path: '/test',
    }

    const gatsbyObj = {
      page,
      actions,
    }

    onCreatePage(gatsbyObj, { clientPaths })

    expect(actions.createPage).toHaveBeenCalledTimes(1)
    expect(actions.createPage).toHaveBeenCalledWith({
      path: '/test',
    })
  })

  it('does not create a page when deep paths match', () => {
    const clientPaths = ['/preview/testing/world']

    const page = {
      path: '/preview/testing/world',
    }

    const gatsbyObj = {
      page,
      actions,
    }

    onCreatePage(gatsbyObj, { clientPaths })

    expect(actions.createPage).not.toHaveBeenCalled()
  })

  it('handles multiple specified client paths', () => {
    const clientPaths = ['/preview/testing/world', '/foo/bar']

    const page = {
      path: '/foo/bar',
    }

    const gatsbyObj = {
      page,
      actions,
    }

    onCreatePage(gatsbyObj, { clientPaths })

    expect(actions.createPage).not.toHaveBeenCalled()
  })
})
