import React from "react";
import { Link } from "react-router-dom";

const AllConnections = ({ close, save, userConnections, connections, bgs }) => {
	const handleConnect = (username) => {
		let presentuserConnections = [...userConnections];
		if (presentuserConnections.includes(username)) {
			presentuserConnections = presentuserConnections.filter(
				(a) => a != username
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
										<div className="connections-card">
											<div
												className="connections-card-box"
												style={{
													backgroundImage: `url(http://www.transparenttextures.com/patterns/${
														bgs[index % bgs.length]
													}.png)`,
												}}
											>
												<div
													className="connections-card-image"
													style={{
														backgroundImage: `url(${person.image})`,
													}}
												></div>
												<div className="connections-card-content">
													<Link
														to={`/people/${person.username}`}
														className="connections-card-content__name"
													>
														{person.name}
													</Link>
													<Link
														to={`/people/${person.username}`}
														className="connections-card-content__username"
													>
														{person.username}
													</Link>
													<span className="connections-card-content__about">
														{person.about}
													</span>
													{userConnections.includes(
														person.username
													) ? (
														<button
															className="connections-card-btn"
															onClick={() =>
																handleConnect(
																	person.username
																)
															}
														>
															Unfollow
														</button>
													) : (
														<button
															className="connections-card-btn"
															onClick={() =>
																handleConnect(
																	person.username
																)
															}
														>
															Connect
														</button>
													)}
												</div>
											</div>
										</div>
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
