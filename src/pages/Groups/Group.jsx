import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import favicon from "../../Images/logo.png";
const Group = ({ job, joinedgroups, axiosInstance, load, groups }) => {
	const [contextMenu, setContextMenu] = useState(false);
	const { user } = useContext(Context);
	console.log(job);

	const isJoined = joinedgroups.includes(job._id);
	console.log(isJoined);

	// useEffect(()=>{
	// 	setsource(`${axiosInstance.defaults.baseURL}images/${job.group_image}`);
	// 	console.log(source);
	// },[`${axiosInstance.defaults.baseURL}images/${job.group_image}`]);

	let joinParam = {
		groupid: job._id,
		id: user._id
	}

	const joinGroup = async () => {

		const res = await axiosInstance.post("/api/group/addmember",joinParam);
		console.log(res);

	}

	console.log(job, typeof(job.group_tags));
	return (
		<div className="groups-group" key={job._id}>
			<div className="groups-group-head">
				<div className="groups-group-head-icon">
					<img
						// src={job.icon === "" ? favicon : job.icon}
						// alt={job.title}
						src={`${axiosInstance.defaults.baseURL}images/${job.group_image}`}
						alt={job.group_image}
					/>
				</div>
				<div className="groups-group-head-content">
					<span className="groups-group-head-content-title">
						{job.group_name}
					</span>
					<span className="groups-group-head-content-field">
						{job.group_tags}
					</span>
				</div>
				<div className="groups-group-head-showmore">
					{user.email === job.email && (
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
											href={job.file}
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
									<li className="more-item">
										<span className="material-icons">
											delete
										</span>
										<span className="more-item-label">
											Delete Job
										</span>
									</li>
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="groups-group-body">
				<div className="groups-group-body-content">
					{job.group_description}
				</div>
				{
					isJoined 
					? 
					<div className="groups-group-body-actions">
						<button className="opportunity-btn opportunity-btn-outline">
							Open
						</button>
					</div>
					:
					<div className="groups-group-body-actions">
						<button className="opportunity-btn opportunity-btn-outline">
							View Details
						</button>
						<button className="opportunity-btn" onClick={() => joinGroup()}>
							Join Group
						</button>
					</div>
				}
				
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

export default Group;
