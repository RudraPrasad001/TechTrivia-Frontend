import { useLocation,useNavigate } from "react-router-dom";
import './display.css';
import Typewriter from "react-typewriter-effect"

const Disqualified=()=>{
    const navigate=useNavigate();
    const handleLogin=()=>{
        navigate('/login');
    }

    return(
        <>
            <div className="bg">
                <Typewriter
                      text="Sorry,You are disqualified"
                      speed={60}
                      cursor="none"
                      font="14px"
                    ></Typewriter>
                <div className="content">
                    <img src="https://uploads.onecompiler.io/42sryw8q2/42sryuhsc/Dark%20Blue%20and%20Gold%20Luxury%20Modern%20Real%20Estate%20Property%20Logo.png" alt="Title" className="title-image" />
                    
                </div>
            </div>
        
        
        
        
        
        </>



    );
}
export default Disqualified;