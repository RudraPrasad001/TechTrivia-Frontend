import { BrowserRouter,Routes,Route } from "react-router-dom";
import Display from "./Display.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Create from "./Create.jsx";
import Quiz from "./Quiz.jsx";
import {Toaster} from "react-hot-toast"
import ThankYou from "./Thankyou.jsx";
import Disqualified from "./Disqualified.jsx";
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
      <Route path='/thank-you' element={<ThankYou/>}/>
      <Route path="/disqualified" element={<Disqualified/>}></Route>
      
    </Routes>

    <Toaster toastOptions={{
          style: {
            background: '#ffe58f',
            color: '#614700',
            fontWeight:"bold",
            borderRadius: '8px',
          },
        }}></Toaster>
    </BrowserRouter>
      
    </>
  )
}

export default App