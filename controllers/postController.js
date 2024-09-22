import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {


  const keyword = req.query.keyword
    ? {
      postItem: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const posts = await Post.find({ ...keyword })


  res.json({ posts })
})

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
})

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    await post.deleteOne()
    res.json({ message: 'Post removed' })
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    postItem: 'Sample name',
    sender: 'User',
    recipient: 'User',
    senderEmail: req.user.email,
    user: req.user._id,
    
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const {
    postItem,
    sender,
    recipient,
    senderEmail
  } = req.body

  const post = await Post.findById(req.params.id)

  if (post) {
    post.postItem = postItem
    post.sender = sender
    post.recipient = recipient
    post.senderEmail = senderEmail

    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

const getMyPosts = asyncHandler(async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      res.status(400);
      throw new Error('User data is missing');
    }


    const posts = await Post.find({ senderEmail: req.user.email });

    if (posts.length > 0) {
      res.json(posts);
    } else {
      res.status(404).json({ message: 'No posts found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});




export {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  getMyPosts
}
