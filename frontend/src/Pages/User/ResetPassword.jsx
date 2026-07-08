import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Navbar from "../../Components/Navbar";

import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
});

const ResetPassword = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  // Password strength checker
  const getStrength = (pwd) => {
    if (!pwd) return { level: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-400" };
    if (score <= 3) return { level: 2, label: "Fair", color: "bg-yellow-400" };
    if (score === 4) return { level: 3, label: "Good", color: "bg-cyan-500" };
    return { level: 4, label: "Strong", color: "bg-green-500" };
  };

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
            {!success ? (
              <>
                <div className="mb-6">
                  <button
                    onClick={() => nav("/forgot-password")}
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

                <div className="mb-6 text-center">
                  <h2 className="text-lg font-bold text-slate-900">
                    Reset Password
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">
                    Choose a strong new password for your account.
                  </p>
                </div>

                <Formik
                  initialValues={{ password: "", confirmPassword: "" }}
                  validationSchema={ResetPasswordSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    setServerError("");
                    try {
                   
                      await axios.post(
                        "http://localhost:5000/api/auth/reset-password",
                        { email, otp, password: values.password },
                        { withCredentials: true },
                      );
                      setSuccess(true);
                    } catch (error) {
                      console.log("STATUS:", error.response?.status);
                      console.log("DATA:", error.response?.data);
                      setServerError(
                        error.response?.data?.message ||
                          "Something went wrong. Please try again.",
                      );
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                  }) => {
                    const strength = getStrength(values.password);
                    return (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* New Password */}
                        <div>
                          <label className="text-sm font-semibold text-slate-900">
                            New Password
                          </label>
                          <div className="relative mt-2">
                            <FaLock className="absolute left-4 top-3.5 text-cyan-600 text-sm" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              placeholder="Enter new password"
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

                          {/* Strength bar */}
                          {values.password.length > 0 && (
                            <div className="mt-2">
                              <div className="flex gap-1 mb-1">
                                {[1, 2, 3, 4].map((i) => (
                                  <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                      i <= strength.level
                                        ? strength.color
                                        : "bg-slate-200"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p
                                className={`text-xs font-medium ${
                                  strength.level === 1
                                    ? "text-red-400"
                                    : strength.level === 2
                                      ? "text-yellow-500"
                                      : strength.level === 3
                                        ? "text-cyan-600"
                                        : "text-green-500"
                                }`}
                              >
                                {strength.label}
                              </p>
                            </div>
                          )}

                          {touched.password && errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.password}
                            </p>
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label className="text-sm font-semibold text-slate-900">
                            Confirm Password
                          </label>
                          <div className="relative mt-2">
                            <FaLock className="absolute left-4 top-3.5 text-cyan-600 text-sm" />
                            <input
                              type={showConfirm ? "text" : "password"}
                              name="confirmPassword"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              placeholder="Re-enter your password"
                              className="w-full pl-11 pr-12 py-3 text-sm bg-white/60 border border-slate-200 rounded-lg focus:ring-1 focus:ring-cyan-500 outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirm(!showConfirm)}
                              className="absolute right-4 top-3.5 text-slate-500 hover:text-cyan-600"
                            >
                              {showConfirm ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>

                          {touched.confirmPassword &&
                            errors.confirmPassword && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.confirmPassword}
                              </p>
                            )}
                        </div>

                        {serverError && (
                          <p className="text-red-500 text-xs text-center">
                            {serverError}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 mt-2 scale-105 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95 active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Resetting..." : "Reset Password"}
                        </button>
                      </form>
                    );
                  }}
                </Formik>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
                  <FaCheckCircle className="text-green-500 text-2xl" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  Password Reset!
                </h2>
                <p className="text-sm text-slate-600 mt-2 mb-6">
                  Your password has been updated successfully. You can now sign
                  in with your new password.
                </p>
                <button
                  onClick={() => nav("/login")}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95"
                >
                  Go to Sign In
                </button>
              </div>
            )}

            {!success && (
              <>
                <p className="text-center text-slate-700 mt-6">
                  Remembered your password?
                  <Link
                    to="/login"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
                <p className="text-center text-xs text-slate-500 mt-4">
                  By continuing, you agree to our
                  <span className="underline">Terms</span> and
                  <span className="underline">Privacy Policy</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
