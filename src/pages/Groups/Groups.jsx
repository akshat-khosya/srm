import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import AddGroup from "./AddGroup";
import Group from "./Group";
import "./groups.css";

// 180 to rishi

const Groups = ({ axiosInstance, load }) => {
	const {user} = useContext(Context);
	const [groups, setGroups] = useState({});
	const [refetch,setRefetch] = useState(false);
	// console.log(groups.allpublic);
	console.log(user._id);
	const groupjoined = {
		id: user._id
	}
	console.log(groupjoined.id);

	async function fetchGroups(){
		const res = await axiosInstance.post("/api/group/publicgroups",{"userid":user._id});
		console.log(res);
		setGroups(res.data);
		// console.log(groups);
		return res
	}
	
	useEffect(() => {
		fetchGroups();
		console.log(groups);
	},[refetch]);

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
					{groups?.allpublic?.map((group, index) => (
							<div
								className="Col-lg-50 Col-md-100 Col-sm-100"
								key={index}
							>
								<Group
									job={group}
									axiosInstance={axiosInstance}
									joined_read={groups?.joined_read[0]?.read?.find(o=>o.group_id === group._id)}
									total_real={groups?.total_real?.find(o=>o._id === group._id)}
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
					setrefetch = {setRefetch}
					refetch = {refetch}
				/>
			)}
		</div>
	);
};

export default Groups;
