import { useContext, useState } from "react";
import { BASE_URLContext, NameContext } from "./Contexts.jsx";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
    const BASE_URL = useContext(BASE_URLContext);
    const [name, setName] = useContext(NameContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!userName || !password) {
            setError("Please enter both username and password.");
            return;
        }

        fetch(BASE_URL + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: userName, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 401) {
                setError("Invalid username or password.");
                return;
            } else {
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("name", data.user.username);
                setName(userName);
            }
        })
        .catch(() => setError("Something went wrong. Please try again."));
    }

    if (sessionStorage.getItem("token")) {
        return <Navigate to="/" />;
    }

    return (
        <div className="form-container">
            <Link to="/"><button>Go Back</button></Link>
            <h1>Login</h1>
            <form className="form" onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                <label>
                    Username:
                    <input 
                        type="text" 
                        onChange={e => setUserName(e.target.value)} 
                        value={userName} 
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password" 
                        onChange={e => setPassword(e.target.value)} 
                        value={password} 
                    />
                </label>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}
