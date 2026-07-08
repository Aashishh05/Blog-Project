import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Navbar from "../../Components/Navbar";

import { FaEnvelope } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const nav = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [email, setEmail] = useState([]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setOtpError("Please enter all 6 digits.");
      return;
    }
    setOtpError("");
    setOtpLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp: otpValue },
        { withCredentials: true },
      );
      nav("/reset-password", { state: { email: email, otp: otp.join("") } });
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      setOtpError(
        error.response?.data?.message || "Invalid OTP. Please try again.",
      );
    } finally {
      setOtpLoading(false);
    }
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
            <div className="mb-6">
              <button
                onClick={() => nav("/login")}
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

            {!submitted ? (
              <>
                <div className="mb-6 text-center">
                  <h2 className="text-lg font-bold text-slate-900">
                    Forgot Password?
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">
                    Enter your email and we&apos;ll send you a link to reset
                    your password.
                  </p>
                </div>

                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={ForgotPasswordSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    setServerError("");
                    try {
                      await axios.post(
                        "http://localhost:5000/api/auth/forgot-password",
                        values,
                        { withCredentials: true },
                      );
                      setEmail(values.email);
                      setSubmitted(true);
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
                  }) => (
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
                            onChange={handleChange}
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
                        {isSubmitting ? "Sending..." : "Send Reset OTP"}
                      </button>
                    </form>
                  )}
                </Formik>
              </>
            ) : !showOtp ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-cyan-100 flex items-center justify-center">
                  <FaEnvelope className="text-cyan-600 text-xl" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  Check your inbox
                </h2>
                <p className="text-sm text-slate-600 mt-2 mb-6">
                  Please check your email, we&apos;ve sent a password reset OTP.
                </p>
                <button
                  onClick={() => setShowOtp(true)}
                  className="w-1/2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95"
                >
                  Enter your OTP
                </button>
              </div>
            ) : (
              <div className="py-2">
                <div className="text-center mb-6">
                  <h2 className="text-lg font-bold text-slate-900">
                    Enter OTP
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Enter the 6-digit code sent to your email.
                  </p>
                </div>

                <div
                  className="flex justify-center gap-2 mb-4"
                  onPaste={handleOtpPaste}
                >
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-11 h-12 text-center text-lg font-bold bg-white/60 border border-slate-200 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 transition-all duration-200"
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="text-red-500 text-xs text-center mb-3">
                    {otpError}
                  </p>
                )}

                <button
                  onClick={handleVerifyOtp}
                  disabled={otpLoading}
                  className="w-full py-3 mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {otpLoading ? "Verifying..." : "Verify OTP"}
                </button>

                <p className="text-center text-sm text-slate-600 mt-4">
                  Didn&apos;t receive it?{" "}
                  <button
                    onClick={() => {
                      setOtp(["", "", "", "", "", ""]);
                      setOtpError("");
                      setSubmitted(false);
                      setShowOtp(false);
                    }}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Resend OTP
                  </button>
                </p>
              </div>
            )}

            <p className="text-center text-slate-700 mt-6">
              Remembered your password?
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>

            <p className="text-center text-xs text-slate-500 mt-6">
              By continuing, you agree to our
              <span className="underline">Terms</span> and
              <span className="underline">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
