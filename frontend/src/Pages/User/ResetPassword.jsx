import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Create your new password for your blog account
        </p>


        {message && (
          <div className="mt-5 p-3 rounded-lg bg-green-100 text-green-700 text-center">
            {message}
          </div>
        )}


        {error && (
          <div className="mt-5 p-3 rounded-lg bg-red-100 text-red-700 text-center">
            {error}
          </div>
        )}


        <form 
          onSubmit={handleSubmit} 
          className="mt-8 space-y-5"
        >

          <div>
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>


          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>


          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {
              loading 
              ? "Resetting..."
              : "Reset Password"
            }
          </button>

        </form>


        <div className="text-center mt-6">

          <button
            onClick={()=>navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;