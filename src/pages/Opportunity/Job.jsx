import React, { useState } from "react";

const Job = ({ job }) => {
	const [contextMenu, setContextMenu] = useState(false);
	const editMentor = () => {
		console.log("Edit the Mentor");
		setContextMenu(false);
	};
	const delMentor = () => {
		console.log("Delete the Mentor");
		setContextMenu(false);
	};
	return (
		<div className="opportunity-job">
			<div className="opportunity-job-head">
				<div className="opportunity-job-head-icon">
					<img src={job.icon} alt={job.title} />
				</div>
				<div className="opportunity-job-head-content">
					<span className="opportunity-job-head-content-title">
						{job.title}
					</span>
					<span className="opportunity-job-head-content-field">
						{job.field}
					</span>
					<span className="opportunity-job-head-content-department">
						{job.department}
					</span>
				</div>
				<div className="opportunity-job-head-showmore">
					{/* <a target="_blank" href={job.file} rel="noreferrer">
						<span className="material-icons">chevron_right</span>
					</a> */}
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
								<li
									className="more-item"
									onClick={() => delMentor()}
								>
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
								<li
									className="more-item"
									onClick={() => editMentor()}
								>
									<span className="material-icons">edit</span>
									<span className="more-item-label">
										Edit Mentor
									</span>
								</li>
								<li
									className="more-item"
									onClick={() => delMentor()}
								>
									<span className="material-icons">
										delete
									</span>
									<span className="more-item-label">
										Delete Mentor
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="opportunity-job-body">
				<div className="opportunity-job-body-content">
					{job.content}
				</div>
				<div className="opportunity-job-body-actions">
					<button className="opportunity-btn opportunity-btn-outline">
						<a href={job.file} target="_blank" rel="noreferrer">
							View Details
						</a>
					</button>
					<button className="opportunity-btn">
						<a href={job.link} target="_blank" rel="noreferrer">
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

export default Job;
