import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import "./post.css";

import like from "../../Images/like.png";
import SnackBar from "../Snackbar";
function Post({ posts, keys, axiosInstance, load }) {
	const loadData=async()=>{
		try {
			const sendData={
				id:posts
			}
			console.log(sendData);
			const res=await axiosInstance.post('/api/post/singlepost',sendData);
			console.log(res);
			setPost(res.data);
		} catch (err) {
			
		}
	}
	useEffect(()=>{
		loadData();
	},[])
	const { user } = useContext(Context);
	const [contextMenu, setContextMenu] = useState(false);
	const [liked, setLiked] = useState();
	const [open, setOpen] = useState(false);
	const [post,setPost]=useState({});
	const [err, setErr] = useState({
		text: "",
		err: "",
		color: "var(--red)",
	});
	const editPost = () => {
		console.log("Edit the post");
		setContextMenu(false);
	};
	const delPost = async () => {
		try {
			console.log(post._id);

			const res = await axiosInstance.delete("/api/post/", {
				data: { id: post._id },
			});
			console.log(res);
			if (res.data.status === true) {
				setOpen(true);
				setErr({
					text: res.data.message,
					err: "",
					color: "var(--green)",
				});

				setContextMenu(false);
				load();
				setTimeout(() => {
					setOpen(false);
				}, 2000);
			}
		} catch (err) {}
	};
	const handleLike = () => {
		setLiked(!liked);
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
						{user.email === post.email && (
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
										{/* <li
										className="more-item"
										onClick={() => editPost()}
									>
										<span className="material-icons">
											edit
										</span>
										<span className="more-item-label">
											Edit Post
										</span>
									</li> */}
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
						)}
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
				<div className="post-addons">
					<button
						className="post-addons-like"
						style={{
							color: liked
								? "rgb(237, 73, 86)"
								: "rgba(0, 0, 0, 0.75)",
						}}
						onClick={handleLike}
					>
						<span className="post-addons__icon">
							<span className="material-icons">
								{liked ? "favorite" : "favorite_border"}
							</span>
						</span>
						<span className="post-addons__text">
							{liked ? "Unlike" : "Like"}
						</span>
					</button>
					<button className="post-addons-comment">
						<span className="post-addons__icon">
							<span className="material-icons">comment</span>
						</span>
						<span className="post-addons__text">Comment</span>
					</button>
				</div>
			</div>
			{contextMenu && (
				<div
					className="context-menu-cover"
					onClick={() => setContextMenu(false)}
				></div>
			)}
			{open && <SnackBar text={err.text} color={err.color} />}
		</div>
	);
}

export default Post;
