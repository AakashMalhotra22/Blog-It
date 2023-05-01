import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../context/usercontext";
import { Link, useNavigate } from 'react-router-dom';
import InteractionSection from "./InteractionSection";

export default function PostPage() 
{
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    // Accessing single Post
    useEffect(() => {

        const singlePost = async () => {
            let response = await fetch(`http://127.0.0.1:5000/api/v1/blog/post/${id}`,
            {
                headers:
                {
                    'token': localStorage.getItem('token')
                }
            })
            let post = await response.json();
            // user is not authorized, navigate to login page
            if(response.status === 401)
            {
                alert("Unauthorized Access: Login Again");
                localStorage.removeItem('token');
                navigate("/login")
            }
            else if(response.ok)
            {
                setPostInfo(post);
            }
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
                method: 'DELETE',
                headers:
                {
                    'token': localStorage.getItem('token')
                }
            })
            let deleteMessage = await response.json();
            if(response.status === 401)
            {
                alert("Unauthorized Access: Login Again");
                localStorage.removeItem('token');
                navigate("/login")
            }
            else if(response.ok)
            {
                navigate("/");
            }
        }
        fn();
        
    }

    return (

        <div className="post-page">
            <h1>{postInfo.title}</h1>

            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>

            <div className="author">by @{postInfo.authorId.name}</div>
            <div className="author">Likes {postInfo.likes}</div>

            {userInfo.id === postInfo.authorId._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                        <button> Edit Post</button>
                    </Link>
        
                    <button className="del-btn" onClick={deletepost}> Delete Post</button>
                    
                </div>
            )}
            <div className="image">
                <img src={`http://localhost:5000/${postInfo.cover}`} alt="" />
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            <InteractionSection id ={id} authorId ={postInfo.authorId._id}/>
        </div>
    );
}