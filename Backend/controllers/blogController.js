import Blog from "../models/blogModel";

export const createBlog = async (req, res) => {
  try {
    const { title, subtitle, content, image, category } = req.body;

    if (!title || !content || !category) {
      res.status(400).json({
        success: false,
        message: "Title, content and category are required",
      });
    }

    const blog = Blog.create({
      title,
      subtitle,
      content,
      image,
      category,
      author: req.user._id,
    });

    res
      .status(201)
      .json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id)
      .populate("author", "fullName email")
      .populate("comments");

    if (!blog) {
      res.status(400).json({
        success: false,
        message: "Blog not found",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, subtitle, content, category } = req.body;
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(400).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.title = title || blog.title;
    blog.subtitle = subtitle || blog.subtitle;
    blog.content = content || blog.content;
    blog.category = category || blog.category;

    const updateBlog = await findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updateBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(400).json({
        success: false,
        message: "Blog not found",
      });
    }

    await blog.findByIdAndDelete();

    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
