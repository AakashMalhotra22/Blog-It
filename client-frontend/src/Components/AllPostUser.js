import React, { useEffect, useState, useContext } from 'react';
import Post from './Post';
import { useNavigate, useParams } from 'react-router-dom';
import {UserContext} from '../context/usercontext';

const AllPostUser = () => 
{
    const {id} = useParams();
    const {setUserInfo} = useContext(UserContext);   
    const navigate = useNavigate();

    const [posts, setPosts] = useState('');

    //Accessing all the post for the Main page
    useEffect( ()=>
    {
        const allposts = async()=>
        {
            let response = await fetch(`http://127.0.0.1:5000/api/v1/blog/allposts/${id}`,
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
                console.log(posts.length);
            }
            else
            {
                // setUserInfo(null);
                // navigate("/login");
            }
        }
        allposts();
    },[]) 

    return(
        <>
            {posts.length>0 && posts.map((post)=>
            {
                return <Post {...post}/>
            })}
        </>
    )
}

export default AllPostUser
