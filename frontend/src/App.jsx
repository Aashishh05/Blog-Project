import {Route, Routes} from "react-router-dom"
import MainLayout from './Components/MainLayout'
import Navbar from './Components/Navbar'
import Login from "./Pages/User/Login"
const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<MainLayout />} />
          <Route path='/navbar' element={<Navbar />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  )
}

export default App