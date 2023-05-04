import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/usercontext';
import InfiniteScroll from "react-infinite-scroll-component";
import { formatISO9075 } from "date-fns";

const InteractionSection = (props) => 
{
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [page, setPage] = useState(1);
 

  useEffect(() => {
    allcomments();
}, []);

  const allcomments = async () => {
    let response = await fetch(`http://127.0.0.1:5000/api/v1/comments/getAll/${props.id}?page=${page}`,
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
      setComments([...comments, ...interactions]);
      setPage(page+1);
    }
  }
  const handleSubmit = async(e) => 
  {
    e.preventDefault();
    // const newComment = { content: commentText, username: userInfo.name, userId: userInfo.id, postId: props.id, createdAt: Date.now() };
    // setComments([newComment, ...comments]);
    // setCommentText('');
    const response = await fetch(`http://127.0.0.1:5000/api/v1/comments/addComment/${props.id}`, {
        method: 'POST',
        body: JSON.stringify({authorId: props.authorId ,username: userInfo.name, comment: commentText, userId: userInfo.id}),
        headers:{'Content-Type':'application/json'},
      });
      const interactions  = await response.json();
      if(response.ok)
      {
        setPage(1);
        setComments([])
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
        setPage(1);
        setComments([])
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
        setPage(1);
        setComments([])
        allcomments();
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
      <InfiniteScroll
            dataLength={comments.length}
            next={allcomments}
            hasMore={true}
      >
        <div className="comments-list">
          {comments.length>0 && comments.map((comment) => (
            <div className="comment flexbox" >
              <input type = "text" id="cmt-txt" value = {comment.content} onChange={(e) => setCommentText(e.target.value)}/>
              <input type = "text" id="cmt-hd" value = {comment.username} onChange={(e) => setCommentText(e.target.value)}/>
              <p id="cmt-hd"> {"At " + formatISO9075(new Date(comment.createdAt)) }</p>
              {(userInfo.id === comment.userId || userInfo.id === props.authorId) 
              &&<button id='cmt-btn' onClick={() => deletefn(comment._id)}>Delete</button>} 
              {userInfo.id === comment.userId 
              &&<button id='cmt-btn' onClick={() => Editfn(comment._id, comment.content)}>Edit</button>} 
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default InteractionSection