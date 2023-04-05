import './App.css';
import React from 'react';
import f_p from './f_p.jpg'

function App() {
  return (
    <>
    <main>
      <header>
        <a href="" className="logo"> MyBlog</a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>
      <div className="post">
        <img src={f_p} height ="300px" width ="300"/>
        <div className = "texts">
          <h2>This is title</h2>
          <p>this is para</p>
        </div>
      </div>

      <div className="post">
        <img src={f_p} height ="300px" width ="300"/>
        <div className = "texts">
          <h2>This is title</h2>
          <p>this is para</p>
        </div>
      </div>
      <div className="post">
        <img src={f_p} height ="300px" width ="300"/>
        <div className = "texts">
          <h2>This is title</h2>
          <p>this is para</p>
        </div>
      </div>

      
     
    </main>
    </>
  );
}

export default App;
