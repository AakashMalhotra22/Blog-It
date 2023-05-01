import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/usercontext';
import Post from './Post';

const SavedPosts = () => 
{
  const {id} = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState('');
  const {userInfo, setUserInfo} = useContext(UserContext);

  useEffect( ()=>
  {
      //accessing savedPost
      const savePostfn = async()=>
      {
          let response = await fetch(`http://127.0.0.1:5000/api/v1/auth/allsavedPost/${id}`,
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
      savePostfn();;
  },[]) 

  return(
    <>
            {posts.length>0 && posts.map((post)=>
            {
                return <Post key = {post._id} title ={post.title} summary = {post.summary} 
                content = {post.content} cover = {post.cover} createdAt = {post.createdAt} 
                authorId ={post.authorId} id ={post._id} likes = {post.likes} likeduser = {post.likeduser}/>
            })}
    </>
)
}

export default SavedPosts
