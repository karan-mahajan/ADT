const express = require('express');
const router = express.Router();
const Blog = require('../model/blogSchema');
const User = require('../model/userSchema');
const Comment = require('../model/commentSchema');

// GET all blogs with optional filtering by tags and categories
router.get('/all', async (req, res) => {
    try {
        const { tags, categories } = req.query;
        const filter = {};

        if (tags) {
            filter.tags = { $in: tags.split(',') };
        }

        if (categories) {
            filter.categories = { $in: categories.split(',') };
        }

        const blogs = await Blog.find(filter);
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to fetch the blogs' });
    }
});

// POST a new blog
router.post('/add', async (req, res) => {
    try {
        const { title, content, categories, tags } = req.body;
        const { user } = req.userData;

        const userDetails = await User.findOne({ email: user.email }).exec();

        const blogData = {
            title,
            content,
            categories,
            tags,
            authorName: `${userDetails.firstName} ${userDetails.lastName}`,
            author: userDetails.id,
        };

        const userBlog = await Blog.create(blogData);
        res.status(200).json(userBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to upload the blog' });
    }
});

// DELETE a blog and its associated comments
router.delete('/delete', async (req, res) => {
    try {
        const id = req.query.id;

        await Blog.deleteOne({ _id: id }).exec();
        await Comment.deleteMany({ blogID: id }).exec();

        res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to delete the blog' });
    }
});

// PUT (update) a blog
router.put('/update/:blogId', async (req, res) => {
    try {
        const { title, content, categories, tags } = req.body;
        const { blogId } = req.params;
        const { user } = req.userData;

        const userDetails = await User.findOne({ email: user.email }).exec();

        if (!userDetails) {
            return res.status(400).json({ message: 'User not found' });
        }

        const updatedData = {
            title,
            content,
            categories,
            tags,
            authorName: `${userDetails.firstName} ${userDetails.lastName}`,
            author: userDetails.id,
        };

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true }).exec();

        if (!updatedBlog) {
            return res.status(400).json({ message: 'Blog not found' });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to update the blog' });
    }
});

// POST a comment on a blog
router.post('/comment', async (req, res) => {
    try {
        const { comment, user, blogId } = req.body;
        const userDetails = await User.findOne({ email: user }).exec();

        const commentData = {
            text: comment,
            blogID: blogId,
            commenterName: `${userDetails.firstName} ${userDetails.lastName}`,
        };

        await Comment.create(commentData);
        res.status(200).json({ message: 'Successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to add the comment' });
    }
});

// GET comments for a specific blog
router.get('/getcomments', async (req, res) => {
    try {
        const { id } = req.query;
        const commentsData = await Comment.find({ blogID: id });
        res.status(200).json(commentsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to fetch the comments' });
    }
});

router.delete('/comment/delete/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const response = await Comment.findByIdAndDelete(commentId);
        console.log(response);
        res.status(200).json({});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to delete the comment' });
    }
})

module.exports = router;
