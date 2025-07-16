import { useLocation,useNavigate } from "react-router-dom";
import './display.css';

const Display=()=>{
    const navigate=useNavigate();
    const handleLogin=()=>{
        navigate('/login');
    }

    return(
        <>
            <div className="bg">
                <div className="content">
                    <img src="https://uploads.onecompiler.io/42sryw8q2/42sryuhsc/Dark%20Blue%20and%20Gold%20Luxury%20Modern%20Real%20Estate%20Property%20Logo.png" alt="Title" className="title-image" />
                    
                </div>
                <button className="login" onClick={handleLogin}>LOGIN</button>
            </div>
        
        
        
        
        
        </>



    );
}
export default Display;