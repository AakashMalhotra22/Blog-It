import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePassword = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [oldpassword,setoldpassword] = useState('');
    const [password,setpassword] = useState('');
    const [cpassword,setcpassword] = useState('');

    const updatepassword = async (event)=>
    {
       event.preventDefault();
       if(cpassword != password)
        {
            alert("new Password and confirm new Password does not Match");
            return;
        }        
      //  console.log(oldpassword)
       let response = await fetch(`http://127.0.0.1:5000/api/v1/auth/updatepassword/${id}`,{
           method: 'POST',
           body: JSON.stringify({oldpassword,password}),
           headers:{'Content-Type':'application/json'},
       })
       const json = await response.json();
       alert(json.msg);
       if(response.ok)
       {
           navigate("/");
       }   
   }



  return (
    <div>
        <form className ="register" onSubmit={updatepassword}>
            <h1>Update Password</h1>
                <input type = "password" placeholder = "Old password" onChange={ev=> setoldpassword(ev.target.value)}/>
                <input type = "password" placeholder = "New Password" onChange={ev=> setpassword(ev.target.value)}/>
                <input type = "password" placeholder = "Confirm password" onChange={ev=> setcpassword(ev.target.value)}/>
            <button>Update Profile</button>
        </form>
    </div>
  )
}

export default UpdatePassword
