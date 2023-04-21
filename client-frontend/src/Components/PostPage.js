import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../context/usercontext";
import { Link, useNavigate } from 'react-router-dom';

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const singlePost = async () => {
            let response = await fetch(`http://127.0.0.1:5000/api/v1/blog/post/${id}`)
            let post = await response.json();
            setPostInfo(post);
            // console.log(postInfo);
            // console.log(userInfo)
        }
        singlePost();
    }, []);

    if (!postInfo) return '';

    // delete request
    const deletepost = (ev)=>
    {
        const fn = async()=>
        {
            let response = await fetch(`http://127.0.0.1:5000/api/v1/blog/post/${id}`,
            {
                method: 'DELETE'
            })
            let deleteMessage = await response.json();
            console.log(deleteMessage);
            navigate("/");
        }
        fn();
        
    }

    return (

        <div className="post-page">
            <h1>{postInfo.title}</h1>

            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>

            <div className="author">by @{postInfo.author}</div>

            {userInfo.id === postInfo.authorId && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        <button> Edit Post</button>
                    </Link>
                    
                    <button className="edit-btn" onClick={deletepost}> Delete Post</button>
                    
                </div>
            )}
            <div className="image">
                <img src={`http://localhost:5000/${postInfo.cover}`} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    );
}