import './App.css';
import React from 'react';
import Post from './Components/Post';
import Header from './Components/Header';
import {Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route  path ="/" element ={
        <main>
          <Header/>
          <Post/>
          <Post/>
      </main>}/>

      <Route path ="/login" element = {
        <div>login</div>
      }/>

      <Route path ="/register" element = {
            <div>register</div>
          }/>
      </Routes>
      
    </>
  );
}

export default App;
