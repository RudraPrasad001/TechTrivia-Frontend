import { useLocation,useNavigate } from "react-router-dom";
import './display.css';

const ThankYou=()=>{
    const navigate=useNavigate();
    const handleLogin=()=>{
        navigate('/login');
    }

    return(
        <>
            <div className="bg">
                <div style={{textAlign:"center",color:"#68470d"}}>
                    <div className="content">
                    <img src="https://uploads.onecompiler.io/42sryw8q2/42sryuhsc/Dark%20Blue%20and%20Gold%20Luxury%20Modern%20Real%20Estate%20Property%20Logo.png" alt="Title" className="title-image" />
                    
                </div>
                    <h1>Thank You For Participating!</h1>
                    <h3>Result will be announced soon</h3>
                </div>
            </div>
        
        
        
        
        
        </>



    );
}
export default ThankYou;