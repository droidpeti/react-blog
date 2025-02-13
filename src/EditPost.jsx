import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BASE_URLContext} from "./Contexts.jsx";

export default function EditPost() {
    const [post, setPost] = useState({});
    const[image, setImage] = useState(null);
    const BASE_URL = useContext(BASE_URLContext)

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

    return (
        <div key={post.id}>
            <ul>
                <li>
                    <label>Image: </label><input type={"file"} onChange={e => handleImageChange(e)}/><br/>
                </li>
                <li>
                    <label>Title: </label>
                    <input onChange={e => setPost({
                        ...post,
                        title: e.target.value
                    })} value={post.title}/>
                </li>
                <li>
                    <label>Content: </label>
                    <input onChange={e => setPost({
                        ...post,
                        content: e.target.value
                    })} value={post.content}/>
                </li>
            </ul>
            <button onClick={() => {
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
                            }
                            else{
                                window.alert("Error");
                            }
                        })
                    }
    //
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
                    }).then()
                }
                else{
                    window.alert("Invalid Credentials");
                }
            }}>Save</button>
        </div>
    )
}