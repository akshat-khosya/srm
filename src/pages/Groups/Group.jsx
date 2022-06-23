import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import favicon from "../../Images/logo.png";
import AddUsers from "./AddUsers";
const Group = ({ job, axiosInstance, load, groups }) => {
	const [contextMenu, setContextMenu] = useState(false);
	const [openAddUsers, setOpenAddUsers] = useState(false);
	const { user } = useContext(Context);
	// console.log(job);

	// const isJoined = joinedgroups.includes(job._id);
	// console.log(isJoined);
	console.log(user);
	console.log(user.group_joined.includes(job._id));
	console.log(user.groupOwns.includes(job._id));

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

	// console.log(job, typeof(job.group_tags));
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
				{/* <div className="groups-group-head-add">
					
				</div> */}
				{/* <div className="groups-group-head-showmore">
					{user.email === group.email && (
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
											href={group.file}
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
											Delete group
										</span>
									</li>
								</ul>
							</div>
						</div>
					)}
				</div> */}
			</div>
			<div className="groups-group-body">
				<div className="groups-group-body-content">
					{job.group_description}
				</div>
				{
					user.group_joined.includes(job._id)
					? 
					<div className="groups-group-body-actions">
						<button className="opportunity-btn opportunity-btn-outline">
							Open
						</button>
						{
							user.groupOwns.includes(job._id)
							?
							<button className="opportunity-btn" onClick={() => setOpenAddUsers(true)}>
								Add Member
							</button>
							:
							<></>
						}
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
			{openAddUsers && <AddUsers jobId = {job._id} axiosInstancee = {axiosInstance} close={() => setOpenAddUsers(false)} />}
		</div>
	);
};

export default Group;
