import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./post.css";

import like from "../../Images/like.png";
function Post({ post, keys, axiosInstance }) {
	const { user } = useContext(Context);
	const [contextMenu, setContextMenu] = useState(false);
	const editPost = () => {
		console.log("Edit the post");
		setContextMenu(false);
	};
	const delPost = () => {
		console.log("Delete the post");
		setContextMenu(false);
	};

	return (
		<div key={keys} className="Post">
			<div className="postContainer">
				<div className="postUser">
					<div className="postUser-details">
						<div className="postProfilePhoto">
							<img
								src={`${axiosInstance.defaults.baseURL}images/${post.email}`}
								alt=""
							/>
						</div>
						<div className="postUserName">
							<h4>{post.author}</h4>
							<span>
								{new Date(post.createdAt).toDateString()}
							</span>
						</div>
					</div>
					<div className="postUser-settings">
						<div className="more-context">
							<button
								className="icon more-icon"
								onClick={() => setContextMenu(!contextMenu)}
							>
								<span className="material-icons">
									more_horiz
								</span>
							</button>
							<input
								type="checkbox"
								checked={contextMenu}
								name="openContextMenu"
								onChange={() => console.log("Changed")}
							/>
							<div className="more-popup">
								<ul className="more-list">
									<li
										className="more-item"
										onClick={() => editPost()}
									>
										<span className="material-icons">
											edit
										</span>
										<span className="more-item-label">
											Edit Post
										</span>
									</li>
									<li
										className="more-item"
										onClick={() => delPost()}
									>
										<span className="material-icons">
											delete
										</span>
										<span className="more-item-label">
											Delete Post
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				{post.desc && <div className="postInfo">{post.desc}</div>}
				{post.media && (
					<div className="postMedia">
						<img
							src={`${axiosInstance.defaults.baseURL}images/${post.media}`}
							alt=""
						/>
					</div>
				)}

				<div className="postLike">
					<img src={like} alt="" />
					140 Likes
				</div>
			</div>
			{contextMenu && (
				<div
					className="context-menu-cover"
					onClick={() => setContextMenu(false)}
				></div>
			)}
		</div>
	);
}

export default Post;
