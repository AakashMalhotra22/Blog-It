import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/usercontext';
import InfiniteScroll from "react-infinite-scroll-component";
import { formatISO9075 } from "date-fns";

const InteractionSection = (props) => 
{
  const {userInfo} = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [page, setPage] = useState(1);
 
  useEffect(() => {
    allcomments();
  }, []);

  // Accessing all the comments
  const allcomments = async () => {
    let response = await fetch(`http://127.0.0.1:5000/api/v1/comments/getAll/${props.id}?page=${page}`,
    {
        headers:{ 'token': localStorage.getItem('token') }
    })
    let interactions = await response.json();
    if(response.ok)
    {
      if (page === 1) 
      {
        // if it's the first page, set the interactions as the new comments
        setComments(interactions);
      } 
      else 
      {
        // else concatenate the existing comments with the new ones
        setComments([...comments, ...interactions]);
      }
      setPage(page + 1);
    }
  }

  const addComment = async(e) => 
  {
    e.preventDefault();
    
    const response = await fetch(`http://127.0.0.1:5000/api/v1/comments/addComment/${props.id}`, {
        method: 'POST',
        body: JSON.stringify({authorId: props.authorId ,username: userInfo.name, comment: commentText, userId: userInfo.id}),
        headers:{'Content-Type':'application/json',
                  'token': localStorage.getItem('token')},
      });
      const newcomment  = await response.json();
      if(response.ok)
      {
        setPage(1);
        setCommentText('');
        setComments([newcomment,...comments]);    
      }
  };

  const deletefn = async(id)=>{
    const response = await fetch(`http://127.0.0.1:5000/api/v1/comments/${id}`, {
        method: 'DELETE',
        headers:{'Content-Type':'application/json',
                 'token': localStorage.getItem('token')},
      });

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
        headers:{'Content-Type':'application/json',
                  'token': localStorage.getItem('token')},
      });
      if(response.ok)
      {
        setPage(1);
        setComments([])
        setCommentText('');
      }
  }

  if (!comments) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comment-section">
       <form onSubmit={addComment}>
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
          {comments.length>0 && comments.map((comment, index) => (
            
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
      </InfiniteScroll>
    </div>
  );
}

export default InteractionSection