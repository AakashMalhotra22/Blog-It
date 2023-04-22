import React from 'react'
import Editor from './Editor';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => 
{
    const navigate = useNavigate();
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');

    useEffect(() => {
        
        const fn = async()=>{
            let response = await fetch(`http://127.0.0.1:5000/api/v1/blog/post/${id}`);
            let postInfo = await response.json();
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
        }
        fn();

      }, []);

      const updatePost = async(ev)=>
      {
              ev.preventDefault();
              
              const data = new FormData();
              data.set('title', title);
              data.set('summary', summary);
              data.set('content', content);
              data.set('id', id);
              if (files?.[0]) {
                data.set('file', files?.[0]);
              }
              
              const response = await fetch(`http://127.0.0.1:5000/api/v1/blog/updatepost`, {
                method: 'PUT',
                body: data,
                headers:
                    {
                        'token': localStorage.getItem('token')
                    },
              });
              const json = await response.json();
              if (response.ok) {
                navigate(`/post/${id}`)
              }  
              else if(response.status ===403 || response.status === 404 || response.status ===500)
              {
                    alert(json.msg);
              }
      }
      
    return(
        <form onSubmit = {updatePost}>
            <input type="title" placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)} />
            <input type="summary" placeholder={'Summary'} value={summary} onChange={ev => setSummary(ev.target.value)} />
            <input type="file" onChange={ev => setFiles(ev.target.files)} />
            <Editor value={content} onChange={setContent} />
            <button style={{marginTop:'5px'}}>Edit Post</button>            
        </form>
    )
}

export default EditPost
