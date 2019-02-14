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
  
module.exports = {
dummy,
totalLikes,
favoriteBlog
}