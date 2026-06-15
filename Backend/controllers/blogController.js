import Blog from "../models/blogModel.js";
import fs from "fs";
import UploadToCloudinary from "../utils/cloudinaryUploads.js";
import DeleteFromCloudinary from "../utils/cloudinaryDelete.js";
import cloudinary from "../config/cloudinary.js";

export const createBlog = async (req, res) => {
  try {
    const { title, subtitle, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content and category are required",
      });
    }

    let image = {};

    if (req.file) {
      image = await UploadToCloudinary(req.file.path, "Blog");
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
    let { page = 1, limit = 5 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;
    const blogs = await Blog.find()
      .populate("author", "fullName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments();

    const totalPages = Math.ceil(totalBlogs / limit);

    res.status(200).json({
      success: true,
      blogs,
      pagination: {
        totalBlogs,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
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

    if (req.file) {
      if (blog.image?.public_id) {
        await DeleteFromCloudinary(blog.image.public_id);
      }
      blog.image = await UploadToCloudinary(req.file.path);
    }

    const { title, content, category } = req.body;

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (category) blog.category = category;

    await blog.save();

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


    if(blog.image?.public_id){
      await DeleteFromCloudinary(blog.image.public_id)
    }

    await blog.deleteOne()

    // // delete image from uploads folder
    // if (blog.image) {
    //   const imagePath = `uploads/${blog.image}`;

    //   fs.unlink(imagePath, (err) => {
    //     if (err) {
    //       console.log("Failed to delete image:", err.message);
    //     }
    //   });
    // }

    // await Blog.findByIdAndDelete(id);

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
