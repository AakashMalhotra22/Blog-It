import React from 'react';
import { useState } from 'react';


const RegisterPage = ()=>{
    const[username, setusername] = useState('');
    const [password,setpassword] = useState('');

    const fn1 = (event)=>
    {
        setusername(event.target.value);
    }
    const fn2 = (event)=>
    {
        setpassword(event.target.value);
    }
    const register = async (event)=>
     {
        event.preventDefault();

        let response = await fetch('http://127.0.0.1:5000/api/v1/auth/register',{
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
            alert(json.message);
        }
    }

    return (
        <>
            <form className ="register" onSubmit={register}>
                <h1>Register</h1>
                <input type = "text" placeholder = "username" onChange={fn1}/>
                <input type = "password" placeholder = "password" onChange={fn2}/>
                <button>Register</button>
            </form>
        </>

    )
}

export default RegisterPage;