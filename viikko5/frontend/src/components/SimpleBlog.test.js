import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import Blog from './Blog'
/*import { prettyDOM } from 'dom-testing-library'*/

afterEach(cleanup)

test('renders title, author and likes', () => {

  const blog = {
    title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    author: 'Test Author',
    url: 'url',
    likes: 1
  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent('Komponenttitestaus tapahtuu react-testing-library:llä')

  expect(component.container).toHaveTextContent('Test Author')

  expect(component.container).toHaveTextContent('url')

  /*const li = component.container.querySelector('p')

  console.log(prettyDOM(li))*/

})