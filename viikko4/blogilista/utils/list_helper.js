const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return "Empty list!"
    } else {
        const reducer = (sum, item) => {
            return sum + item
        }
        const likesArray = blogs.map(blog => blog.likes)
        const result = likesArray.reduce(reducer, 0)
        //console.log('result: ', result)
        return result
    }
}

const favoriteBlog = (blogs) => {
    let favorite = {
        title: '',
        author: '',
        likes: 0
    }
    blogs.forEach(function(blog){
        if (favorite.likes <= blog.likes) {
            favorite.title = blog.title;
            favorite.author = blog.author;
            favorite.likes = blog.likes;
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    let authorWithMostBlogs = {
        author: '',
        blogs: 0
    }
    let most = 0
    blogs.forEach(function(blog){
        let list = _.filter(blogs, { 'author': blog.author})
        if (list.length > most) {
            most = list.length
            authorWithMostBlogs = {
                author: blog.author,
                blogs: most
            }
        }
    })
    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    let authorWithMostLikes = {
        author: '',
        likes: 0
    }
    let most = 0
    let totalLikes = 0
    blogs.forEach(function(blog){
        let list = _.filter(blogs, { 'author': blog.author})
        for (let i = 0; i < list.length; i++) {
            totalLikes += list[i].likes
        }
        if (totalLikes > most) {
            most = totalLikes
            authorWithMostLikes = {
                author: blog.author,
                likes: most
            }
        }
        totalLikes = 0
    })
    return authorWithMostLikes
    
}

module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs,
mostLikes
}