import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";

export const createComment = async (req, res) => {
  try {
    const { blogId, comment } = req.body;
    const userId = req.user._id;

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment is required",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const newComment = await Comment.create({
      blog: blogId,
      user: userId,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "fullName email")
      .populate("blog", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blog: blogId })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const existingComment = await Comment.findById(id);

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // only owner can edit
    if (existingComment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to edit this comment",
      });
    }

    existingComment.comment = comment || existingComment.comment;

    await existingComment.save();

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment: existingComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // only owner can delete
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to delete this comment",
      });
    }

    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
