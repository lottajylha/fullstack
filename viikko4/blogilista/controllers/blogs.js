const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    try{
      const blog = await Blog.findById(request.params.id)
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    } catch(exception) {
      next(exception)
    }
  })

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)

    const blog = new Blog({
        id: body.id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user.id
    })
        
    try {
      if (body.title === undefined || body.url === undefined) {
          exception
      }
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())
    } catch(exception) {
      response.status(400).end()
    }
    
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
})

module.exports = blogsRouter