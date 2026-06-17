import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Navbar from "../../Components/Navbar";

const BlogSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .required("Title is required"),

  category: Yup.string().required("Please select a category"),

  description: Yup.string()
    .max(200, "Description cannot exceed 200 characters")
    .required("Description is required"),

  content: Yup.string()
    .min(50, "Content is too short")
    .required("Content is required"),
});
const BlogForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold tracking-wide">
            ✍️ Create Blog
          </span>

          <h1 className="text-4xl font-bold text-slate-900 mt-2">
            Write a New Story
          </h1>

          <p className="text-slate-500 mt-2">
            Share your ideas, knowledge and experiences with the world.
          </p>
        </div>

        <Formik
          initialValues={{
            title: "",
            category: "",
            subtitle: "",
            content: "",
            coverImage: null,
          }}
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
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-6 hover:shadow-2xl scale-105 transition-all duration-300"
            >
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter blog title..."
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100 outline-none transition"
                />

                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Subtitle
                </label>

                <input
                  type="text"
                  name="subtitle"
                  placeholder="Enter blog subtitle...."
                  value={values.subtitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100 outline-none transition"
                />

                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100 outline-none transition"
                >
                  <option value="">Select Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Programming">Programming</option>
                  <option value="Web Development">Web Development</option>
                  <option value="AI & Machine Learning">
                    AI & Machine Learning
                  </option>
                  <option value="Design">Design</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>

                {errors.category && touched.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
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
                  onChange={(event) =>
                    setFieldValue("coverImage", event.currentTarget.files[0])
                  }
                  className="w-full border border-slate-300 rounded-xl p-3 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Blog Content
                </label>

                <textarea
                  rows={14}
                  name="content"
                  placeholder="Start writing your story..."
                  value={values.content}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100 outline-none transition"
                />

                {errors.content && touched.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-br from-indigo-900 to-indigo-950 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition"
                >
                  Publish Blog
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BlogForm;
