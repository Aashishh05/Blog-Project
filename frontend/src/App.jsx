import {Route, Routes} from "react-router-dom"
import MainLayout from './Components/MainLayout'
import Navbar from './Components/Navbar'
const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<MainLayout />} />
          <Route path='/navbar' element={<Navbar />} />
        </Routes>
    </div>
  )
}

export default App