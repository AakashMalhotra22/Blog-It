import React, { useEffect, useState, useContext } from 'react';
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/usercontext';

const IndexPage = ()=>
{
    const {setUserInfo} = useContext(UserContext);   
    const navigate = useNavigate();

    const [posts, setPosts] = useState('');

    //Accessing all the post for the Main page
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
            if(response.ok)
            {
                let post = await response.json();
                console.log(post);
                setPosts(post);
            }
            else
            {
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
                return <Post key = {post._id} title ={post.title} summary = {post.summary} 
                content = {post.content} cover = {post.cover} createdAt = {post.createdAt} 
                authorId ={post.authorId} id ={post._id} likes = {post.likes} likeduser = {post.likeduser}/>
            })}
        </>
    )
};

export default IndexPage;