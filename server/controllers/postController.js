const postModel = require('../models/postModel');


//@desc create new Post
//@route POST /api/v1/posts
//@access authenticated users only
exports.createPost = async (req, res, next) => {
    const { headline, description, body, tag } = req.body;

    try {
        const newPost = new postModel({
            headline: headline.toUpperCase(),
            description,
            body,
            tag
        });

        const savedPost = await newPost.save();

        res.status(201).json({
            status: "success",
            data: savedPost,
            message: "Post successfully added"
        })
    } catch (error) {
        next(error)
    }
}


//@desc get all Posts
//@route GET /api/v1/posts
//@access all users
exports.getAllPosts = async (req, res, next) => {
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || 10;
    const skip = (page - 1) * limit


    try {
        const posts = await postModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)


        res.status(200).json({
            status: "success",
            data: posts,
            message: "posts successfully fetched"
        })
    } catch (error) {
        next(error)
    }
}


//@desc get all Posts
//@route GET /api/v1/posts
//@access all users
exports.getPostById = async (req, res, next) => {
    const { id } = req.params

    try {
        const post = await postModel.findById({ _id: id })

        if (!post) return next(new Error("post requested not found!"))

        res.send({
            status: "success",
            data: post,
            message: "post successfully fetched"
        })

    } catch (error) {
        next(error)
    }
}

//@desc update post by id
//@route PATCH /api/v1/posts
//@access all users//for now
exports.updatePost = async (req, res, next) => {
    const { id } = req.params;
    const infoToUpdate = req.body;

    try {
        const findPost = await postModel.findById({ _id: id })

        if (!findPost) {
            return next(new Error("Post with the specified Id does not exist"))
        }

        infoToUpdate.headline = infoToUpdate.headline.toUpperCase()

        const updatedPost = await postModel.findByIdAndUpdate(id, infoToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            status: "success",
            data: updatedPost,
            message: "post successfully updated"
        })
    } catch (error) {
        next(error)
    }
}


//@desc delete post by id
//@route DELETE /api/v1/posts/:id
//@access all users//for now
exports.deletePost = async (req, res, next) => {
    const { id } = req.params;

    try {
        const postToDelete = await postModel.findByIdAndDelete({ _id: id });

        if (!postToDelete) {
            return next(new Error("Post with the specified Id does not exist"))
        }

        res.status(204).json({
            status: "success",
            data: null,
            message: "Post successfully deleted"
        })
    } catch (error) {
        next(error)
    }
}