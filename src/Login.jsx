import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; 
import './login.css';
import toast from "react-hot-toast";
import {Loader} from "lucide-react"

const Login = () => {
    const URL = import.meta.env.VITE_API_URL;
    
    const navigate = useNavigate();

    const [name, setName] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
    const [pass, setPass] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);

        if (! name.trim() || !pass) {
            toast.error("Login failed: fill all fields");
            setIsLoading(false)
            return;
        }
        try {
            const response = await axios.post(
  `${URL}/api/auth/login`,
  {
    name: name,
    password: pass,
  },
  { withCredentials: true } 
);

            const { token, user } = response.data;

            if (token) {
                Cookies.set("token", token, { expires: 7 }); 
                Cookies.set("user", JSON.stringify(user), { expires: 7 });
                toast.success("Login Completed Successfully");
                goFullscreen();
                navigate("/quizpage");
            } else {
                toast.error("Login failed: Invalid response from server");
                setIsLoading(false)
            }

        } catch (err) {
            console.error("Login error:", err);
            toast.error("Login failed: Invalid email or password");
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <div className="login-bg">
            <div className="login-container">
                <h2 className="login-title">LOGIN</h2>
                <div className="fields">
                    <input
                        type="text"
                        placeholder="Enter team name or email"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <button disabled={isLoading} style={isLoading?{opacity:0.7}:{opacity:1}} onClick={handleSubmit}>{isLoading?<Loader Animate="spin"></Loader>:"SUBMIT"}</button>
                </div>
            </div>
        </div>
    );
};

function goFullscreen() {
  const elem = document.documentElement;
  
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

export default Login;
