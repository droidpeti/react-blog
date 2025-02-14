import {useContext, useState} from "react";
import {BASE_URLContext} from "./Contexts.jsx";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const BASE_URL = useContext(BASE_URLContext)
    const [success, setSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if(!userName || !password || !email) {
            setError("Please enter all required fields.");
            return;
        }
        fetch(BASE_URL+"/auth/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: userName
            })
        }).then((response) => {
            if(response.status === 400) {
                setError("User already exists!");
            }
            if(response.status === 201) {
                window.alert("Succesfully Registered");
                setSuccess("true");
            }
        }).catch(() => setError("Something went wrong. Please try again."));

    }

    if(sessionStorage.getItem("token") || success){
        return(
            <Navigate to={"/"}/>
        )
    }

    return (
        <div className="form-container">
            <Link to="/"><button>Go Back</button></Link>
            <h1>Register</h1>
            {error && <p className="error-message">{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                        <label>Username: </label>
                        <input type="text" onChange={e => setUserName(e.target.value)} value={userName} />

                        <label>Email: </label>
                        <input type="email" onChange={e => setEmail(e.target.value)} value={email} />

                        <label>Password: </label>
                        <input type="password" onChange={e => setPassword(e.target.value)} value={password} />

                        <button type="submit">Register</button>

            </form>
        </div>
    )
}