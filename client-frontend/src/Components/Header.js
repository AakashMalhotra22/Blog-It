import React from 'react';
import { Link } from 'react-router-dom';

const Header = ()=>{
    return(
        <>
            <header>
            <a href="" className="logo"> MyBlog</a>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
            </header>
            
        </>
    )
};

export default Header;