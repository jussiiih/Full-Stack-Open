const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length !== 0) {
        const totalLikes = blogs.reduce(function(sum, blog) {
            return sum + blog.likes}, 0)
        return totalLikes
    }
    else {
        return 0
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length !== 0) {
        const max_likes = Math.max(...(blogs.map((blog) => blog.likes)))
        const favorite_blog = blogs.find((blog) => blog.likes === max_likes)
        const { _id, url, __v, ...result } = favorite_blog
        return result
    }
    else {
        return 0
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}