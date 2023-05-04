import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/usercontext';
import { formatISO9075 } from "date-fns";

const InteractionSection = (props) => 
{
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState("");
 

  useEffect(() => {
    const singlePost = async () => {
        let response = await fetch(`http://127.0.0.1:5000/api/v1/comments/getAll/${props.id}`,
        {
            headers:
            {
                'token': localStorage.getItem('token')
            }
        })
        let interactions = await response.json();
        // user is not authorized, navigate to login page
        if(response.status === 401)
        {
            alert("Unauthorized Access: Login Again");
            localStorage.removeItem('token');
        }
        else if(response.ok)
        {
          // console.log(interactions);
          setComments(interactions);
        }
    }
    singlePost();
}, [comments]);
  const handleSubmit = async(e) => 
  {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:5000/api/v1/comments/addComment/${props.id}`, {
        method: 'POST',
        body: JSON.stringify({authorId: props.authorId ,username: userInfo.name, comment: commentText, userId: userInfo.id}),
        headers:{'Content-Type':'application/json'},
      });
      const interactions  = await response.json();
      if(response.ok)
      {
        setComments(interactions);
        setCommentText('');
      }
  };

  const deletefn = async(id)=>{
    console.log(id);
    const response = await fetch(`http://127.0.0.1:5000/api/v1/comments/${id}`, {
        method: 'DELETE',
        headers:{'Content-Type':'application/json'},
        
      });
      const interactions  = await response.json();
      if(response.ok)
      {
        setComments(interactions);
        setCommentText('');
      }
  }

  const Editfn = async(id, content)=>{

    const updatedComment = prompt("Update your Comment",content);
    const response = await fetch(`http://127.0.0.1:5000/api/v1/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({message:updatedComment}),
        headers:{'Content-Type':'application/json'},
      });
      const interactions  = await response.json();
      if(response.ok)
      {
        setComments(interactions);
        setCommentText('');
      }
  }

  var flag = true
  return (
    <div className="comment-section">
       <form onSubmit={handleSubmit}>
        <div>
          <input type = "text" id="commentText" 
          value={commentText} onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <button type="submit">Add Comment</button>
      </form>

      <h2>Comments</h2>
      <div className="comments-list">
        {comments.length>0 && comments.map((comment) => (
          <div className="comment flexbox" >
            <input type = "text" id="cmt-txt" value = {comment.content} />
            <input type = "text" id="cmt-hd" value = {comment.username} />
            <p id="cmt-hd"> {"At " + formatISO9075(new Date(comment.createdAt)) }</p>
            {(userInfo.id === comment.userId || userInfo.id === props.authorId) 
            &&<button id='cmt-btn' onClick={() => deletefn(comment._id)}>Delete</button>} 
            {userInfo.id === comment.userId 
            &&<button id='cmt-btn' onClick={() => Editfn(comment._id, comment.content)}>Edit</button>} 
          </div>
        ))}
      </div>
    </div>
  );
}

export default InteractionSection