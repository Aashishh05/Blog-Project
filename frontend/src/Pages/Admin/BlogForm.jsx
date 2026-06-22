import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BlogSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .required("Title is required"),

  category: Yup.string().required("Please select a category"),

  subtitle: Yup.string()
    .max(200, "Subtitle cannot exceed 200 characters")
    .required("Subtitle is required"),

  content: Yup.string()
    .min(50, "Content is too short")
    .required("Content is required"),
});

const BlogForm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [blog, setBlog] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState([]);
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const nav = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: "",
    subtitle: "",
    category: "",
    content: "",
    coverImage: null,
  });

const fetchBlogById = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/blog/get/${id}`,
      {
        withCredentials: true,
      }
    );

    const blog = res.data.blog;

    setInitialValues({
      title: blog.title || "",
      subtitle: blog.subtitle || "",
      category: blog.category?._id || blog.category || "",
      content: blog.content || "",
      coverImage: null,
    });

    setImagePreview(blog.image?.url || "");
  } catch (error) {
    console.log(error.response?.data || error);
  }
};

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("subtitle", values.subtitle);
      formData.append("category", values.category);
      formData.append("content", values.content);

      if (values.coverImage) {
        formData.append("image", values.coverImage);
      }
      if (isEditMode) {
        const res = await axios.put(
          `http://localhost:5000/api/blog/update/${id}`,
          formData,
          {withCredentials:true,
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        if (res.status === 200) {
          alert("blog updated successfully");
        }
        nav(`/admin/blogs`)
      } else {
        const res = await axios.post(
          `http://localhost:5000/api/blog/create`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.log(res.data);
        setBlog((prev) => [...prev, res.data.blog]);
        nav(`/admin/blogs`);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fetchCategory = async () => {
    try {
      const category_res = await axios.get(
        `http://localhost:5000/api/category/get`,
        { withCredentials: true },
      );
      setCategory(category_res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
    if (id) {
      fetchBlogById();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50 flex relative overflow-hidden font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-300/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-60 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/5 rounded-full blur-3xl" />
      </div>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 z-10 ${
          sidebarOpen ? "pl-64" : "pl-0"
        }`}
      >
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-xs">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors border border-gray-200 bg-white"
                >
                  <FaBars size={18} />
                </button>
              )}
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Create Blog
              </h1>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 space-y-8 max-w-5xl w-full mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold tracking-wide">
                {isEditMode ? "Edit Blog" : "✍️ Create Blog"}
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-slate-900">
                Write a New Story
              </h1>

              <p className="text-slate-500">
                Share your ideas, knowledge and experiences with the world.
              </p>
            </div>
          </div>

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={BlogSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6 hover:shadow-lg transition-shadow duration-300"
              >

                    <div className="mb-6">
              <button
                onClick={() => nav("/admin/dashboard")}
                className="inline-flex items-center gap-2 bg-slate-200 text-slate-600 border border-gray-200 rounded-lg px-3 py-1 hover:scale-105 transition-all duration-300"
              >
                ← Back
              </button>
            </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    placeholder="Enter blog title..."
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      errors.title && touched.title
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100"
                    } outline-none`}
                  />

                  {errors.title && touched.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subtitle <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="subtitle"
                    placeholder="Enter blog subtitle..."
                    value={values.subtitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      errors.subtitle && touched.subtitle
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100"
                    } outline-none`}
                  />

                  {errors.subtitle && touched.subtitle && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subtitle}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>

                  <select
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      errors.category && touched.category
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100"
                    } outline-none`}
                  >
                    <option value="">Select Category</option>
                    {category?.map((cat) => {
                      return (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      );
                    })}
                  </select>

                  {errors.category && touched.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Cover Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];

                      setFieldValue("coverImage", file);

                      if (file) {
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="w-full border border-slate-300 rounded-xl p-3 bg-slate-50 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100 outline-none transition"
                  />

                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Blog Cover"
                        className="w-64 h-40 rounded-lg object-cover border border-slate-300"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Blog Content <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    rows={12}
                    name="content"
                    placeholder="Start writing your story..."
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none ${
                      errors.content && touched.content
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100"
                    } outline-none`}
                  />

                  {errors.content && touched.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.content}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="reset"
                    className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-200"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-br from-indigo-900 to-indigo-950 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition active:scale-95"
                  >
                    {isEditMode ? "Update Blog" : "Publish Blog"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </main>
      </div>
    </div>
  );
};

export default BlogForm;
