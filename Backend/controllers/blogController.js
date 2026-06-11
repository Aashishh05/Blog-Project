import Blog from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  try {
    const { title, subtitle, content, image, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content and category are required",
      });
    }

    const blog = await Blog.create({
      title,
      subtitle,
      content,
      image,
      category,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id)
      .populate("author", "fullName email")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "fullName email",
        },
      });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const alreadyLiked = blog.likes.some(
      (like) => like.toString() === userId.toString(),
    );

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (like) => like.toString() !== userId.toString(),
      );
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked
        ? "Blog unliked successfully"
        : "Blog liked successfully",
      liked: !alreadyLiked,
      likeCount: blog.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLikedBlogs = async (req, res) => {
  try {
    const userId = req.user._id;

    const blogs = await Blog.find({ likes: userId })
      .populate("author", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
