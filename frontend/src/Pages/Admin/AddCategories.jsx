import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";

const CategorySchema = Yup.object({
  name: Yup.string()
    .min(3, "Category name must be at least 3 characters")
    .max(50, "Category name cannot exceed 50 characters")
    .required("Category name is required"),

  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description cannot exceed 300 characters")
    .required("Description is required"),
});

const AddCategories = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    // API call would go here
    resetForm();
  };

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
                Categories
              </h1>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 space-y-8 max-w-5xl w-full mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold tracking-wide">
                🏷️ Add Category
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-slate-900">
                Create New Category
              </h1>
              <p className="text-slate-500">
                Organize your blog content by creating new categories.
              </p>
            </div>
          </div>

          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            validationSchema={CategorySchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              resetForm,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Web Development, AI & ML..."
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                      errors.name && touched.name
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100"
                    } outline-none`}
                  />

                  {errors.name && touched.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    rows={6}
                    name="description"
                    placeholder="Describe what this category is about..."
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none ${
                      errors.description && touched.description
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-slate-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-100"
                    } outline-none`}
                  />

                  {errors.description && touched.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="reset"
                    onClick={resetForm}
                    className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-200"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-br from-indigo-900 to-indigo-950 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition active:scale-95"
                  >
                    Create Category
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

export default AddCategories;