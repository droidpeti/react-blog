import { useContext, useEffect, useState } from "react";
import { BASE_URLContext } from "./Contexts.jsx";
import { Link } from "react-router-dom";
import "./Posts.css"

export default function Posts() {
    const BASE_URL = useContext(BASE_URLContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(BASE_URL + "/posts")
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <div className="posts-container">
            <Link to="/" className="back-button">Go Back</Link>

            <div className="posts-grid">
                {posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <img src={`${BASE_URL}/${post.image}`} alt={post.title} className="post-image"/>
                        <div className="post-content">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <p className="post-meta">By {post.author.username} | {post.createdAt.split("T")[0]}</p>
                        </div>
                    </div>
                ))}
            </div>

            {sessionStorage.getItem("token") && (
                <Link to="/posts/new">
                    <button className="add-post-button">Add New Post</button>
                </Link>
            )}
        </div>
    );
}
