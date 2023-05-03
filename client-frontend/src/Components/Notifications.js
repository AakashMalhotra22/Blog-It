import React, { useEffect, useState, useContext } from 'react';
import Post from './Post';
import { Link, useNavigate } from 'react-router-dom';
import {UserContext} from '../context/usercontext';
import InfiniteScroll from "react-infinite-scroll-component";
import { formatISO9075 } from "date-fns";


const Notifications = ()=>
{
    const {userInfo, setUserInfo} = useContext(UserContext);   
    const navigate = useNavigate();

    const [notifications, setnotifications] = useState([]);
    const [page, setPage] = useState(1);

    //Accessing all the notifications
    useEffect( ()=>
    {
        console.log("hi");
        if (userInfo && userInfo.id) {
            console.log(userInfo.id);
            allnotifications();
          }
    },[userInfo])
    
    const allnotifications = async()=>
    {
        let response = await fetch(`http://127.0.0.1:5000/api/v1/notification/getAll?page=${page}&userId=${userInfo.id}`,
        {
            headers:
            {
                'token': localStorage.getItem('token')
            },
        })
        if(response.ok)
        {
            let data = await response.json();
            setnotifications([...notifications, ...data]);
            setPage(page+1);
        }
        // else
        // {
        //     setUserInfo(null);
        //     navigate("/login");
        // }
    }

    // add a check to make sure profile is not null before accessing its properties
    if (!notifications) {
        return <div>Loading...</div>;
      }

    return(
        <>
            <InfiniteScroll
            dataLength={notifications.length}
            next={allnotifications}
            hasMore={true}
            >
                <div className="comments-list">
                    {notifications.length>0 && notifications.map((notification) => (
                    <div className="comment flexbox" >
                       {notification.notification_type=="like" &&
                        <p id="cmt-txt"> {notification.userId.name +" has liked your post"}</p>}
                        {notification.notification_type=="comment" &&
                        <p id="cmt-txt"> {notification.userId.name +" has commented on your post: " + notification.message}</p>}
                        
                        <p id="cmt-hd"> {"At " + formatISO9075(new Date(notification.createdAt)) }</p>
                        <Link id="cmt-hd" to={`/${notification.userId._id}`}>View User</Link>
                        <Link id="cmt-hd" to={`/post/${notification.postId}`}>View Post </Link>
                        
                    </div>
                    ))}
                </div>
            </InfiniteScroll>
        </>
    )
};

export default Notifications;