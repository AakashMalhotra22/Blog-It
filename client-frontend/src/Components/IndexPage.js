import React, { useEffect, useState, useContext } from 'react';
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/usercontext';

const IndexPage = ()=>
{
    const {setUserInfo} = useContext(UserContext);   
    const navigate = useNavigate();

    const [posts, setPosts] = useState('');
    useEffect( ()=>
    {
        const allposts = async()=>
        {
            let response = await fetch('http://127.0.0.1:5000/api/v1/blog/allposts',
            {
                headers:
                {
                    'token': localStorage.getItem('token')
                },
            })
            // user is not authorized, navigate to login page
            if(response.status === 401)
            {
                alert("Unauthorized Access: Login Again");
                localStorage.removeItem('token');
                navigate("/login")
            }
            else if(response.ok)
            {
                let post = await response.json();
                setPosts(post);
            }
            // other errors
            else
            {
                alert("Server Issue");
                setUserInfo(null);
                navigate("/login");
            }
        }
        allposts();
    },[]) 

    return(
        <>
            {posts.length>0 && posts.map((post)=>
            {
                return <Post key = {post._id} title ={post.title} summary = {post.summary} content = {post.content} cover = {post.cover} createdAt = {post.createdAt} author ={post.author} id ={post._id}/>
            })}
        </>
    )
};

export default IndexPage;