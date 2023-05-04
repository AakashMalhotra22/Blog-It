import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/usercontext';

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null); 
    const { userInfo, setUserInfo } = useContext(UserContext);
  
    useEffect(() => {
      const fetchData = async () => {
          const response = await fetch(`http://127.0.0.1:5000/api/v1/auth/${id}`, {
            headers: {
              token: localStorage.getItem('token'),
            },
          });
          if (response.ok) {
            const data = await response.json();
            setProfile(data);
          } else {
            setUserInfo(null);
            navigate('/login');
          }
        
      };
      fetchData();
    }, [id, navigate, setUserInfo]);
  
    // add a check to make sure profile is not null before accessing its properties
    if (!profile) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="profile-page">
        <h1>{profile.name}</h1>
        <p>{profile.email}</p>
        <p>Total Likes {profile.likes}</p>
  
        <div className="image">
          <img src={`http://localhost:5000/${profile.photo}`} alt="" />
        </div>
  
        {userInfo.id === id && (
          <div className="">
            <Link className="" to={`/editprofile/${id}`}>
              <button> Edit Profile</button>
            </Link>
            <Link className="" to={`/updatePassword/${id}`}>
              <button> Change Password</button>
            </Link>
            <Link className="" to={`/savedPosts/${userInfo.id}`}>
              <button> Saved Blogs</button>
            </Link>
          </div>
        )}
        <Link className="" to={`/allPost/${id}`}>
          {userInfo.id !=id && <button> User Blogs</button>}
          {userInfo.id ==id && <button> Your Blogs</button>}
        </Link>
      </div>
    );
  };
  
export default Profile
