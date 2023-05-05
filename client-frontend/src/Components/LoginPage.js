import React from 'react'
import {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../context/usercontext';

const LoginPage = () => 
{  
  const navigate = useNavigate();
  const {setUserInfo} = useContext(UserContext);
  const [email, setemail] = useState('');
  const [password,setpassword] = useState('');

  const login = async (event)=>
   {
      event.preventDefault();
      let response = await fetch('http://127.0.0.1:5000/api/v1/auth/login',{
          method: 'POST',
          body: JSON.stringify({email,password}),
          headers:{'Content-Type':'application/json'},
      })
      const json = await response.json();
      
      if(response.ok===false)
      {
          alert(json.msg);
      }
      else
      {
        localStorage.setItem('token',json.token);
        localStorage.setItem('id', json.id);
        localStorage.setItem('name', json.user.name);
        setUserInfo({'token': localStorage.getItem('token'), 'id': json.id, 'name': json.user.name});
        navigate("/");
      }
  }

  return (
    <>
    <form className="login" onSubmit ={login}>
        <h1>Login</h1>
        <input type = "text" placeholder = "email" onChange ={(e)=> setemail(e.target.value)}/>
        <input type = "password" placeholder = "password" onChange = {(e)=>setpassword(e.target.value)}/>
        <button>Login</button>
    </form>
    </>
  )
}

export default LoginPage
