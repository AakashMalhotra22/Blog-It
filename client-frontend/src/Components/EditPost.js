import React from 'react'
import Editor from './Editor';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => 
{
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');

    useEffect(() => {
        
        const fn = async()=>{
            let response = await fetch('http://localhost:5000/post/'+id);
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
  
              // const response = await fetch('http://localhost:4000/post', {
              //   method: 'PUT',
              //   body: data,
              //   credentials: 'include',
              // });
              // if (response.ok) {
              //   setRedirect(true);
              // }  
      }
      
    return(
        <form onSubmit = {updatePost}>
            <input type="title" placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)} />
            <input type="summary" placeholder={'Summary'} value={summary} onChange={ev => setSummary(ev.target.value)} />
            <input type="file" onChange={ev => setFiles(ev.target.files)} />
            <Editor value={content} onChange={setContent} />
            <button style={{marginTop:'5px'}}>Create Post</button>            
        </form>
    )
}

export default EditPost
