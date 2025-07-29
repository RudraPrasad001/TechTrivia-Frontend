import { useLocation,useNavigate } from "react-router-dom";
import './display.css';
import Typewriter from 'react-typewriter-effect';

const ThankYou=()=>{
    const navigate=useNavigate();

    return(
        <>
            <div className="bg">
                
                <div className="header">
                    <Typewriter
                        text="Thank You For Participating!"
                        typeSpeed={60}
                        cursorColor="none"
                        cursor="none"
                    />
                    <div className="content">
                    <img src="https://uploads.onecompiler.io/42sryw8q2/42sryuhsc/Dark%20Blue%20and%20Gold%20Luxury%20Modern%20Real%20Estate%20Property%20Logo.png" alt="Title" className="title-image" />
                    
                     </div>
                </div>
            </div>
        
        
        
        
        
        </>



    );
}
export default ThankYou;