import React, { useState } from "react";
import AddGroup from "./AddGroup";
import Group from "./Group";
import "./groups.css";

const Groups = ({ axiosInstance, load }) => {
	const [groups, setGroups] = useState([
		{
			title: "Developers",
			subtitle: "The group of web devs",
			icon: "akshatmittal61-group-developers.jpg",
			admin: "akshatmittal2506@gmail.com",
			description:
				"This is a group of all developers which mainly focuses on Web development but an open source community always welcomes everyone",
			members: [],
		},
	]);
	const handlegroups = (item) => {
		setGroups([...groups, item]);
		console.log(item);
		setShowAddGroupBox(false);
	};
	const [showAddGroupBox, setShowAddGroupBox] = useState(false);
	return (
		<div className="groups-container">
			<div className="groups-box">
				<div className="groups-head">
					<span>All Groups</span>
				</div>
				<div className="groups-add">
					<button
						className="aavesh-btn"
						onClick={() => setShowAddGroupBox(true)}
					>
						<span className="aavesh-btn-text">Add a new Group</span>
					</button>
				</div>
				<div className="groups-body">
					<div className="Row">
						{groups.map((group, index) => (
							<div
								className="Col-lg-50 Col-md-100 Col-sm-100"
								key={index}
							>
								<Group
									group={group}
									axiosInstance={axiosInstance}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			{showAddGroupBox && (
				<AddGroup
					close={() => setShowAddGroupBox(false)}
					save={handlegroups}
				/>
			)}
		</div>
	);
};

export default Groups;
