import {useState} from "react";
import { BASE_URLContext } from "./Contexts";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";



export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const BASE_URL = useContext(BASE_URLContext)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        let token = sessionStorage.getItem("token");
                if (token) {
                    if (content && title) {
                        fetch(BASE_URL + "/posts", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                title: title,
                                content: content
                            })
                        }).then((response) => {
                            setContent("");
                            setTitle("");
                            if (response.status === 201) {
                                window.alert("Successfully Added Post!");
                                setSuccess(true);
                            }
                            else{
                                setError(response.error.message);
                            }
                        }).catch(() => setError("Something went wrong. Please try again."));
                    }
                    else{
                        setError("Enter all fields");
                    }
                } else {
                    setError("Invalid Credentials");
                }
    }

    if(success){
        return <Navigate to="/posts"/>
    }

    return (
        <div className="form-container">
            <Link to={"/"}><button>Go Back</button></Link>
            <h1>Add new Post</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input type="text" onChange={e => setTitle(e.target.value)} value={title}/>

                    <label>Content</label>
                    <input type="text" onChange={e => setContent(e.target.value)} value={content}/>
                    <button type="submit">Upload</button>
                </form>
            
        </div>
    )
}