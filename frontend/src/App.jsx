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
const App = () => {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogdetails" element={<Blogdetails />} />

        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />} >
        <Route path="/blogform" element={<BlogForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<MainLayout />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </div>
  );
};

export default App;
