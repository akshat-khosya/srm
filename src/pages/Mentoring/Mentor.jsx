import React, { useState } from "react";

const Mentor = ({ mentor, axiosInstance }) => {
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
		<div className="mentoring-mentor">
			<div className="mentoring-mentor-head">
				<div className="mentoring-mentor-head-icon">
					<img
						src={`${axiosInstance.defaults.baseURL}images/${mentor.email}`}
						className="mentoring-mentor-head-icon__img"
						alt={mentor.name}
					/>
				</div>
				<div className="mentoring-mentor-head-content">
					<span className="mentoring-mentor-head__name">
						{mentor.name}
					</span>
					<a
						href={`mailto:${mentor.email}`}
						className="mentoring-mentor-head__email"
					>
						{mentor.email}
					</a>
				</div>
				<div className="mentoring-mentor-head-context">
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
			<div className="mentoring-mentor-body">
				<div className="mentoring-mentor-interests">
					{mentor.interests.map((item, index) => (
						<span className="mentoring-mentor-interest" key={index}>
							{item}
						</span>
					))}
				</div>
				<div className="mentoring-mentor-current">
					{`Currenly working in ${mentor.current}`}
				</div>
			</div>
			<div className="mentoring-mentor-tag">
				{`Prefers to work ${mentor.mode} ${mentor.frequency}`}
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

export default Mentor;
