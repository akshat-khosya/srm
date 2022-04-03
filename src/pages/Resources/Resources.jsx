import React, { useEffect, useState } from "react";
import AddResource from "./AddResource";
import Resource from "./Resource";
import "./resources.css";

const Resources = ({ axiosInstance }) => {
	const [resources, setResources] = useState([]);
	const [showAddResourceBox, setShowAddResourceBox] = useState(false);
	const handleNewResource = (a) => {
		console.log(a);
		setResources([...resources, a]);
		setShowAddResourceBox(false);
	};
	const loadData=async()=>{
		try {
			const res = await axiosInstance.get("/api/resource/");
			console.log(res);
			setResources(res.data);
		} catch (err) {
			console.log(err);
		}
	}
	useEffect(()=>{
		loadData();
	},[])
	return (
		<div className="resources-container">
			<div className="resources-box">
				<div className="resources-head">
					<span>All Resources</span>
				</div>
				<div className="resources-add">
					<button
						className="aavesh-btn"
						onClick={() => setShowAddResourceBox(true)}
					>
						<span className="aavesh-btn-text">
							Add new resource
						</span>
					</button>
				</div>
				<div className="resources-body">
					<div className="masonry">
						{resources.map((resource, index) => (
							<div className="masonry-content" key={index}>
								<Resource load={loadData} resource={resource} axiosInstance={axiosInstance} />
							</div>
						))}
					</div>
				</div>
			</div>
			{showAddResourceBox && (
				<AddResource
				axiosInstance={axiosInstance}
					close={() => setShowAddResourceBox(false)}
					save={handleNewResource}
					load={loadData}
				/>
			)}
		</div>
	);
};

export default Resources;
