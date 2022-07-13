import "./home.css";
import { useState, useEffect } from "react";
import Write from "../../components/Write/Write";
import Post from "../../components/post/Post";

function Home({ axiosInstance }) {
	const [posts, setPosts] = useState([]);
	const loadPost = async () => {
		try {
			const data = await axiosInstance.get("/api/post");
			console.log(data);
			setPosts(data.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		loadPost();
	}, []);
	return (
		<div className="home">
			<div className="home-main">
				<div className="home-container">
					<div className="posts">
						<Write load={loadPost} axiosInstance={axiosInstance} />
						{posts.map((p, index) => (
							<Post
								key={index}
								posts={p}
								axiosInstance={axiosInstance}
								load={() => {
									loadPost();
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
