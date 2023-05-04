import React, {useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import {UserContext} from '../context/usercontext';

const Header = ()=>
{
    const [mainheading, setmainheading] = useState('MyBlog');
    const {userInfo, setUserInfo} = useContext(UserContext);
    const { id } = useParams();
    const location = useLocation();   
    const navigate = useNavigate();

    
    useEffect(() => {

        const pathname = location.pathname;
        if (pathname === '/') {
          setmainheading('ALL Blogs');
        }
         else if (pathname === '/popularpost') {
          setmainheading('Popular Blogs');
        } 
        else if (pathname === '/create') {
            setmainheading('Add Blog');
        }
        else if (pathname === '/notifications') {
            setmainheading('Notifications');
        }
        else if (pathname === `/${id}`) {
            setmainheading('Profile');
        }
        else if (pathname === `/login` || pathname ==`\register`) {
            setmainheading('Blog-It');
        }
        else if (pathname === `/savedPosts/${id}`) {
            setmainheading('Saved Blogs');
        }
        else if (pathname === `/allPost/${id}` && userInfo.id ==id) {
            setmainheading('Your Blogs');
        }
        else if (pathname === `/allPost/${id}` && userInfo.id !=id) {
            setmainheading('User Blogs');
        }

      }, [location]);

    // logout function
    const logout =()=>
    {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        setUserInfo(null);
        navigate('/login');
    }

    return(
        <>
            <header>
            <Link  className="logo"> {mainheading}</Link>
            <nav>
                {userInfo && (
                    <>
                    <Link to="/">Home</Link>
                    <Link to="/popularpost">Popular Blog</Link>
                    <Link to="/create">Add Blog</Link>
                    <Link to="/notifications">Notifications</Link>
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