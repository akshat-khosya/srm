import Post from '../post/Post'
import './posts.css'

function Posts({ posts }) {
    return (
        <div>
           {posts.map((p,index)=>(
         
          <Post keys={index} post={p} />
      ))}
        </div>
    )
}

export default Posts
