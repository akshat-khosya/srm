import React, { useEffect, useState } from "react";
import AllConnections from "./AllConnections";
import "./connections.css";
import ConnectionsCard from "./ConnectionsCard";
import _ from "lodash";
import nullGIF from "../../Images/null-lens.png";

const Connections = ({ axiosInstance }) => {
	const [allConnectionsBox, setAllConnectionsBox] = useState(false);
	const [userConnections, setUserConnections] = useState([
		"akshatmittal61",
		"akshat-khosya",
		"Mitalijain3",
	]);
	const [connections, setConnections] = useState([]);
	const [searchStr, setSearchStr] = useState("");
	const [openSearch, setOpenSearch] = useState(false);
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
		setUserConnections(presentuserConnections);
	};
	const searchPeople = (value) => {
		let check = [];
		const allConnections = [];
		allConnections.forEach((person) => {
			const searchName = _.lowerCase(_.camelCase(person.name));
			if (searchName.includes(value)) check = [...check, person];
		});
		setConnections(check);
		console.log(connections);
	};
	const handleSearch = (e) => {
		e.preventDefault();
		setSearchStr("");
	};
	const handleChange = (e) => {
		const { value } = e.target;
		setSearchStr(openSearch ? value : "");
		searchPeople(value);
	};
	useEffect(() => {
		document.onkeydown = function (evt) {
			evt = evt || window.event;
			var isEscape = false;
			if ("key" in evt) {
				isEscape = evt.key === "Escape" || evt.key === "Esc";
			} else {
				isEscape = evt.keyCode === 27;
			}
			if (isEscape) {
				if (openSearch) {
					setSearchStr("");
					searchPeople("");
					setOpenSearch(false);
				}
			}
		};
	}, [openSearch]);

	return (
		<div className="connections-container">
			<div className="connections-box">
				<div className="connections-head">
					<span>Connect with people across the portal</span>
					<form
						className="connections-head-form"
						onSubmit={handleSearch}
					>
						<input
							type="text"
							value={searchStr}
							onChange={handleChange}
							placeholder="Search People..."
							style={{
								width: openSearch ? "15rem" : "0",
								padding: openSearch
									? "0.5rem 1rem"
									: "0.5rem 0",
							}}
						/>
						<button
							onClick={() => {
								if (openSearch) {
									setSearchStr("");
									searchPeople("");
								}
								setOpenSearch(!openSearch);
							}}
							style={{
								borderRadius: openSearch
									? "0 500px 500px 0"
									: "500px",
							}}
						>
							<span className="material-icons">
								{openSearch ? "close" : "search"}
							</span>
						</button>
					</form>
				</div>
				<div className="connections-body">
					{userConnections.length > 0 && connections.length > 0 && (
						<div className="connections-row">
							<div className="connections-row-head">
								<span>Your Connections</span>
								<button
									className="aavesh-btn"
									onClick={() => setAllConnectionsBox(true)}
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
													<ConnectionsCard
														person={person}
														included={userConnections.includes(
															person.username
														)}
														handleConnect={
															handleConnect
														}
													/>
												</div>
											)
									)}
								</div>
							</div>
						</div>
					)}
					{connections.length > 0 && (
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
													<ConnectionsCard
														person={person}
														included={userConnections.includes(
															person.username
														)}
														handleConnect={
															handleConnect
														}
													/>
												</div>
											)
									)}
								</div>
							</div>
						</div>
					)}
				</div>
				{connections.length <= 0 && searchStr !== "" && (
					<div className="connections-null">
						<div className="connections-null-box">
							<img src={nullGIF} alt="NULL" />
							<span>{`No results with the name ${searchStr}`}</span>
						</div>
					</div>
				)}
			</div>
			{allConnectionsBox && (
				<AllConnections
					userConnections={userConnections}
					connections={connections}
					close={() => setAllConnectionsBox(false)}
					save={(a) => setUserConnections(a)}
				/>
			)}
		</div>
	);
};

export default Connections;
