import React, { useEffect, useState, useContext } from 'react';
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import {UserContext} from '../context/usercontext';
import InfiniteScroll from "react-infinite-scroll-component";


const IndexPage = ()=>
{
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useContext(UserContext);   
    const [posts, setPosts] = useState('');
    const [page, setPage] = useState(1);
    const [newdata, setnewdata] = useState(0);
    const [lastItemTimestamp, setlastItemTimestamp] = useState(Date.now());

    //Accessing all the post for the Main page
    useEffect( ()=>
    {
        allposts();
    },[])
    
    const allposts = async()=>
    {
        let response = await fetch(`http://127.0.0.1:5000/api/v1/blog/allposts?page=${page}&lastItemTimestamp=${lastItemTimestamp}`,
        {
            headers:
            {
                'token': localStorage.getItem('token')
            },
        })
        if(response.ok)
        {
            let data = await response.json();
            setPosts([...posts, ...data]);
            setPage(page+1);
            setnewdata(data.length);
            if(posts.length>0) setlastItemTimestamp(posts[posts.length - 1].createdAt);
        }
        else
        {
            setUserInfo(null);
            navigate("/login");
        }
    }

    return(
        <>
            <InfiniteScroll
            dataLength={posts.length}
            next={allposts}
            hasMore={newdata>0}
            loader={<h4>Loading...</h4>}
            >
                {posts.length>0 && posts.map((post)=>
                {
                    return <Post {...post}/>
                })}
            </InfiniteScroll>
        </>
    )
};

export default IndexPage;