import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/usercontext';

const InteractionSection = (props) => 
{
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState("");


  useEffect(() => {
    const singlePost = async () => {
        let response = await fetch(`http://127.0.0.1:5000/api/v1/blog/comments/${props.id}`,
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
          setComments(interactions);
        }
    }
    singlePost();
}, []);
  const handleSubmit = async(e) => 
  {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:5000/api/v1/blog/addcomment/${props.id}`, {
        method: 'PUT',
        body: JSON.stringify({username: userInfo.name, comment: commentText, userId: userInfo.id}),
        headers:{'Content-Type':'application/json'},
      });
      const interactions   = await response.json();
      if(response.ok)
      {
        setComments(interactions);
        setCommentText('');
      }
  };

  var flag = true
  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <div className="comments-list">
        {comments.length>0 && comments.map((comment) => (
          <div className="comment flexbox" >
            <input type = "text" id="cmt-txt" value = {comment.comment} />
            <input type = "text" id="cmt-hd" value = {comment.username} />
            {/* {(userInfo.id === comment.userId | userInfo.id === props.authorId) &&<button disabled = {flag} id='cmt-btn'>Delete</button>} */}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <input type = "text" id="commentText" 
          value={commentText} onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <button type="submit">Add Comment</button>
      </form>

    </div>
  );
}

export default InteractionSection