import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterPage = ()=>
{
    const navigate = useNavigate();
    
    const [name,setname] = useState('');
    const[email, setemail] = useState('');
    const [password,setpassword] = useState('');
    const [cpassword,setcpassword] = useState('');
    const [files, setFiles] = useState('');

    const register = async (event)=>
     {
        event.preventDefault();
        if(cpassword != password)
        {
            alert("Password and confirm Password does not Match");
            return;
        }
        const data = new FormData();
        data.set('name', name);
        data.set('email', email);
        data.set('password', password);
        data.set('file', files[0]);

        let response = await fetch('http://127.0.0.1:5000/api/v1/auth/register',{
            method: 'POST',
            body: data
        })
        const json = await response.json();
        alert(json.msg);
        if(response.ok)
        {
            navigate("/login");
        }   
    }

    return (
        <>
            <form className ="register" onSubmit={register}>
                <h1>Register</h1>
                <input type = "text" placeholder = "Name" onChange={ev=> setname(ev.target.value)}/>
                <input type = "text" placeholder = "Email" onChange={ev=> setemail(ev.target.value)}/>
                <input type="file" name = "add Photo" onChange={ev => setFiles(ev.target.files)} />
                <input type = "password" placeholder = "Password" onChange={ev=> setpassword(ev.target.value)}/>
                <input type = "password" placeholder = "Confirm password" onChange={ev=> setcpassword(ev.target.value)}/>
                <button>Register</button>
            </form>
        </>

    )
}

export default RegisterPage;