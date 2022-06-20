import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import AddGroup from "./AddGroup";
import Group from "./Group";
import "./groups.css";

// 180 to rishi

const Groups = ({ axiosInstance, load }) => {
	const {user} = useContext(Context);
	const [groups, setGroups] = useState([]);
	const [joinedgroups, setJoinedGroups] = useState([]);
	console.log(groups);
	console.log(user._id);
	const groupjoined = {
		id: user._id
	}
	console.log(groupjoined.id);
	useEffect(async () => {
		const res = await axiosInstance.get("/api/group/publicgroups");
		const res2 = await axiosInstance.post("/api/group/joined",groupjoined);
		setGroups(res.data);
		setJoinedGroups(res2.data);
		console.log(res2.data);
		console.log(res.data);
	},[]);

	const handlegroups = async(item) => {
		setGroups([...groups, item]);
		console.log(item);
		
		// setGroups(res);
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
									job={job}
									joinedgroups={joinedgroups}
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
					axiosInstance = {axiosInstance}
				/>
			)}
		</div>
	);
};

export default Groups;
