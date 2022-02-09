import Post from '../post/Post'
import './posts.css'

function Posts({ posts,axiosInstance,load }) {
    return (
        <div>
           {posts.map((p,index)=>(
         
          <Post load={()=>{load()}} key={index} keys={index} post={p} axiosInstance={axiosInstance} />
      ))}
        </div>
    )
}

export default Posts
