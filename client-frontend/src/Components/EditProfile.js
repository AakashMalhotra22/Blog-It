import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProfile = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [name,setname] = useState('');
    const [files, setFiles] = useState('');

    //Accessing the profile before Editing
    useEffect(() => 
    {
        
        const fn = async()=>{
            let response = await fetch(`http://127.0.0.1:5000/api/v1/auth/${id}`,{
              headers:
              {
                  'token': localStorage.getItem('token')
              },
            });
            let user = await response.json();
            
            if(response.status === 401)
            {
                  alert("Unauthorized Access: Login Again");
                  localStorage.removeItem('token');
                  navigate("/login")
            }
            setname(user.name);
        }
        fn();

      }, []);

    const updateprofile = async (event)=>
     {
        event.preventDefault();

        const data = new FormData();
        data.set('name', name);
        data.set('file', files[0]);

        // console.log(data.file);

        console.log(files[0]);
        let response = await fetch(`http://127.0.0.1:5000/api/v1/auth/update/${id}`,{
            method: 'POST',
            body: data
        })
        const json = await response.json();
        alert(json.msg);
        if(response.ok)
        {
            navigate("/");
        }   
    }


  return (
    <>
        <form className ="register" onSubmit={updateprofile}>
            <h1>Edit Name and Profile Photo</h1>
            <input type = "text" placeholder = "New Name" value={name} onChange={ev=> setname(ev.target.value)}/>
             <input type="file" name = "add Photo" onChange={ev => setFiles(ev.target.files)} />
            <button>Update Profile</button>
        </form>
    </>
  )
}

export default EditProfile
