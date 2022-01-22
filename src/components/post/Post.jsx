import { useContext } from 'react'
import { Context } from '../../context/Context'
import './post.css'

import like from '../../Images/like.png'
function Post({post,keys}) {
    const {user}=useContext(Context);
    
    return (

        <div key={keys} className='Post'>
            <div className="postContainer">
                <div className="postUser">
                <div className="postUser-details">
                <div className="postProfilePhoto">
                    <img src={"https://tegniescorporation.tech/images/"+post.email} alt="" />
                </div>
                <div className="postUserName">
                    <h4>{post.author}</h4>
                    <span>{new Date(post.createdAt).toDateString()}</span>
                </div>
                </div>
                <div className="postUser-settings">
                ...
                </div>
                </div>
                {post.desc &&(
                    <div className="postInfo">
                   {post.desc}
                </div>
                )}
                {post.media && (
                    <div className="postMedia">
                    <img src={"https://tegniescorporation.tech/images/"+post.media} alt="" />
                    </div>
                )}
                
                <div className="postLike">
                    <img src={like} alt="" />
                    140 Likes 
                    
                </div> 
            </div>
        </div>
    )
}

export default Post
