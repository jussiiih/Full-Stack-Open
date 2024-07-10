const lodash = require('lodash')

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

const mostBlogs = (blogs) => {
    if (blogs.length !== 0) {
        const groups = lodash.countBy(blogs, 'author')
        const max_value = Math.max(...lodash.values(groups))
        const most_blogs = lodash.findKey(groups, value => value === max_value)

        return { author: most_blogs, blogs: max_value }
    }
    else {
        return 0
    }
}

const mostLikes = (blogs) => {
    if (blogs.length !== 0) {
        const groups = lodash.groupBy(blogs, 'author')
        const likesByAuthor = lodash.mapValues(groups, (authorBlogs) => {
            return lodash.sumBy(authorBlogs, 'likes')
        })
        const max_likes = Math.max(...lodash.values(likesByAuthor))
        const most_likes = lodash.findKey(likesByAuthor, value => value === max_likes)

        return { author: most_likes, likes: max_likes }
    }
    else {
        return 0
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}