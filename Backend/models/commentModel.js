import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
    },
  },
  { timestamps: true },
);

const Comment =  mongoose.model("Comment", commentSchema);
export default Comment;
