import Post from "../post/Post";
import "./posts.css";

function Posts({ posts, axiosInstance }) {
	return (
		<div>
			{posts.map((p, index) => (
				<Post post={p} axiosInstance={axiosInstance} key={index} />
			))}
		</div>
	);
}

export default Posts;
