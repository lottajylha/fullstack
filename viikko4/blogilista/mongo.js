const mongoose = require('mongoose')

const url =
  `mongodb+srv://Lotta:salasana@cluster0-ajiv1.mongodb.net/bloglist-testdb?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: 'Blog',
    author: 'Author',
    url: 'url',
    likes: 1
})

blog.save().then(response => {
    console.log('saved to db');
    mongoose.connection.close();
})
