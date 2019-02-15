const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
        })
})

/*blogsRouter.post('/', (request, response) => {
    const body = request.body
    console.log(body)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
})*/

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
    })
    
    try { 
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())
      } catch(exception) {
        next(exception)
      }
  })

module.exports = blogsRouter