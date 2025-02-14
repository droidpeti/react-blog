import { useContext, useEffect, useState } from "react";
import { BASE_URLContext, NameContext } from "./Contexts.jsx";
import { Link } from "react-router-dom";
import "./Posts.css"

export default function ManagePosts() {
    const [name, setName] = useContext(NameContext);
    const BASE_URL = useContext(BASE_URLContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => fetchPosts(), [BASE_URL]);

    function fetchPosts(){
        fetch(BASE_URL + "/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }

    function deletePost(id){
        let token = sessionStorage.getItem("token");
        if(token){
            if (window.confirm("Are you sure you want to delete this post?")) {
                fetch(BASE_URL + "/posts/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }).then(res => {
                    if(res.status === 204){
                        window.alert("Successfully Deleted Post!")
                        fetchPosts();
                    }
                    else{
                        window.alert("Error")
                    }
                }).catch(() => window.alert("Something went wrong. Please try again."));
        }
        else{
            window.alert("You are not authorized to delete this post")
        }

        }
    }

    return (
        <div className="posts-container">
            <Link to={"/"} className="back-button">Go Back</Link>
            <div className="posts-grid">
                {posts.map((post) =>
                    sessionStorage.getItem("name") === post.author.username ? (
                        <div key={post.id} className="post-card">
                            <img src={`${BASE_URL}/${post.image}`} alt={post.title} className="post-image"/>
                            <div className="post-content">
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                                <p className="post-meta">By {post.author.username} | {post.createdAt.split("T")[0]}</p>
                            </div>
                            <Link to={`/posts/edit/${post.id}`}><button>Edit</button></Link>
                            <button style={{backgroundColor: "red"}}onClick={() => deletePost(post.id)}>Delete</button>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}
