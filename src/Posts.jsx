import {useContext, useEffect, useState} from "react";
import {BASE_URLContext, NameContext} from "./Contexts.jsx";
import {Link} from "react-router-dom";

export default function Posts() {

    const BASE_URL = useContext(BASE_URLContext)
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch(BASE_URL + "/posts")
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])
    console.log(posts)
    return (
        <div>
            <Link to={"/"}>Go Back</Link>
            {posts.map((post) => (
                <div key={post.id}>
                    <img src={`${BASE_URL}/${post.image}`} alt={post.title}/>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <p>Author: {post.author.username}</p>
                    <p>{post.createdAt.split("T")[0]}</p>
                </div>
            ))}
            {!sessionStorage.getItem("key") && <Link to={"/posts/new"}><button>Add new Post</button></Link>}
        </div>
    )
}