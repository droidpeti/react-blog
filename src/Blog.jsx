import { useContext } from "react";
import { NameContext } from "./Contexts.jsx";
import { Link } from "react-router-dom";
import "./Blog.css"

export default function Blog() {
    const [name, setName] = useContext(NameContext);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("name");
            setName("Guest");
            location.reload();
        }
    };

    return (
        <div className="blog-container">
            <h1>
                {sessionStorage.getItem("name") 
                    ? `Hello, ${sessionStorage.getItem("name")}!` 
                    : "You are logged in as Guest"}
            </h1>

            {sessionStorage.getItem("token") && (
                <button className="logout-button" onClick={handleLogout}>
                    Log out
                </button>
            )}

            <ul className="nav-links">
                <li><Link to="/posts">See Posts</Link></li>
                {!sessionStorage.getItem("token") && (
                    <>
                        <li><Link to="/login">Log in</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
                {sessionStorage.getItem("token") && (
                    <>
                        <li><Link to="/posts/manage">Manage Posts</Link></li>
                        <li><Link to="/posts/new">Add New Post</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
}
