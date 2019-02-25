const blogs =[
  {
    title: 'Title 1',
    author: 'Author 1',
    url: 'url 1',
    likes: 1,
    user: {
      username: 'username1',
      name: 'User 1',
      id: '123'
    },
    id: '567'
  },
  {
    title: 'Title 2',
    author: 'Author 2',
    url: 'url 2',
    likes: 2,
    user: {
      username: 'username2',
      name: 'User 2',
      id: '891'
    },
    id: '234'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }