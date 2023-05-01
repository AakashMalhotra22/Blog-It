import React, { useContext, useState } from "react";
import { UserContext } from '../context/usercontext';

const InteractionSection = () => 
{
  
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState(userInfo.id);
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, { name, commentText }]);
    setCommentText("");
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div className="comment" key={index}>
            <p>{comment.name}</p>
            <p>{comment.commentText}</p>
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