import Blog from "../models/blogModel.js";
import fs from "fs";
import path from "path";
import UploadToCloudinary from "../utils/cloudinaryUploads.js";
import DeleteFromCloudinary from "../utils/cloudinaryDelete.js";
import Comment from "../models/commentModel.js";
import Like from "../models/likeModel.js";

// ================= CREATE BLOG =================

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
    console.log(req.file.path);
    if (req.file) {
      const uploadedImage = await UploadToCloudinary(req.file.path, "Blog");

      image = {
        url: uploadedImage.url,
        public_id: uploadedImage.public_id,
        path: req.file.path,
      };
    }

    const blog = await Blog.create({
      title,
      subtitle,
      content,
      category,
      image,
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

// ================= GET ALL BLOGS =================

export const getAllBlogs = async (req, res) => {
  try {
    let { page = 1, limit = 6 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const blogs = await Blog.find()

      .populate("author", "fullName email")

      .sort({
        createdAt: -1,
      })

      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments();

    res.status(200).json({
      success: true,

      blogs,

      pagination: {
        totalBlogs,

        totalPages: Math.ceil(totalBlogs / limit),

        currentPage: page,

        limit,

        hasNextPage: page < Math.ceil(totalBlogs / limit),

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

// ================= SEARCH BLOG =================

export const searchBlog = async (req, res) => {
  try {
    const { search = "" } = req.query;

    if (!search.trim()) {
      return res.status(200).json({
        success: true,
        blogs: [],
      });
    }

    const blogs = await Blog.find({
      $or: [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },

        {
          content: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    });

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

// ================= GET BLOG BY ID =================

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

      .populate("author", "fullName email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const likeCount = await Like.countDocuments({
      blog: req.params.id,
    });

    res.status(200).json({
      success: true,
      blog,
      likeCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE BLOG =================

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (req.file) {
      // delete old cloudinary image

      if (blog.image?.public_id) {
        await DeleteFromCloudinary(blog.image.public_id);
      }

      // delete old local file

      if (blog.image?.local_path && fs.existsSync(blog.image.local_path)) {
        fs.unlinkSync(blog.image.local_path);
      }

      // upload new image

      const uploadedImage = await UploadToCloudinary(req.file.path, "Blog");

      blog.image = {
        url: uploadedImage.url,

        public_id: uploadedImage.public_id,

        local_path: req.file.path,
      };
    }

    blog.title = req.body.title || blog.title;

    blog.subtitle = req.body.subtitle || blog.subtitle;

    blog.content = req.body.content || blog.content;

    blog.category = req.body.category || blog.category;

    await blog.save();

    res.status(200).json({
      success: true,

      message: "Blog updated successfully",

      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE BLOG =================

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // delete cloudinary image

    if (blog.image?.public_id) {
      await DeleteFromCloudinary(blog.image.public_id);
    }
    console.log(blog);
    // delete local uploads image

    if (blog.image?.path && fs.existsSync(blog.image.path)) {
      fs.unlinkSync(blog.image.path);
    }

    await blog.deleteOne();

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

// ================= LIKE / UNLIKE BLOG =================

export const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const existingLike = await Like.findOne({
      user: req.user._id,

      blog: req.params.id,
    });

    if (existingLike) {
      await existingLike.deleteOne();

      blog.likes.pull(req.user._id);

      await blog.save();

      return res.status(200).json({
        success: true,

        message: "Blog unliked",

        liked: false,

        likeCount: blog.likes.length,
      });
    }

    await Like.create({
      user: req.user._id,

      blog: req.params.id,
    });

    blog.likes.push(req.user._id);

    await blog.save();

    res.status(200).json({
      success: true,

      message: "Blog liked",

      liked: true,

      likeCount: blog.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET LIKED BLOGS =================

export const getLikedBlogs = async (req, res) => {
  try {
    const likes = await Like.find({
      user: req.user._id,
    })

      .populate({
        path: "blog",

        populate: {
          path: "author",

          select: "fullName email",
        },
      })

      .sort({
        createdAt: -1,
      });

    const blogs = likes.map((item) => item.blog).filter(Boolean);

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
