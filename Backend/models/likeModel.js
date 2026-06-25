import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent same user liking same blog multiple times
likeSchema.index({ user: 1, blog: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);

export default Like;