import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import SnackBar from "../Snackbar";

const PostComment = ({ id, comment, axiosInstance, load }) => {
	const { user } = useContext(Context);
	console.log(comment);
	const delComment = async () => {
		const sendData = {
			id: id,
			userComment: comment,
		};
		console.log(comment);
		const res = await axiosInstance.patch(
			"/api/post/uncomments/",
			sendData
		);
		if (res.data.status) {
			load();
		} else {
			console.log("Failed");
		}
	};
	const [readMore, setReadMore] = useState(false);
	return (
		<div className="post-comment-popup-comment">
			<div className="post-comment-popup-comment-photo">
				<img
					src={`${axiosInstance.defaults.baseURL}images/${comment.email}`}
					alt={comment.name}
				/>
			</div>
			<div className="post-comment-popup-comment-content">
				<span className="post-comment-popup-comment-content__name">
					{comment.name}
					{comment.email === user.email && (
						<button className="icon" onClick={delComment}>
							<span className="material-icons">delete</span>
						</button>
					)}
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
