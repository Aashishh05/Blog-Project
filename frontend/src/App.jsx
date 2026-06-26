import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import Navbar from "./Components/Navbar";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import Homepage from "./Pages/Homepage";
import Blogdetails from "./Pages/Blogdetails";
import BlogForm from "./Pages/Admin/BlogForm";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import AdminDashboard from "./Pages/Admin/Admindashboard";
import AddCategories from "./Pages/Admin/AddCategories";
import AdminBlogs from "./Pages/Admin/AdminBlogs";
import Blogs from "./Pages/Blogs";
import Footer from "./Components/Footer";
import LikedBlogs from "./Pages/User/LikedBlogs";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogdetails/:id" element={<Blogdetails />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/liked" element={<LikedBlogs />} />

        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/blogform" element={<BlogForm />} />
          <Route path="/blogform/:id" element={<BlogForm />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/categories" element={<AddCategories />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
        </Route>

        <Route element={<MainLayout />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </div>
  );
};

export default App;
