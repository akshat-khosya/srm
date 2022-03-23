import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import PostComment from "./PostComment";
import SnackBar from "../Snackbar";

const CommentBox = ({
	id,
	load,
	liked,
	comments,
	handleLike,
	close,
	addComment,
	axiosInstance,
}) => {
	const { user } = useContext(Context);
	const [commentText, setCommentText] = useState("");
	const [showAddComment, setShowAddComment] = useState(false);
	const [open, setOpen] = useState(false);
	const [snack, setSnack] = useState({
		text: "",
		color: "transparent",
	});
	const handleChange = (e) => {
		setCommentText(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const sendData = {
			id: id,
			userComment: {
				email: user.email,
				name: user.name,
				text: commentText,
			},
		};
		const res = await axiosInstance.patch("/api/post/comments/", sendData);
		if (res.data.status) {
			load();
			setShowAddComment(false);
			setCommentText("");
			setOpen(true);
			setSnack({
				text: "Comment posted successfuly",
				color: "var(--green)",
			});
			setOpen(true);
			setTimeout(() => {
				setOpen(false);
			}, 2500);
		} else {
			console.log(res);
		}
	};
	const snackOnDel = (status) => {
		if (status) {
			setSnack({
				text: "Comment deleted successfuly",
				color: "var(--green)",
			});
			setOpen(true);
			setTimeout(() => {
				setOpen(false);
			}, 2500);
		} else {
			setSnack({
				text: "Couldn't delete comment",
				color: "var(--red)",
			});
			setOpen(true);
			setTimeout(() => {
				setOpen(false);
			}, 2500);
		}
	};
	return (
		<section className="post-comment-popup">
			<div className="post-comment-popup-box" data-aos="zoom-in">
				<div className="post-comment-popup-head">
					<button
						className="icon post-comment-popup-head-close"
						onClick={close}
					>
						<span className="material-icons">close</span>
					</button>
				</div>
				<div className="post-comment-popup-body">
					<div className="post-comment-popup-body-top">
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
										{liked.state
											? "favorite"
											: "favorite_border"}
									</span>
								</span>
								<span className="post-addons__text">
									{`${
										liked.count >= 1 ? liked.count : ""
									} Like${liked.count > 1 ? "s" : ""}`}
								</span>
							</button>
							<button
								className="post-addons-comment"
								onClick={() =>
									setShowAddComment(!showAddComment)
								}
							>
								<span className="post-addons__icon">
									<span className="material-icons">
										comment
									</span>
								</span>
								<span className="post-addons__text">
									Add a Comment
								</span>
							</button>
						</div>
					</div>
					{showAddComment && (
						<div className="post-comment-popup-body-form">
							<div className="post-comment-popup-body-form-image">
								<img
									src={`${axiosInstance.defaults.baseURL}images/${user.email}`}
									alt={user.name}
								/>
							</div>
							<div className="post-comment-popup-body-form-form">
								<form onSubmit={handleSubmit}>
									<textarea
										value={commentText}
										onChange={handleChange}
										rows="5"
										placeholder="Your comment here"
									></textarea>
									<div className="buttons">
										<button
											className="btn btn-outline"
											onClick={() =>
												setShowAddComment(false)
											}
										>
											Cancel
										</button>
										<button
											type="submit"
											className={`btn ${
												commentText.length > 0
													? ""
													: "btn-outline"
											}`}
											disabled={commentText.length <= 0}
										>
											Post
										</button>
									</div>
								</form>
							</div>
						</div>
					)}
					<div className="post-comment-popup-body-content">
						{comments.map((comment, index) => (
							<PostComment
								load={load}
								id={id}
								index={index}
								axiosInstance={axiosInstance}
								comment={comment}
								snackOnDel={snackOnDel}
							/>
						))}
					</div>
				</div>
			</div>
			{open && <SnackBar text={snack.text} color={snack.color} />}
		</section>
	);
};

export default CommentBox;
