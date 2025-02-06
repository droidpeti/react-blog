import {useContext, useState} from "react";
import {BASE_URLContext, NameContext} from "./Contexts.jsx";

export default function Login() {
    const BASE_URL = useContext(BASE_URLContext)
    const [name, setName] = useContext(NameContext)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit() {
        if(!userName || !password){
            window.alert("Please enter all required fields.");
            return;
        }
        fetch(BASE_URL+"/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userName,
                password: password
            })
        }).then((response) => response.json())
            .then((data) => {
                if(data.status === 401) {
                    window.alert("Invalid username or password");
                    return;
                }
                else{
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("name", data.user.username);
                    setName(userName);
                    window.alert("Successfully logged in!");
                }

        })
    }

    return (
        <div>
            <h1>Login</h1>
            <ul>
                <li>
                    <label>Username: </label>
                    <input type="text" onChange={e => setUserName(e.target.value)} value={userName} />
                </li>
                <li>
                    <label>Password: </label>
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
                </li>
                <li>
                    <button type="submit" onClick={() => handleSubmit()}>Log in</button>
                </li>
            </ul>
        </div>
    )
}