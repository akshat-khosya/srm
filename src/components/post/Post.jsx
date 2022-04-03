import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import "./post.css";

import SnackBar from "../Snackbar";
import CommentBox from "./CommentBox";
function Post({ posts, keys, axiosInstance, load }) {
	const [contextMenu, setContextMenu] = useState(false);
	const [liked, setLiked] = useState({
		state: false,
		count: 0,
	});
	const [showCommentBox, setShowCommentBox] = useState(false);
	const [comments, setComments] = useState([]);
	const [noOfComments, setNoOfComments] = useState(0);
	const [open, setOpen] = useState(false);
	const [post, setPost] = useState({});
	const [err, setErr] = useState({
		text: "",
		err: "",
		color: "var(--red)",
	});
	const { user } = useContext(Context);
	const loadData = async () => {
		try {
			const sendData = {
				id: posts,
			};

			const res = await axiosInstance.post(
				"/api/post/singlepost",
				sendData
			);
			setPost(res.data);
			setLiked({
				state: res.data.likes.includes(user.email),
				count: res.data.likes.length,
			});
			setComments(res.data.comments);
			setNoOfComments(res.data.comments.length);
		} catch (err) {}
	};
	useEffect(() => {
		loadData();
	}, []);
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
		} catch (err) {
			console.log(err);
		}
		load();
	};
	const handleLike = async () => {
		if (liked.state) {
			const sendData = {
				id: posts,
				userEmail: user.email,
			};
			const res = await axiosInstance.patch("/api/post/unlike", sendData);
			if (res.data.status) {
				loadData();
			}
		} else {
			const sendData = {
				id: posts,
				userEmail: user.email,
			};
			const res = await axiosInstance.patch("/api/post/like", sendData);
			if (res.data.status) {
				loadData();
			}
		}
	};
	const handleNewComment = (a) => {
		setComments([...comments, a]);
		load();
	};

	return (
		<div key={keys} className="Post">
			<div className="postContainer">
				<div className="postUser">
					<div className="postUser-details">
						<div className="postProfilePhoto">
							<img
								src={`${axiosInstance.defaults.baseURL}images/${post.email}`}
								alt={post.email}
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
							alt={post.media}
						/>
					</div>
				)}
				<div className="post-addons">
					<button
						className="post-addons-like"
						style={{
							color: liked.state
								? "rgb(237, 73, 86)"
								: "rgba(0, 0, 0, 0.75)",
						}}
						onClick={handleLike}
					>
						<span className="post-addons__icon">
							<span className="material-icons">
								{liked.state ? "favorite" : "favorite_border"}
							</span>
						</span>
						<span className="post-addons__text">
							{`${liked.count >= 1 ? liked.count : ""} Like${
								liked.count > 1 ? "s" : ""
							}`}
						</span>
					</button>
					<button
						className="post-addons-comment"
						onClick={() => setShowCommentBox(true)}
					>
						<span className="post-addons__icon">
							<span className="material-icons">comment</span>
						</span>
						<span className="post-addons__text">
							{`${noOfComments >= 1 ? noOfComments : ""} Comment${
								noOfComments > 1 ? "s" : ""
							}`}
						</span>
					</button>
				</div>
			</div>
			{showCommentBox && (
				<CommentBox
					load={loadData}
					id={post._id}
					axiosInstance={axiosInstance}
					liked={liked}
					handleLike={handleLike}
					comments={comments}
					close={() => setShowCommentBox(false)}
					addComment={handleNewComment}
				/>
			)}
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
