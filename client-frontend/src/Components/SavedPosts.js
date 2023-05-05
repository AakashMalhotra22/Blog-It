import React, { useEffect, useState, useContext } from 'react'
import {useNavigate, } from 'react-router-dom';
import { UserContext } from '../context/usercontext';
import Post from './Post';

const SavedPosts = () => 
{
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [posts, setPosts] = useState(null);

  useEffect( ()=>
  {
      const savePostfn = async()=>
      {
          let response = await fetch(`http://127.0.0.1:5000/api/v1/blog/savedposts`,
          {
                headers:{'token': localStorage.getItem('token')},   
          })
          if(response.ok)
          {
              let post = await response.json();
              setPosts(post);
          }
          else
          {
              setUserInfo(null);
              navigate("/");
          }
      }
      savePostfn();      
  },[])
  
  if (!posts) {
    return <div>Loading...</div>;
  }
  return(
    <>
        {posts.length>0 && posts.map((post)=>
        {
            if(post.savedPost.includes(userInfo.id))
            {
                return <Post {...post}/>
            }
        })}
    </>
)
}

export default SavedPosts
