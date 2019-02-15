const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.remove({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[4])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[5])
  await blogObject.save()
})

describe('get all', () => {
  test('all blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.type).toEqual("application/json")
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('contais id', async () => {
    const response = await api.get('/api/blogs')
    for (let i = 0; i < initialBlogs.length; i++) {
      expect(initialBlogs[i]._id).toBeDefined();
    }
  })
})

describe('post', () => {
  test('blogien määrä kasvaa yhdellä', async () => {
    const newBlog = {
      _id: "testId1",
      title: "Test Title",
      author: "Test Author",
      url: "tesdtUrl",
      likes: 3,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body.length).toBe(initialBlogs.length + 1)
    
  })

  test('blogs contains new blog', async () => {
    const newBlog = {
      _id: "testId2",
      title: "Test 2",
      author: "Test Author",
      url: "tesdtUrl",
      likes: 3,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain('Test 2')
  })

  test('new blog without likes', async () => {
    const newBlogWithoutLikes = {
      _id: "id3",
      title: "Title 3",
      author: "Author 3",
      url: "tesdtUrl3",
      likes: undefined,
      __v: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    
    console.log('likes', newBlogWithoutLikes.likes)
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(newBlogWithoutLikes.likes).toBe(0)
  })
})



afterAll(() => {
  mongoose.connection.close()
})