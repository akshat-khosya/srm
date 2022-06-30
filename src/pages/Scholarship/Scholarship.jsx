import React, { useContext, useState } from "react";

import { Context } from "../../context/Context";
import favicon from "../../Images/logo.png";

const Scholarship = ({ scholarship,axiosInstance ,load}) => {
	const {user}=useContext(Context);
	const [contextMenu, setContextMenu] = useState(false);
	const delScholarship = async() => {
		console.log(scholarship);
		try {
			
			

			const res=await axiosInstance.delete("/api/scholarship/",{data:{id:scholarship._id}});
			console.log(res);
			if(res.data.status===true){
				load();
				setContextMenu(false);
			}
		} catch (err) {
			
		}
		console.log("Edit the Scholarship");
		setContextMenu(false);
	};
	return (
		<div className="scholarships-scholarship">
			<div className="scholarships-scholarship-head">
				<div className="scholarships-scholarship-head-icon">
					<img src={favicon} alt={scholarship.title} />
				</div>
				<div className="scholarships-scholarship-head-content">
					<span className="scholarships-scholarship-head-content-title">
						{scholarship.title}
					</span>
					<span className="scholarships-scholarship-head-content-type">
						{scholarship.type}
					</span>
				</div>
				<div className="scholarships-scholarship-head-showmore">
					<div className="more-context">
						<button
							className="icon more-icon"
							onClick={() => setContextMenu(!contextMenu)}
						>
							<span className="material-icons">more_horiz</span>
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
										href={axiosInstance.defaults.baseURL+"pdf/"+scholarship.file}
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
									onClick={() => editScholarship()}
								>
									<span className="material-icons">edit</span>
									<span className="more-item-label">
										Edit Scholarship
									</span>
								</li> */}
								{user.email===scholarship.email &&
								(<li
									className="more-item"
									onClick={() => delScholarship()}
								>
									<span className="material-icons">
										delete
									</span>
									<span className="more-item-label">
										Delete Scholarship
									</span>
								</li>)
								}
								
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="scholarships-scholarship-body">
				<div className="scholarships-scholarship-body-amount">
					<h6 style={{ display: "inline" }}>Amount: </h6>{" "}
					{scholarship.amount}
				</div>
				<div className="scholarships-scholarship-body-content">
					{scholarship.content}
				</div>
				<div className="scholarships-scholarship-body-date">
					<h6>Opening Data</h6> {scholarship.openDate}
				</div>
				<div className="scholarships-scholarship-body-date">
					<h6>Closing Data</h6> {scholarship.closeDate}
				</div>
				<div className="scholarships-scholarship-body-actions">
					<button className="scholarships-btn scholarships-btn-outline">
						<a
							href={axiosInstance.defaults.baseURL+"pdf/"+scholarship.file}
							target="_blank"
							rel="noreferrer"
						>
							View Details
						</a>
					</button>
					<button className="scholarships-btn">
						<a
							href={scholarship.link}
							target="_blank"
							rel="noreferrer"
						>
							Apply Now
						</a>
					</button>
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

export default Scholarship;
