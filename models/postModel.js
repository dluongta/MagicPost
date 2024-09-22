import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    postItem: {
      type:String,
      required:true,
      default:"",
    },
    recipient: {
      type:String,
      required:true,
      default:"",
    },
    sender: {
      type:String,
      required:true,
      default:"",
    },
    senderEmail: {
      type:String,
      required:true,
      default:"",
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
