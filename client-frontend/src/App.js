import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/usercontext';

import Layout from './Components/Layout';
import IndexPage from './Components/IndexPage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import CreatePost from './Components/CreatePost';
import PostPage from './Components/PostPage';
import EditPost from './Components/EditPost';

function App() {
  const [userInfo, setUserInfo] = useState({});
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/edit/:id" element={<EditPost />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
