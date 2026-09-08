import { beforeEach, describe, expect, it, vi } from 'vitest'

const { createRootMock, renderMock } = vi.hoisted(() => ({
  createRootMock: vi.fn(),
  renderMock: vi.fn(),
}))

vi.mock('react-dom/client', () => ({
  createRoot: createRootMock.mockReturnValue({ render: renderMock }),
}))

describe('main entry point', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>'
    vi.resetModules()
  })

  it('mounts the app into the root element', async () => {
    await import('./main')

    expect(createRootMock).toHaveBeenCalledWith(document.getElementById('root'))
    expect(renderMock).toHaveBeenCalledOnce()
  })
})
