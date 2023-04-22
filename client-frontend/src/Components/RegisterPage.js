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
        console.log(response.status);
        if(response.ok)
        {
            alert(json.message);
        }
        else if(response.status == 403)
        {
            console.log(json.errors);
            console.log(json.errors[0].path);
            if(json.errors[0].path == "username")
            {
                alert("username should be of atleast 3 characters");
            }
            else
            {
                alert("Password should be of atleast 8 characters");
            }
        }
        else
        {
            alert(json.msg);
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