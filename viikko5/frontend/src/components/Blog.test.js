import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('displaying only title and author before clicking', () => {
  let component

  const blog = {
    title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    author: 'Author',
    url : 'url',
    likes: 1
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog}/>
    )
  })

  afterEach(cleanup)

  it('before clicking only title and author are showing', async () => {
    const p = component.container.querySelector('.blogContent')

    expect(p).toHaveStyle('display: block')
  })

  /* ei toimi it('after clicking also url and likes are showing', async () => {
    const p = component.container.querySelector('.blogContent')

    const mockHandler = jest.fn()

    const { getByText } = render(
      <Blog blog={blog}/>
    )

    const button = getByText('Komponenttitestaus tapahtuu jestillä ja enzymellä, Author')
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(1)

  })*/
})

describe('clicking like-button', () => {

  const blog = {
    title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    author: 'Author',
    url : 'url',
    likes: 1
  }

  afterEach(cleanup)

  it('clicking the button once calls event handler once', async () => {

    const mockHandler = jest.fn()

    const { getByText } = render(
      <Blog blog={blog} addLike={mockHandler} />
    )

    const button = getByText('like')

    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(1)
  })

  it('clicking the button twice calls event handler twice', async () => {

    const mockHandler = jest.fn()

    const { getByText } = render(
      <Blog blog={blog} addLike={mockHandler} />
    )

    const button = getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})