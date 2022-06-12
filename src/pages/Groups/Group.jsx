import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import groupFallbackIcon from "../../Images/group_icon.svg";

const Group = ({ group, axiosInstance, load }) => {
	const [contextMenu, setContextMenu] = useState(false);
	const { user } = useContext(Context);
	const [groupIcon, setGroupIcon] = useState(group.icon);
	useEffect(() => {
		console.log(group.icon);
	}, []);

	return (
		<div className="groups-group">
			<div className="groups-group-head">
				<div className="groups-group-head-icon">
					<img
						src={`${axiosInstance.defaults.baseURL}images/${groupIcon}`}
						alt={group.title}
						onError={() => {
							setGroupIcon(groupFallbackIcon);
						}}
					/>
				</div>
				<div className="groups-group-head-content">
					<span className="groups-group-head-content-title">
						{group.title}
					</span>
					<span className="groups-group-head-content-field">
						{group.subtitle}
					</span>
				</div>
				<div className="groups-group-head-showmore">
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
				</div>
			</div>
			<div className="groups-group-body">
				<div className="groups-group-body-content">
					{group.description}
				</div>
				<div className="groups-group-body-actions">
					<button className="opportunity-btn opportunity-btn-outline">
						View Details
					</button>
					<button className="opportunity-btn">Join Group</button>
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

export default Group;
