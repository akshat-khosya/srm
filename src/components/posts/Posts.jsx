import Post from '../post/Post'
import './posts.css'

function Posts({ posts,axiosInstance }) {
    return (
        <div>
           {posts.map((p,index)=>(
         
          <Post keys={index} post={p} axiosInstance={axiosInstance} />
      ))}
        </div>
    )
}

export default Posts
