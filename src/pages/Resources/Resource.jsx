
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";

const Resource = ({ resource,axiosInstance,load }) => {
	const {user}=useContext(Context);
	const [contextMenu, setContextMenu] = useState(false);
	const editResource = () => {
		console.log("Edit the Scholarship");
		setContextMenu(false);
	};
	const delResource = async() => {
		try {
			const res=await axiosInstance.delete("/api/resource/",{data:{id:resource._id}});
			console.log(res);
			if(res.data.status===true){
				load();
				setContextMenu(false);
			}
		} catch (err) {
			
		}
		
	};
	const getIcon = (a) => {
		if (a === "pdf") return "picture_as_pdf";
		else if (
			a === "image" ||
			a === "img" ||
			a === "jpg" ||
			a === "gif" ||
			a === "png" ||
			a === "jpeg"
		)
			return "image";
		else if (
			a === "video" ||
			a === "vid" ||
			a === "mp4" ||
			a === "webm" ||
			a === "mkv" ||
			a === "avi" ||
			a === "m4v"
		)
			return "movie";
		else if (a === "mp3" || a === "wav" || a === "aac") return "music_note";
		else if (a === "doc" || a === "docx") return "article";
		else return "attachment";
	};
	return (
		<div className="resources-resource">
			<div className="resources-resource-box">
				<div className="resources-resource-head">
					<div className="resources-resource-head-content">
						<span>{resource.title}</span>
						<span>{resource.date}</span>
					</div>
					<div className="resources-resource-head-context">
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
									<li className="more-item">
										<a
											target="_blank"
											href={`${axiosInstance.defaults.baseURL}pdf/${resource.file}`}
											rel="noreferrer"
										>
											<span className="material-icons">
												visibility
											</span>
											<span className="more-item-label">
												View Details
											</span>
										</a>
									</li>
									{/* <li
										className="more-item"
										onClick={() => editResource()}
									>
										<span className="material-icons">
											edit
										</span>
										<span className="more-item-label">
											Edit Resource
										</span>
									</li> */}
									{user.email===resource.email && (
										<li
										className="more-item"
										onClick={() => delResource()}
									>
										<span className="material-icons">
											delete
										</span>
										<span className="more-item-label">
											Delete Resource
										</span>
									</li>
									)}
									
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="resources-resource-body">
					<div className="resources-resource-body-content">
						{resource.content.slice(0, 200)}
						{resource.content.length > 100 && <>...</>}
					</div>
					<div className="resources-resource-body-link">
						<i>Link: </i>
						<a
							href={resource.link}
							target="_blank"
							rel="noreferrer"
						>
							<span
								className="material-icons"
								style={{ color: "black" }}
							>
								link
							</span>
							<span>{resource.link.slice(0, 25)}</span>
						</a>
					</div>
					<div className="resources-resource-body-file">
						<i>Attached File: </i>
						<a
							href={resource.fileLink}
							target="_blank"
							rel="noreferrer"
						>
							<span
								className="material-icons"
								style={{ color: "red" }}
							>
								{getIcon(resource.fileType)}
							</span>
							<span>{resource.fileTitle.slice(0, 25)}</span>
						</a>
					</div>
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
};

export default Resource;
