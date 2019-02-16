const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
        })
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

    const blog = new Blog({
        id: body.id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
    })
        
    try {
        if (body.title === undefined || body.url === undefined) {
            exception
        }
        const savedBlog = await blog.save()
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