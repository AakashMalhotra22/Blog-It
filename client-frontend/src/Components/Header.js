import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import {UserContext} from '../context/usercontext';

const Header = ()=>
{
    const {userInfo, setUserInfo} = useContext(UserContext);
   
    const navigate = useNavigate();

    // useEffect(()=>
    // {
    //     setUserInfo({'token': localStorage.getItem('token')});
    // },[])

    const logout =()=>
    {
        localStorage.removeItem('token');
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
                    <Link to="/create">create new post</Link>
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