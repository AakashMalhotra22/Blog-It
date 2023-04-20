import React from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = ()=>{
    const navigate = useNavigate();

    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
      };

    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    
    async function createNewPost(ev) 
    {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        
        const response = await fetch('http://127.0.0.1:5000/api/v1/blog/post', {
          method: 'POST',
          body: data,
          headers:
            {
                'token': localStorage.getItem('token')
            },

        });
        
        // user is not authorized, navigate to login page
        if(response.status == 401)
        {
               alert("Unauthorized Access: Login Again");
               localStorage.removeItem('token');
               navigate("/login")
        }
        // if properly works, navigate to blog page
        else if (response.status ==200) 
        {
            console.log(response.status);
          navigate("/");
        }
      }
    
    return(
        <form onSubmit = {createNewPost}>
            <input type="title" placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)} />
            <input type="summary" placeholder={'Summary'} value={summary} onChange={ev => setSummary(ev.target.value)} />
            <input type="file" onChange={ev => setFiles(ev.target.files)} />
            <ReactQuill value ={content} modules = {modules} onChange={newValue=>setContent(newValue)}/>
            <button style={{marginTop:'5px'}}>Create Post</button>
        </form>
    )
}

export default CreatePost; 