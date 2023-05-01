import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/usercontext';
import Post from './Post';

const SavedPosts = () => 
{
  const navigate = useNavigate();
  const [posts, setPosts] = useState('');
  const {userInfo, setUserInfo} = useContext(UserContext);

  let savedPost=[];
  useEffect( ()=>
  {
      //accessing savedPost
      const savePostfn = async()=>
      {
          let response = await fetch(`http://127.0.0.1:5000/api/v1/blog/allposts`,
          {
              headers:
              {
                  'token': localStorage.getItem('token')
              },
          })
          if(response.ok)
          {
              let post = await response.json();
              setPosts(post);
          }
          else
          {
              setUserInfo(null);
              navigate("/login");
          }
      }
      savePostfn();      
  },[]) 
  console.log(posts);
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
