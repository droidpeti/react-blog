import {useState} from "react";

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <div>
            <h1>Add new Post</h1>
            <ul>
                <li>
                    <label>Title</label>
                    <input type="text" onChange={e => setTitle(e.target.value)} value={title}/>
                </li>
                <li>
                    <label>Content</label>
                    <input type="text" onChange={e => setContent(e.target.value)} value={content}/>
                </li>
            </ul>
            <button onClick={() => {
                let token = sessionStorage.getItem("token");
                if (token) {
                    if (content && title) {
                        fetch("http://localhost:3000/posts", {
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
                            if (response.status === 201) {
                                window.alert("Successfully Added Post!");
                            }
                            else{
                                window.alert(response.error.message);
                            }
                        })
                    }
                } else {
                    window.alert("Invalid Credentials");
                }
            }
            }>Upload
            </button>
        </div>
    )
}