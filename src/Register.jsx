import {useContext, useState} from "react";
import {BASE_URLContext} from "./Contexts.jsx";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const BASE_URL = useContext(BASE_URLContext)

    function handleSubmit() {
        if(!userName || !password || !email) {
            window.alert("Please enter all required fields.");
            return;
        }
        fetch(BASE_URL+"/auth/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: userName
            })
        }).then((response) => {
            if(response.status === 400) {
                window.alert("User already exists!");
            }
            if(response.status === 201) {
                window.alert("Succesfully Registered");
                setUserName("");
                setEmail("");
                setPassword("");
            }
        })

    }

    return (
        <div>
            <h1>Register</h1>
            <ul>
                <li>
                    <label>Username: </label>
                    <input type="text" onChange={e => setUserName(e.target.value)} value={userName} />
                </li>
                <li>
                    <label>Email: </label>
                    <input type="email" onChange={e => setEmail(e.target.value)} value={email} />
                </li>
                <li>
                    <label>Password: </label>
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
                </li>
                <li>
                    <button type="submit" onClick={() => handleSubmit()}>Register</button>
                </li>
            </ul>
        </div>
    )
}