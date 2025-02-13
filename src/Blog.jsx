import {useContext} from "react";
import {NameContext} from "./Contexts.jsx";
import {Link} from "react-router-dom";

export default function Blog(){
    const [name, setName] = useContext(NameContext)

    return (

        <div>
            {!sessionStorage.getItem("name") ? <h1>You are logged in as Guest</h1>:<h1>Hello, {sessionStorage.getItem("name")}!</h1>}
            <ul>
                <li><Link to={"/posts"}>See Posts</Link></li>
                <li><Link to={"/login"}>Log in</Link></li>
                <li><Link to={"/register"}>Register</Link></li>
                {sessionStorage.getItem("token") && <Link to={"/posts/manage"}><li>Manage Posts</li></Link>}
                {sessionStorage.getItem("token") && <Link to={"/posts/new"}><li>Add new Post</li></Link>}
            </ul>
        </div>
    )
}