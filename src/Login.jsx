import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; 
import axios from "axios"
import './login.css';
const Login=()=>{
    const navigate=useNavigate();
    const[email,setEmail]=useState(null);
    const [pass,setPass]=useState(null);
    const handleSubmit=async()=>{
         try {
            const response=await axios.post("http://localhost:3000/api/auth/login", {
                email,
                password: pass,
            });
            const {message,token,user}=response.data;
            if (token) {
      
                Cookies.set("token", token, { expires: 7 }); 
                Cookies.set("user", JSON.stringify(user), { expires: 7 });
                navigate("/home");
            } else {
                alert("Login failed: Invalid response from server");
            }
        }catch (err) {
            console.error(err);
            if(!email || !pass){
                alert("Login failed: fill all fields");
            }
            else{
                alert("Login failed: Invalid email or password");
            }
        }
    };



     
    
    return (
        <>
            <div className="login-bg">
                <div className="login-container">
                    <h2 className="login-title">LOGIN</h2>
                    <div className="fields">
                        <input
                            type="text"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Enter password"
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <button onClick={handleSubmit}>SUBMIT</button>
                    </div>
                </div>
            </div>

        
        
        
        </>


    );
}
export default Login;