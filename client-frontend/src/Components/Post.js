import React, { useContext, useEffect, useState } from 'react';
import { formatISO9075 } from "date-fns";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/usercontext';
const myImage = require('./like.png');

const Post = (props) => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [buttontxt,setbuttontext] = useState('');
  
  const [liketxt,setliketext] = useState('');
  const [likes,setlikes] = useState(props.likes);
  
  useEffect(()=>
  {
      //let store = userInfo.user;
    let store = userInfo.savedPost;
    // console.log(store);
    console.log("pakka"+store);
    if(store.includes(props.id))
    {
        setbuttontext("saved");
    }
    else
    {
        setbuttontext("wanna save");
    }

    if(props.likeduser.includes(userInfo.id))
    {
        setliketext("Liked");
    }
    else{
      setliketext("Like");
    }
  },[]);

 

  const savePost = async(event)=>
  {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/auth/savedPost`, {
      method: 'PUT',
      body: JSON.stringify({postId: props.id, userId: userInfo.id}),
      headers:{'Content-Type':'application/json'},
    });
    const json   = await response.json();
    if(response.ok)
    {
        console.log("bye"+json.singleuser.savedPost);
        setUserInfo({'token': userInfo.token, 'id': userInfo.id, 'savedPost':json.singleuser.savedPost});
        localStorage.setItem('savedPost',json.singleuser.savedPost);
        if(buttontxt === "wanna save")
        {
          setbuttontext("saved");
        }
        else
        {
          setbuttontext("wanna save");
        }
    }
  }

  const likefn = async(event)=>
  {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/blog/likepost`, {
      method: 'PUT',
      body: JSON.stringify({postId: props.id, userId: userInfo.id}),
      headers:{'Content-Type':'application/json'},
    });
    const json   = await response.json();
    if(response.ok)
    {
        setlikes(json.post.likes);
        if(liketxt === "Like")
        {
          setliketext("Liked");
        }
        else
        {
          setliketext("Like");
        }
    }
  }

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
          <button onClick={likefn} className='b2'><img src={myImage}  alt="Button Image"/>{liketxt} {likes}</button>
          <Link className='b2' to={`/post/${props.id}`}><button>View Post</button></Link>
          <button className='b1' onClick={savePost}>{buttontxt}</button>
          </div>
          
        </div>
      </div>
    </>
  )
};

export default Post;

