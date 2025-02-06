import {useState} from "react";

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <div>
            <ul>
                <li>
                    <label>Title</label>
                </li>
            </ul>
        </div>
    )
}