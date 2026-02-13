import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    isValidated: {
      type: Boolean,
      required: true,
      default: false,
    },

    validationToken: {
      type: String,
    },

    //Dùng cho TTL auto delete nếu chưa verify
    verificationExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

/* =========================
   TTL INDEX
   Tự động xóa document khi
   verificationExpiresAt < hiện tại
========================= */
userSchema.index(
  { verificationExpiresAt: 1 },
  { expireAfterSeconds: 0 }
)

/* =========================
   PASSWORD MATCH
========================= */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

/* =========================
   HASH PASSWORD
========================= */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
