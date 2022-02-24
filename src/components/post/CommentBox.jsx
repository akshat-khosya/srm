import React from "react";
import PostComment from "./PostComment";

const CommentBox = ({ liked, comments, handleLike, close }) => {
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
							<button className="post-addons-comment">
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
