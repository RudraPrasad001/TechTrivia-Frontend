import { BrowserRouter,Routes,Route } from "react-router-dom";
import Display from "./Display.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Display/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      
      
    </Routes>
    
    </BrowserRouter>
      
    </>
  )
}

export default App