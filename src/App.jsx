import { BrowserRouter,Routes,Route } from "react-router-dom";
import Display from "./Display.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Create from "./Create.jsx";
import Quiz from "./Quiz.jsx";
import {Toaster} from "react-hot-toast"
import ThankYou from "./Thankyou.jsx";
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Display/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/quizpage' element={<Quiz/>}/>
      <Route path='/Thank-you' element={<ThankYou/>}/>
      
    </Routes>

    <Toaster toastOptions={{
          style: {
            background: '#614700',
            color: '#fff',
            borderRadius: '8px',
          },
        }}></Toaster>
    </BrowserRouter>
      
    </>
  )
}

export default App