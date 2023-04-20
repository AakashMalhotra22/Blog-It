import React, { useEffect, useState } from 'react';
import Post from './Post';

const IndexPage = ()=>
{
    const [posts, setPosts] = useState('');
    useEffect( ()=>
    {
        const allposts = async()=>
        {
            let response = await fetch('http://127.0.0.1:5000/api/v1/blog/allposts')
            let post = await response.json();
            // console.log(post[0].title);
            setPosts(post);
        }
        allposts();
    },[])

    return(
        <>
            {posts.length>0 && posts.map((post)=>
            {
                return <Post title ={post.title} summary = {post.summary} content = {post.content} cover = {post.cover} createdAt = {post.createdAt} author ={post.author} />
            })}
        </>
    )
};

export default IndexPage;