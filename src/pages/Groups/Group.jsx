import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import favicon from "../../Images/logo.png";
import SnackBar from "../../components/Snackbar";
const Group = ({ job, axiosInstance, load }) => {
	const [contextMenu, setContextMenu] = useState(false);
	const { user } = useContext(Context);
	return (
		<div className="groups-group">
			<div className="groups-group-head">
				<div className="groups-group-head-icon">
					<img
						src={job.icon === "" ? favicon : job.icon}
						alt={job.title}
					/>
				</div>
				<div className="groups-group-head-content">
					<span className="groups-group-head-content-title">
						{job.title}
					</span>
					<span className="groups-group-head-content-field">
						{job.subtitle}
					</span>
					{/* <span className="groups-group-head-content-department">
						{job.department}
					</span> */}
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
					{job.description}
				</div>
				<div className="groups-group-body-actions">
					<button className="opportunity-btn opportunity-btn-outline">
						{/* <a href={job.file} target="_blank" rel="noreferrer"> */}
						View Details
						{/* </a> */}
					</button>
					<button className="opportunity-btn">
						{/* <a href={job.link} target="_blank" rel="noreferrer"> */}
						Join Group
						{/* </a> */}
					</button>
				</div>
			</div>
			{contextMenu && (
				<div
					className="context-menu-cover"
					onClick={() => setContextMenu(false)}
				></div>
			)}
			{/* {open && <SnackBar text={err.text} color={err.color} />} */}
		</div>
	);
};

export default Group;
