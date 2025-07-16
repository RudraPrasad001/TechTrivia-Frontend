import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Home=()=>{

    const navigate=useNavigate();
    const [user, setUser]=useState(null);

    useEffect(() => {
        const token=Cookies.get("token");

        if (!token) {
            navigate("/");
        } else {
            const userData=Cookies.get("user");
            if (userData) {
                setUser(JSON.parse(userData));
            }
        }
    }, []);


    return(
        <>
            <div>
                <h1>Welcome to Home Page !!!!!!</h1>
                {user && <p>Logged in as:{user.email}</p>}
            </div>
        
        
        
        
        
        
        </>





    );
}
export default Home;