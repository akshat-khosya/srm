import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./connections.css";

const Connections = ({ axiosInstance }) => {
	const bgs = [
		"white-diamond-dark",
		"skulls",
		"robots",
		"crissxcross",
		"batthern",
		"food",
		"always-grey",
	];
	const [userConnections, setUserConnections] = useState([]);
	const [connections, setConnections] = useState([]);
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
		setUserConnections(presentuserConnections);
	};
	return (
		<div className="connections">
			<Sidebar axiosInstance={axiosInstance} />
			<div className="connections-container">
				<Navbar />
				<div className="connections-box">
					<div className="connections-head">
						<span>Connect with people across the portal</span>
					</div>
					<div className="connections-body">
						{userConnections.length > 0 && (
							<div className="connections-row">
								<div className="connections-row-head">
									<span>Your Connections</span>
									<button className="aavesh-btn">
										<span className="aavesh-btn-text">
											View All
										</span>
									</button>
								</div>
								<div className="connections-row-body">
									<div className="Row">
										{connections.map(
											(person, index) =>
												userConnections.includes(
													person.username
												) &&
												userConnections.indexOf(
													person.username
												) < 4 && (
													<div
														className="Col-lg-25 Col-md-25 col-lg-30"
														key={index}
													>
														<div className="connections-card">
															<div
																className="connections-card-box"
																style={{
																	backgroundImage: `url(http://www.transparenttextures.com/patterns/${
																		bgs[
																			index %
																				bgs.length
																		]
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
																		{
																			person.name
																		}
																	</Link>
																	<Link
																		to={`/people/${person.username}`}
																		className="connections-card-content__username"
																	>
																		{
																			person.username
																		}
																	</Link>
																	<span className="connections-card-content__about">
																		{
																			person.about
																		}
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
						)}
						<div className="connections-row">
							<div className="connections-row-head">
								<span>Connect with More</span>
							</div>
							<div className="connections-row-body">
								<div className="Row">
									{connections.map(
										(person, index) =>
											!userConnections.includes(
												person.username
											) && (
												<div
													className="Col-lg-25 Col-md-25 col-lg-30"
													key={index}
												>
													<div className="connections-card">
														<div
															className="connections-card-box"
															style={{
																backgroundImage: `url(http://www.transparenttextures.com/patterns/${
																	bgs[
																		index %
																			bgs.length
																	]
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
																	{
																		person.name
																	}
																</Link>
																<Link
																	to={`/people/${person.username}`}
																	className="connections-card-content__username"
																>
																	{
																		person.username
																	}
																</Link>
																<span className="connections-card-content__about">
																	{
																		person.about
																	}
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
				</div>
			</div>
		</div>
	);
};

export default Connections;
