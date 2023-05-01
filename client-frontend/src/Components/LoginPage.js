import React from 'react'
import {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../context/usercontext';

const LoginPage = () => {
  
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password,setpassword] = useState('');

  const {userInfo, setUserInfo} = useContext(UserContext);

  const fn1 = (event)=>
  {
      setemail(event.target.value);
  }
  const fn2 = (event)=>
  {
      setpassword(event.target.value);
  }
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
        setUserInfo({'token': localStorage.getItem('token'), 'id': json.id});
        navigate("/");
      }
  }

  return (
    <>
    <form className="login" onSubmit ={login}>
        <h1>Login</h1>
        <input type = "text" placeholder = "email" onChange ={fn1}/>
        <input type = "password" placeholder = "password" onChange = {fn2}/>
        <button>Login</button>
    </form>
    </>
  )
}

export default LoginPage
