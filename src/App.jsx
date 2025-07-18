import { BrowserRouter,Routes,Route } from "react-router-dom";
import Display from "./Display.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Create from "./Create.jsx";
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Display/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/create' element={<Create/>}/>
      
      
    </Routes>
    
    </BrowserRouter>
      
    </>
  )
}

export default App