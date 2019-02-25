import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, setErrorMessage, compareBlogs }) => {
  const [blogVisible, setBlogVisible] = useState(true)
  /*const [deleteVisible, setDeleteVisible] = useState(true)
  const hideDelete = { display : deleteVisible ? 'none' : ''}*/
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  let loggedUser = window.localStorage.getItem('loggedBlogappUser')
  let loggedUserParse = JSON.parse(loggedUser)

  const addLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    try {
      await blogService.update(changedBlog, id)
      setBlogs(blogs.map(b => b.id === id ? b : changedBlog))
      setBlogs(blogs.sort(compareBlogs))
    } catch (exception) {
      setTimeout(() => {
        setErrorMessage('increasing likes failed')
      }, 5000)
      console.log('error: ', exception)
    }
  }

  const removeBlog = async (id) => {
    let message = ''
    try {
      const blog = blogs.find(b => b.id === id)
      if (loggedUser) {
        if (loggedUserParse.id === blog.user.id) {
          blogService.setToken(loggedUserParse.token)
        } else {
          message = `User ${loggedUserParse.username} can't delete this blog.`
          console.log('blogin lisännyt: ', blog.user.username)
          console.log('kirjautuneena: ', loggedUserParse.username)
        }
        const windowConfirm = window.confirm(
          'Do you want to delete?'
        )
        if (windowConfirm){
          await blogService.remove(id)
          setBlogs(blogs.filter(b => b.id !== id))
        }
      }
      setBlogs(blogs.sort(compareBlogs))
    } catch (exception) {
      if (message === '') {
        message = 'increasing likes failed'
      }
      setTimeout(() => {
        setErrorMessage(message)
      }, 5000)
      console.log('error: ', exception)
    }
  }

  /*const showDeleteButton = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    console.log('logged', ' bu: ', blog.user.username)
    if (loggedUser) {
      const loggedUserParse = JSON.parse(loggedUser)
      console.log('kirj: ', loggedUserParse.username, ' bu: ', blog.user.username)
      setDeleteVisible(loggedUserParse.id === id)
    }
  }*/

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} onClick={() => setBlogVisible(!blogVisible)}>
        <p>{blog.title}, {blog.author}, {blog.url}, {blog.likes} likes <button onClick={() => addLike(blog.id)}>like</button></p>
        <button onClick={() => removeBlog(blog.id)}>delete</button>
      </div>
      <div style={showWhenVisible} onClick={() => setBlogVisible(!blogVisible)}>
        <p>{blog.title}, {blog.author}</p>
      </div>
    </div>
  )
}

export default Blog