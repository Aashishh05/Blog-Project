import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

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
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(null);
  const [initialValue, setInitialValue] = useState({
    name: "",
    description: "",
  });

  const fetchCategory = async () => {
    try {
      const category_res = await axios.get(
        `http://localhost:5000/api/category/get`,
        { withCredentials: true },
      );

      setCategory(category_res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (edit) {
        const res = await axios.put(
          `http://localhost:5000/api/category/update/${edit}`,
          values,
          { withCredentials: true },
        );

        setCategory((prev) =>
          prev.map((item) => (item._id === edit ? res.data.category : item)),
        );
        alert("Category updated successfully");
        setEdit(null);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/category/create",
          values,
          { withCredentials: true },
        );

        console.log("SUCCESS:", res.data);
        setCategory((prev) => [...prev, res.data.category]);
        resetForm();

        setInitialValue({
          name: "",
          description: "",
        });
      }
    } catch (error) {
      console.log("ERROR RESPONSE:", error.response?.data);
      setError(error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await window.confirm(
      "Are you sure want to delete this category?",
    );

    if (!confirmed) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/category/delete/${id}`,
        { withCredentials: true },
      );

      if (res.status === 200) {
        alert("Category deleted successfully");
        setCategory((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.log("Error deleting category", error);
      alert("Something went wrong");
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/category/get/${id}`,
        { withCredentials: true },
      );
      console.log(res.data);
      setEdit(id);

      setInitialValue({
        name: res.data.category.name,
        description: res.data.category.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  if (error) {
    return <div className="p-4 text-red-600 font-semibold">{error}</div>;
  }

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
            enableReinitialize
            initialValues={initialValue}
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
                    className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-200 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-br from-indigo-900 to-indigo-950 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition active:scale-95"
                  >
                    {edit ? "Update Category" : "Create Category"}
                  </button>
                </div>
              </form>
            )}
          </Formik>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-10">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Category List
              </h2>
              <span className="text-sm text-slate-500">
                Total: {category?.length || 0}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Created At</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {category?.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-200 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {item.name}
                      </td>

                      <td className="px-6 py-4 text-slate-600 max-w-md truncate">
                        {item.description}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer"
                            onClick={() => handleEdit(item._id)}
                          >
                            <FiEdit />
                            <span>Edit</span>
                          </button>

                          <button
                            className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer"
                            onClick={() => handleDelete(item._id)}
                          >
                            <RiDeleteBin6Line />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCategories;
