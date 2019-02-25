import React from 'react'

const BlogForm = ({
  addBlog,
  setNewBlogTitle,
  setNewBlogAuthor,
  setNewBlogUrl,
  newBlogTitle,
  newBlogAuthor,
  newBlogUrl
}) => {
  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
        title
          <input
            type="text"
            value={newBlogTitle}
            onChange={setNewBlogTitle}
          />
        </div>
        <div>
        author
          <input
            type="text"
            value={newBlogAuthor}
            onChange={setNewBlogAuthor}
          />
        </div>
        <div>
        url
          <input
            type="text"
            value={newBlogUrl}
            onChange={setNewBlogUrl}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm