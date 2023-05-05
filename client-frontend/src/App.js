import './App.css';
import React, { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { UserContext } from './context/usercontext';

import Layout from './Components/Layout';
import IndexPage from './Components/IndexPage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import CreatePost from './Components/CreatePost';
import PostPage from './Components/PostPage';
import EditPost from './Components/EditPost';
import Profile from './Components/Profile';
import PopularPost from './Components/PopularPost';
import EditProfile from './Components/EditProfile';
import UpdatePassword from './Components/UpdatePassword';
import AllPostUser from './Components/AllPostUser';
import SavedPosts from './Components/SavedPosts';
import Notifications from './Components/Notifications';


function App() {
  const [userInfo, setUserInfo] = useState(null);

  // Updating the value of userInfo on reloading or refreshing
  useEffect(()=>
    {
          const token = localStorage.getItem('token');
          const id = localStorage.getItem('id');
          const name = localStorage.getItem('name');
          
          if(token != null)
          {
            setUserInfo({'token': token, 'id': id, 'name':name});
          }
    },[])

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path ="/" element={<IndexPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/:id" element = {<Profile/>} />
              <Route path="/editprofile/:id" element = {<EditProfile/>} />
              <Route path="/updatePassword/:id" element = {<UpdatePassword/>} />
              <Route path="/popularpost" element = {<PopularPost/>} />
              <Route path="/allpost/:id" element={<AllPostUser/>} />
              <Route path="/savedPosts/:id" element = {<SavedPosts/>} />
              <Route path="/notifications" element = {<Notifications/>} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
