import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Navbar from "../../Components/Navbar";

import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { setToken, setUser } from "../../Localstorage/storage";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

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
                className="inline-flex items-center gap-2 bg-slate-200 text-slate-600 border border-gray-200 rounded-lg px-3 py-1 hover:scale-105 transition-all duration-300"
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

            {loginError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
                <FaExclamationCircle className="flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                setLoginError("");
                try {
                  const res = await axios.post(
                    "http://localhost:5000/api/auth/login",
                    values,
                    { withCredentials: true },
                  );

                  const { user, token, admin } = res.data;
                  const loggedInUser = user || admin;

                  dispatch(
                    login({
                      user: loggedInUser,
                      token,
                    }),
                  );
                  setUser(loggedInUser);
                  setToken(token);

                  if (loggedInUser.role === "admin") {
                    nav("/admin/dashboard");
                  } else {
                    nav("/");
                  }
                } catch (error) {
                  console.log("STATUS:", error.response?.status);
                  console.log("DATA:", error.response?.data);

                  const status = error.response?.status;
                  const serverMessage = error.response?.data?.message;

                  if (status === 401 || status === 400) {
                    setLoginError(
                      serverMessage || "Incorrect email or password. Please try again.",
                    );
                  } else if (status === 404) {
                    setLoginError(serverMessage || "No account found with this email.");
                  } else if (!error.response) {
                    setLoginError("Unable to reach the server. Please try again later.");
                  } else {
                    setLoginError(serverMessage || "Something went wrong. Please try again.");
                  }
                }
              }}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                        onChange={(e) => {
                          setLoginError("");
                          handleChange(e);
                        }}
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
                        onChange={(e) => {
                          setLoginError("");
                          handleChange(e);
                        }}
                        placeholder="Enter your password"
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

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-slate-600">
                      <input type="checkbox" className="accent-cyan-600" />
                      Remember me
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-2 scale-105 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95 active:shadow-none"
                  >
                    Sign In
                  </button>
                </form>
              )}
            </Formik>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <span className="text-slate-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 border-2 border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-200/30 transition"
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>

            <p className="text-center text-slate-700 mt-6">
              Don&apos;t have an account?{" "}
              <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                Sign up
              </span>
            </p>

            <p className="text-center text-xs text-slate-500 mt-6">
              By signing in, you agree to our{" "}
              <span className="underline">Terms</span> and{" "}
              <span className="underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;