import { onCreatePage } from '../gatsby-node'

describe('onCreatePage', () => {
  const page = {
    path: '/preview',
  }
  const actions = {
    createPage: jest.fn(),
  }
  const reporter = {
    panic: jest.fn().mockImplementation((_, error) => throw new Error(error)),
    info: jest.fn(),
  }

  const gatsbyContext = { page, actions, reporter }

  afterEach(() => {
    actions.createPage.mockClear()
  })

  it('throws error when client paths is undefined', async () => {
    await expect(onCreatePage(gatsbyContext, {})).rejects.toThrow(
      /array of exact paths./i,
    )
    await expect(
      onCreatePage(gatsbyContext, { clientPaths: undefined }),
    ).rejects.toThrow(/array of exact paths./i)
  })

  it('throws error when client paths contains invalid types', async () => {
    const clientPaths = [1, 2, '/preview']

    await expect(onCreatePage(gatsbyContext, { clientPaths })).rejects.toThrow(
      /must be of type string/i,
    )
  })

  it('does not create a page when page is in clientPaths', () => {
    const clientPaths = ['/preview']

    onCreatePage(gatsbyContext, { clientPaths })

    expect(actions.createPage).toHaveBeenCalled()
  })

  it('creates a page when page is not in clientPaths', () => {
    const clientPaths = ['/preview']

    const page = {
      path: '/test',
    }

    const gatsbyContext = {
      page,
      actions,
    }

    onCreatePage(gatsbyContext, { clientPaths })

    expect(actions.createPage).not.toHaveBeenCalled()
  })

  it('does not create a page when deep paths match', () => {
    const clientPaths = ['/preview/testing/world']

    const page = {
      path: '/preview/testing/world',
    }

    const gatsbyContext = {
      page,
      actions,
      reporter,
    }

    onCreatePage(gatsbyContext, { clientPaths })

    expect(actions.createPage).toHaveBeenCalled()
  })

  it('handles multiple specified client paths', () => {
    const clientPaths = ['/preview/testing/world', '/foo/bar']

    const page = {
      path: '/foo/bar',
    }

    const gatsbyContext = {
      page,
      actions,
      reporter,
    }

    onCreatePage(gatsbyContext, { clientPaths })

    expect(actions.createPage).toHaveBeenCalled()
  })
})
