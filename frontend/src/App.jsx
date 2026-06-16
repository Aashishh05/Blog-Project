import {Route, Routes} from "react-router-dom"
import MainLayout from './Components/MainLayout'
import Navbar from './Components/Navbar'
import Login from "./Pages/User/Login"
import Signup from "./Pages/User/Signup"
const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<MainLayout />} />
          <Route path='/navbar' element={<Navbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  )
}

export default App