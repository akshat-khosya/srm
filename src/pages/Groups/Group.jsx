import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import groupFallbackIcon from "../../Images/group_icon.svg";
import AddUsers from "./AddUsers";
import _ from "lodash";

const Group = ({ group, axiosInstance, load }) => {
	const navigate = useNavigate();
	const [contextMenu, setContextMenu] = useState(false);
	const { user } = useContext(Context);
	const [openAddUsers, setOpenAddUsers] = useState(false);
	const [groupIcon, setGroupIcon] = useState(
		`https://tegniescorporation.tech/images/${group.icon}`
	);

	return (
		<div className="groups-group">
			<div className="groups-group-head">
				<div className="groups-group-head-icon">
					<img
						src={groupIcon}
						alt={group.title}
						onError={() => {
							setGroupIcon(groupFallbackIcon);
						}}
						onClick={() =>
							navigate(`/group/${_.kebabCase(group.title)}`)
						}
					/>
				</div>
				<div className="groups-group-head-content">
					<Link
						to={`/group/${_.kebabCase(group.title)}`}
						className="groups-group-head-content-title"
					>
						{group.title}
					</Link>
					<span className="groups-group-head-content-field">
						{group.subtitle}
					</span>
				</div>
				<div className="groups-group-head-add">
					<button
						className="icon"
						onClick={() => setOpenAddUsers(true)}
					>
						<span className="material-icons">person_add</span>
					</button>
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
			{openAddUsers && <AddUsers close={() => setOpenAddUsers(false)} />}
		</div>
	);
};

export default Group;
