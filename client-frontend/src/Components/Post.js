import React from 'react';
import { formatISO9075 } from "date-fns";
import { Link } from 'react-router-dom';

const Post = (props) => {
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
            <Link to={`/post/${props.id}`}>
              <a className="author" href="/">{props.author}</a>
            </Link>
            <time>{formatISO9075(new Date(props.createdAt))}</time>
          </p>
          <p className="summary">{props.summary}</p>
          <button>Like</button>
          <Link to={`/post/${props.id}`}><button>View Post</button></Link>
        </div>
      </div>
    </>
  )
};

export default Post;
