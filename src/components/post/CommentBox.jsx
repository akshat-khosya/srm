import React, { useState } from "react";
import PostComment from "./PostComment";

const CommentBox = ({ liked, comments, handleLike, close, addComment }) => {
	const [commentText, setCommentText] = useState("");
	const [showAddComment, setShowAddComment] = useState(false);
	const handleChange = (e) => {
		setCommentText(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const newComment = {
			name: "Jane Doe",
			username: "jane",
			email: "jane@gmail.com",
			photo: "https://avatars.githubusercontent.com/u/84612609?v=4",
			text: commentText,
		};
		console.log(newComment);
		addComment(newComment);
		setShowAddComment(false);
		setCommentText("");
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
									src="https://pbs.twimg.com/profile_images/1456999448710504454/b4rjNopn_400x400.jpg"
									alt="Akshat Mittal"
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
						{comments.map((comment) => (
							<PostComment comment={comment} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default CommentBox;
