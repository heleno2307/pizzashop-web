import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Pagination } from './pagination'

const onPageChengeCallback = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    onPageChengeCallback.mockClear()
  })

  it('should display the right amount of pages and results', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChenge={onPageChengeCallback}
      />,
    )
    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
  })

  it('should be able to navigation to the next page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChenge={onPageChengeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    const user = userEvent.setup()

    await user.click(nextPageButton)

    expect(onPageChengeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigation to the first page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChenge={onPageChengeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Primeira página',
    })

    const user = userEvent.setup()

    await user.click(nextPageButton)

    expect(onPageChengeCallback).toHaveBeenCalledWith(0)
  })

  it('should be able to navigation to the previous page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChenge={onPageChengeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    const user = userEvent.setup()

    await user.click(nextPageButton)

    expect(onPageChengeCallback).toHaveBeenCalledWith(4)
  })

  it('should be able to navigation to the last page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChenge={onPageChengeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    const user = userEvent.setup()

    await user.click(nextPageButton)

    expect(onPageChengeCallback).toHaveBeenCalledWith(19)
  })
})
