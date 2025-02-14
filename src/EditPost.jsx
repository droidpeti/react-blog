import {useContext, useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {BASE_URLContext} from "./Contexts.jsx";
import { Link } from "react-router-dom";

export default function EditPost() {
    const [post, setPost] = useState({});
    const[image, setImage] = useState(null);
    const BASE_URL = useContext(BASE_URLContext)
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    let form = new FormData()
    let params = useParams();

    useEffect(() => {
        fetch(BASE_URL + "/posts/" + params.id)
            .then(res => res.json())
            .then(data => setPost(data))
    }, [])

    function handleImageChange(e){
        setImage(e.target.files[0]);
    }

    function handleSubmit(e){
        e.preventDefault();
        setError("");
        let token = sessionStorage.getItem("token");
            if(token){
                if(image){
                    form.append("image", image)
                    fetch(BASE_URL + "/posts/" + post.id + "/upload", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        body: form
                    }).then((response) => {
                        if (response.status !== 400 || response.status !== 500 || response.status !== 403 || response.status === 404) {
                            window.alert("Successfully Uploaded Image!");
                            setSuccess(true)
                        }
                        else{
                            setError("Error");
                        }
                    }).catch(() => setError("Something went wrong. Please try again."));
                }
                fetch(BASE_URL + "/posts/" + post.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: post.title,
                        content: post.content
                    })
                }).then((response) => {
                    if(response.status != 400 || response.status != 403 || response.status != 404){
                        window.alert("Updated Post Content!");
                        setSuccess(true);
                    }
                }).catch(() => setError("Something went wrong. Please try again."));
            }
            else{
                setError("Invalid Credentials");
            }
        }
    if(success){
        return <Navigate to={"/posts/manage"}/>
    }

    return (
        <div key={post.id} className="form-container">
            <Link to={"/posts/manage"}><button>Go Back</button></Link>
            {error && <p className="error-message">{error}</p>}
            <form className="form" onSubmit={handleSubmit}>

                    <label>Image: </label><input type={"file"} onChange={e => handleImageChange(e)}/>

                    <label>Title: </label>
                    <input onChange={e => setPost({
                        ...post,
                        title: e.target.value
                    })} value={post.title}/>

                    <label>Content: </label>
                    <input onChange={e => setPost({
                        ...post,
                        content: e.target.value
                    })} value={post.content}/>

            <button>Save</button>
            </form>
        </div>
    )
}