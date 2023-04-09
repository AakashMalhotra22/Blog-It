import './App.css';
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import IndexPage from './Components/IndexPage';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route  path ="/" element ={<Layout/>}>
          <Route index element = {<IndexPage/>}/>
          <Route path ="login" element = {<LoginPage/>} />
          <Route path ="register" element = {<div>register</div>}/>
        </Route>
      </Routes>
      
    </>
  );
}

export default App;
