import React from 'react'
import {useState} from 'react'
import {Navigate} from 'react-router-dom';

const LoginPage = () => {
  const[username, setusername] = useState('');
  const [password,setpassword] = useState('');
  const [redirect, setRedirect] = useState('false');

  const fn1 = (event)=>
  {
      setusername(event.target.value);
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
          body: JSON.stringify({username,password}),
          headers:{'Content-Type':'application/json'},
      })
      const json = await response.json();
      
      if(response.ok==false)
      {
          alert(json.msg);
      }
      else
      {
        localStorage.setItem('token',json.token); 
        console.log(localStorage.getItem('token'));
        setRedirect(true);
      }
  }

  if(redirect)
  {
    return <Navigate to={"/"}/>
  }

  return (
    <>
    <form className="login" onSubmit ={login}>
        <h1>Login</h1>
        <input type = "text" placeholder = "username" onChange ={fn1}/>
        <input type = "password" placeholder = "password" onChange = {fn2}/>
        <button>Login</button>
    </form>
    </>
  )
}

export default LoginPage
