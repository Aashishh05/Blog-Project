import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import Navbar from "./Components/Navbar";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import Homepage from "./Pages/Homepage";
import Blogdetails from "./Pages/Blogdetails";
import BlogForm from "./Pages/Admin/BlogForm";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route element={<MainLayout />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogdetails" element={<Blogdetails />} />
        <Route path="/blogform" element={<BlogForm />} />
      </Routes>
    </div>
  );
};

export default App;
