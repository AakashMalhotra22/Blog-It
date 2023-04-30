import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/usercontext';

const Profile = () => {
  //Accessing all the post for the Main page
  const {id} = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState('');
  const {userInfo, setUserInfo} = useContext(UserContext);

  useEffect( ()=>
  {
      const allposts = async()=>
      {
          let response = await fetch(`http://127.0.0.1:5000/api/v1/auth/${id}`,
          {
              headers:
              {
                  'token': localStorage.getItem('token')
              },
          })
          if(response.ok)
          {
              let data = await response.json();
              setProfile(data);
          }
          else
          {
              setUserInfo(null);
              navigate("/login");
          }
      }
      allposts();
  },[]) 
  return (
    <div className="profile-page">
            <h1>{profile.name}</h1>
            <p>{profile.email}</p>
            <p>Total Likes {profile.likes}</p>
            <p>Total Interactions {profile.interactions}</p>

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
                </div>
            )}
            <Link className="" to={`/allPost/${id}`}> <button> ALL Post</button> </Link>


        </div>
  )
}

export default Profile
