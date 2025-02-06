import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {BASE_URLContext, NameContext} from "./Contexts.jsx"
import Posts from "./Posts.jsx"
import Blog from "./Blog.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import AddPost from "./AddPost.jsx";

function App() {
  const [user, setUser] = useState("Guest")
    const [baseURL, setBaseURL] = useState("http://localhost:3000")

  return (
    <>
        <BASE_URLContext value={baseURL}>
            <NameContext.Provider value={[user, setUser]}>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Blog/>}/>
                      <Route path="/posts" element={<Posts/>}/>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="login" element={<Login/>}/>
                      <Route path="posts/new" element={<AddPost/>}/>
                  </Routes>
              </BrowserRouter>
            </NameContext.Provider>
        </BASE_URLContext>
    </>
  )
}

export default App
