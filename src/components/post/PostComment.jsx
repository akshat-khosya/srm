import React, { useState } from "react";

const PostComment = ({ comment }) => {
	const [readMore, setReadMore] = useState(false);
	return (
		<div className="post-comment-popup-comment">
			<div className="post-comment-popup-comment-photo">
				<img src={comment.photo} alt={comment.username} />
			</div>
			<div className="post-comment-popup-comment-content">
				<span className="post-comment-popup-comment-content__name">
					{comment.name}
				</span>
				<span className="post-comment-popup-comment-content__text">
					{comment.text.length > 100 ? (
						<>
							{comment.text.slice(
								0,
								readMore ? comment.text.length : 100
							)}
							{!readMore && <>...</>}
							<span onClick={() => setReadMore(!readMore)}>
								Read {readMore ? "Less" : "More"}
							</span>
						</>
					) : (
						<>{comment.text}</>
					)}
				</span>
			</div>
		</div>
	);
};

export default PostComment;
