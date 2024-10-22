import express from 'express'
const router = express.Router()
import {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  getMyPosts
} from '../controllers/postController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPosts).post(protect, admin, createPost)
router
  .route('/:id')
  .get(getPostById)
  .delete(protect, admin, deletePost)
  .put(protect, admin, updatePost)
router.route('/my/myposts').get(protect, getMyPosts)

export default router
