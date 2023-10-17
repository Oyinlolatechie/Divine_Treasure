const express = require('express')
const postRouter = express.Router()

const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController')
const { validatePostMiddleware } = require('../middleware/inputValidator')


postRouter.post('/posts', validatePostMiddleware, createPost)

postRouter.get('/posts', getAllPosts)

postRouter.get('/posts/:id', getPostById)

postRouter.patch('/posts/:id', updatePost)

postRouter.delete('/posts/:id', deletePost)

module.exports = postRouter