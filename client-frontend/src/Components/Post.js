import React from 'react';
import f_p from '../f_p.jpg'


const Post = ()=>{
 return(
    <>
    <div className="post">
          <div className="image">
            <img src={f_p} height="300px" width="300" />

          </div>
          <div className="texts">
            <h2>This is title</h2>
            <p className="info">
              <a className="author">Aakash Malhotra</a>
              <time>2023-01-03 16:45</time>
            </p>
            <p className="summary">this is para</p>
          </div>
        </div>
    </>
 )   
}

export default Post;
