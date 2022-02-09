import React from "react";
import ConnectionsCard from "./ConnectionsCard";

const AllConnections = ({ close, save, userConnections, connections }) => {
	const handleConnect = (username) => {
		let presentuserConnections = [...userConnections];
		if (presentuserConnections.includes(username)) {
			presentuserConnections = presentuserConnections.filter(
				(a) => a !== username
			);
		} else {
			presentuserConnections = [...presentuserConnections, username];
		}
		console.log(presentuserConnections);
		save(presentuserConnections);
	};
	return (
		<div className="connections-popup">
			<div
				className="connections-popup-box"
				data-aos="zoom-in"
				style={{
					height: userConnections.length > 4 ? "95%" : "55%",
				}}
			>
				<div className="connections-popup-head">
					<button
						className="connections-popup-head-close"
						onClick={close}
					>
						<span className="material-icons">close</span>
					</button>
				</div>
				<div className="connections-popup-body">
					<div className="Row">
						{connections.map(
							(person, index) =>
								userConnections.includes(person.username) && (
									<div
										className="Col-lg-25 Col-md-25 col-lg-30"
										key={index}
									>
										<ConnectionsCard
											person={person}
											included={userConnections.includes(
												person.username
											)}
											handleConnect={handleConnect}
										/>
									</div>
								)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllConnections;
