import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const compareBlogs = (a,b) => {
    if (a.likes < b.likes) {
      return -1
    }
    if (a.likes > b.likes) {
      return 1
    }
    return 0
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setErrorMessage(`User ${username} logged in.`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
      setBlogs(blogs.sort(compareBlogs))
    } catch (exception) {
      setErrorMessage('Username or password invalid, login failed.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async () => {
    try {
      const username = user.username
      window.localStorage.clear()
      setErrorMessage(`User ${username} logged out.`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Logout failed.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: newBlogTitle,
        author:newBlogAuthor,
        url: newBlogUrl
      }

      blogService
        .create(blogObject).then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlogTitle('')
          setNewBlogAuthor('')
          setNewBlogUrl('')
        })
      setErrorMessage(`A new blog "${blogObject.title}" by ${blogObject.author} added.`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.sort(compareBlogs))
    } catch (exception) {
      setErrorMessage('Adding a new blog failed.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )

  }

  const blogForm = () => {
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>Create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            newBlogTitle={newBlogTitle}
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
            setNewBlogTitle={({ target }) => setNewBlogTitle(target.value)}
            setNewBlogAuthor={({ target }) => setNewBlogAuthor(target.value)}
            setNewBlogUrl={({ target }) => setNewBlogUrl(target.value)}
            addBlog={addBlog}
          />
          <button onClick={() => setCreateVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const rows = () => {
    return (
      blogs.map(blog =>

        <div key={blogs._id}>
          <Blog blog={blog} blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} compareBlogs={compareBlogs}/>
        </div>
      )
    )
  }

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage}/>
        <p>{user.name} logged in</p>
        <button onClick={() => handleLogOut()}>log out</button>
        {blogForm()}
        {rows()}
      </div>
    )
  }

  return (
    <div>
      <h1>Log in to application</h1>

      <Notification message={errorMessage}/>
      {loginForm()}

    </div>
  )
}

export default App