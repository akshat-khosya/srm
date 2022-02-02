import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import AllConnections from "./AllConnections";
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
	const [allConnectionsBox, setAllConnectionsBox] = useState(false);
	const [userConnections, setUserConnections] = useState([
		"akshatmittal61",
		"akshat-khosya",
		"Mitalijain3",
	]);
	const [connections, setConnections] = useState([
		{
			name: "Akshat Mittal",
			image: "https://akshatmittal61.github.io/akshatmittal61/static/media/favicon.f216be050314e2836b31.png",
			about: "MERN stack developer",
			username: "akshatmittal61",
		},
		{
			name: "Akshat Khosya",
			image: "https://techtatva.netlify.app/static/media/akshatKhosya.29804d4dec99ee7c6ff0.jpeg",
			about: "MERN stack developer",
			username: "akshat-khosya",
		},
		{
			name: "Mitali Jain",
			image: "https://techtatva.netlify.app/static/media/mitaliJain.87aba1769dbdd8dbf0ae.jpg",
			about: "MERN stack developer",
			username: "Mitalijain3",
		},
		{
			name: "Varun Prohit",
			image: "https://techtatva.netlify.app/static/media/varunProhit.b20a20297a99df3d0851.jpg",
			about: "Competitive Programmer | Frontend Developer",
			username: "VarunProhit",
		},
		{
			name: "Aditi Chauhan",
			image: "https://techtatva.netlify.app/static/media/aditiChauhan.3545f70d61f8521c642b.jpeg",
			about: "Tech Enthusiast",
			username: "aditichauhan04",
		},
		{
			name: "Sayak Mondal",
			image: "https://techtatva.netlify.app/static/media/sayakMondal.357c00699c5b5682243e.png",
			about: "Video Editor, Graphic designer",
			username: "sayak22",
		},
		{
			name: "Pranav Jalan",
			image: "https://techtatva.netlify.app/static/media/pranavJalan.934eb7d4d0c0a8e03612.jpg",
			about: "Graphic Designer",
			username: "pranav22",
		},
		{
			name: "Vansh Singh",
			image: "https://techtatva.netlify.app/static/media/vanshSingh.1f19dad884b3d8535c1a.jpg",
			about: "Full Stack Developer | UI/UX Designer",
			username: "Va1nsh14",
		},
		{
			name: "Chelsi Jain",
			about: "Web Developer",
			image: "https://techtatva.netlify.app/static/media/chelsiJain.bdbd751ccac397c349db.jpg",
			username: "Chelsijain20",
		},
		{
			name: "Pratham Singh",
			image: "https://techtatva.netlify.app/static/media/prathamSingh.44ab45939e0c64331c2b.jpeg",
			about: "Web Developer",
			username: "pratham891",
		},
		{
			name: "Shubhi Arora",
			image: "https://techtatva.netlify.app/static/media/shubhiArora.d400e9b420067cff2140.jpg",
			about: "Competitive Programmer | Full Stack Web Developer",
			username: "shubhi-arora",
		},
	]);
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
									<button
										className="aavesh-btn"
										onClick={() =>
											setAllConnectionsBox(true)
										}
									>
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
			{allConnectionsBox && (
				<AllConnections
					userConnections={userConnections}
					connections={connections}
					bgs={bgs}
					close={() => setAllConnectionsBox(false)}
					save={(a) => setUserConnections(a)}
				/>
			)}
		</div>
	);
};

export default Connections;
