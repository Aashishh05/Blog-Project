import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Navbar from "../../Components/Navbar";
import axios from "axios";

import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Navbar />

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-300/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-60 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-300/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/70 border border-gray-200 rounded-2xl p-8 lg:p-10 shadow-sm hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-out">
            <div className="mb-6">
              <button
                onClick={() => nav("/")}
                className="inline-flex items-center gap-2 border border-gray-200 text-slate-600 rounded-lg px-3 py-1 hover:border-cyan-500 hover:text-cyan-600 transition"
              >
                ← Back
              </button>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-900 to-indigo-950 flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg shadow-indigo-500/30">
                B
              </div>
              <h1 className="text-sm italic">TECHBLOG</h1>
            </div>

            <Formik
              initialValues={{
                fullName: "",
                email: "",
                password: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const res = await axios.post(
                    `http://localhost:5000/api/auth/register`,
                    values,
                  );
                  console.log(res);
                  resetForm();
                } catch (error) {
                  console.log("DATA:", error.response?.data);
                }
              }}
            >
              {({
                handleChange,
                handleSubmit,
                handleBlur,
                values,
                errors,
                touched,
              }) => (
                <>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold text-slate-900">
                        Full Name
                      </label>

                      <div className="relative mt-2">
                        <FaUser className="absolute left-4 top-3.5 text-cyan-600 text-sm" />
                        <input
                          type="text"
                          name="fullName"
                          value={values.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="John Doe"
                          className="w-full pl-11 pr-4 py-3 text-sm bg-white/60 border border-slate-200 rounded-lg focus:ring-1 focus:ring-cyan-500 outline-none"
                        />
                      </div>

                      {touched.fullName && errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-900">
                        Email Address
                      </label>

                      <div className="relative mt-2">
                        <FaEnvelope className="absolute left-4 top-3.5 text-cyan-600 text-sm" />
                        <input
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="your@email.com"
                          className="w-full pl-11 pr-4 py-3 text-sm bg-white/60 border border-slate-200 rounded-lg focus:ring-1 focus:ring-cyan-500 outline-none"
                        />
                      </div>

                      {touched.email && errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-900">
                        Password
                      </label>

                      <div className="relative mt-2">
                        <FaLock className="absolute left-4 top-3.5 text-cyan-600 text-sm" />

                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter password"
                          className="w-full pl-11 pr-12 py-3 text-sm bg-white/60 border border-slate-200 rounded-lg focus:ring-1 focus:ring-cyan-500 outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-3.5 text-slate-500 hover:text-cyan-600"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>

                      {touched.password && errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      onClick={() => console.log("Button clicked")}
                      className="w-full py-3 mt-2 scale-105 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg
  hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300
  active:scale-95 active:shadow-none"
                    >
                      Sign Up
                    </button>
                  </form>
                </>
              )}
            </Formik>

            <p className="text-center text-slate-700 mt-6">
              Already have an account?
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
            <p className="text-center text-xs text-slate-500 mt-6">
              By registering, you agree to our
              <span className="underline">Terms</span> and
              <span className="underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
