import React, {useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {UserContext} from '../context/usercontext';

const Header = ()=>
{
    const {userInfo, setUserInfo} = useContext(UserContext);   
    const navigate = useNavigate();

    useEffect(()=>
    {
          const token = localStorage.getItem('token');
          const id = localStorage.getItem('id');
          const savedPost = localStorage.getItem('savedPost');
          console.log("header"+savedPost);
          if(token==null)
          {
            setUserInfo(null);
            navigate('/login');
          }
          else 
          {
            setUserInfo({'token': token, 'id': id, 'savedPost': savedPost});
            console.log(userInfo);
          }
    },[])

    // logout function
    const logout =()=>
    {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('savedPost');
        setUserInfo(null);
        navigate('/login');
    }

    return(
        <>
            <header>
            <Link to="/" className="logo"> MyBlog</Link>
            <nav>
                {userInfo && (
                    <>
                    <Link to="/">Home</Link>
                    <Link to="/popularpost">Popular Post</Link>
                    <Link to="/create">Add Post</Link>
                    <Link to={`/${userInfo.id}`}>My Profile</Link>
                    <a onClick={logout}>Logout</a>
                    </>
                )}
                {!userInfo &&(
                    <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
            </header>
            
        </>
    )
};

export default Header;