import React from 'react';
import f_p from '../f_p.jpg'
import {formatISO9075} from "date-fns";
import { formatISO9075WithOptions } from 'date-fns/fp';

const Post = (props)=>{
 return(
    <>
    <div className="post">
          <div className="image">
            <img src={f_p} alt ="error " height="300px" width="300" />

          </div>
          <div className="texts">
            <h2>{props.title}</h2>
            <p className="info">
              <a className="author" href="/">Aakash Malhotra</a>
              <time>{formatISO9075(new Date(props.createdAt))}</time>
            </p>
            <p className="summary">{props.summary}</p>
          </div>
        </div>
    </>
 )   
};

export default Post;
