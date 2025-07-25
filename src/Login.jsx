import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; 
import './login.css';

const Login = () => {
    const navigate = useNavigate();

    const [name, setName] = useState(null);
    const [pass, setPass] = useState(null);

    const handleSubmit = async () => {
        console.log("NAME:", name);
        console.log("PASSWORD:", pass);

        if (!name || !pass) {
            alert("Login failed: fill all fields");
            return;
        }

        try {
            const response = await axios.post(
  "http://localhost:3000/api/auth/login",
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
                navigate("/quizpage");
            } else {
                alert("Login failed: Invalid response from server");
            }

        } catch (err) {
            console.error("Login error:", err);
            alert("Login failed: Invalid email or password");
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
                    <button onClick={handleSubmit}>SUBMIT</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
