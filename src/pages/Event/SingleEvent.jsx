import React from "react";
import { Link } from "react-router-dom";

function SingleEvent({ event, axiosInstance, openEvent }) {
	return (
		<>
			{event.map((e, index) => (
				<div className="post" key={index}>
					{e.photo && (
						<img
							src={`${axiosInstance.defaults.baseURL}/images/${e.photo}`}
							alt=""
							className="postImg"
						/>
					)}

					<div className="postInfo">
						<div className="postcats">
							<span className="postCat">{e.category1}</span>
							<span className="postCat">{e.category2}</span>
						</div>
						<div className="postTile-Date">
							<span
								className="postTitle"
								onClick={() => openEvent(e)}
							>
								{e.title}
							</span>

							<hr />
							<span className="postDate">{e.date}</span>
						</div>
					</div>
					<p className="postDesc">{e.desc}</p>
				</div>
			))}
		</>
	);
}

export default SingleEvent;
