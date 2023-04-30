import React, { useContext, useEffect } from 'react';
import { formatISO9075 } from "date-fns";
import { Link } from 'react-router-dom';
import { UserContext } from '../context/usercontext';

const Post = (props) => {

  const {userInfo} = useContext(UserContext);  

  useEffect(()=>{
    console.log("welcome");
  },[]);
  return (
    <>
      <div className="post">
        <div className="image">
          <Link to={`/post/${props.id}`}>
            <img src={'http://localhost:5000/' + props.cover} alt="error " height="300px" width="300" />
          </Link>

        </div>
        <div className="texts">
          <Link to={`/post/${props.id}`}>
            <h2>{props.title}</h2>  
          </Link>
          <p className="info">
            <Link to={`/${props.authorId._id}`}>
              <a className="author" href="/">{props.authorId.name}</a>
            </Link>
            <time>{formatISO9075(new Date(props.createdAt))}</time>
          </p>
          <p className="summary">{props.summary}</p>
          <div className="button-sec">
          <button className='b1'>Like</button>
          <Link className='b2' to={`/post/${props.id}`}><button>View Post</button></Link>
          </div>
        </div>
      </div>
    </>
  )
};

export default Post;
