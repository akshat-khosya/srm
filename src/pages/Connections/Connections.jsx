import React, { useContext, useEffect, useState } from "react";
import AllConnections from "./AllConnections";
import "./connections.css";
import ConnectionsCard from "./ConnectionsCard";
import _ from "lodash";
import nullGIF from "../../Images/null-lens.png";
import { Context } from "../../context/Context";
import SnackBar from "../../components/Snackbar";
const Connections = ({ axiosInstance }) => {
	const [page, setPage] = useState({
		page: 1,
		pageSize: 20,
	});
	const [totalPeople, setTotalPeople] = useState(0);
	const { user } = useContext(Context);
	const [allConnectionsBox, setAllConnectionsBox] = useState(false);
	const [userConnections, setUserConnections] = useState([]);
	const [connections, setConnections] = useState([]);
	const [searchStr, setSearchStr] = useState("");
	const [openSearch, setOpenSearch] = useState(false);
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState({
		text: "",
		color: "",
	});
	const loadAllUser = async () => {
		const allUser = {
			email: user.email,
			page: page.page,
			pageSize: page.pageSize,
		};
		const res = await axiosInstance.post("/api/allUser", allUser);
		setConnections(res.data);
	};
	const loadConnections = async () => {
		const allUser = {
			email: user.email,
		};
		const res = await axiosInstance.post("/api/connection", allUser);
		setUserConnections(res.data.array);
	};
	const loadCount = async () => {
		const res = await axiosInstance.get("/api/count/");
		setTotalPeople(res.data.count);
	};
	useEffect(() => {
		loadConnections();
		loadAllUser();
		loadCount();
	}, [page.page]);
	const handleConnect = async (data) => {
		if (data.included) {
			const res = await axiosInstance.patch("/api/unfollow", data);
			if (res.status) {
				setMessage({
					text: `removed connection ${data.name} succesfully`,
					color: "var(--green)",
				});
				setOpen(true);
				setTimeout(() => {
					setOpen(false);
				}, 2500);
			} else {
				setMessage({
					text: `Error in removing ${data.name} `,
					color: "var(--red)",
				});
				setOpen(true);
				setTimeout(() => {
					setOpen(false);
				}, 2500);
			}
			loadConnections();
			loadAllUser();
		} else {
			const res = await axiosInstance.patch("/api/connection", data);
			if (res.status) {
				setMessage({
					text: `Added connection ${data.name} succesfully`,
					color: "var(--green)",
				});
				setOpen(true);
				setTimeout(() => {
					setOpen(false);
				}, 2500);

				loadAllUser();
				loadConnections();
			} else {
				setMessage({
					text: `Error in adding ${data.name} `,
					color: "var(--red)",
				});
				setOpen(true);
				setTimeout(() => {
					setOpen(false);
				}, 2500);
			}
		}
	};
	const searchPeople = (value) => {
		if (value === "") {
			loadConnections();
			loadAllUser();
			return;
		}
		let check = [];
		connections.forEach((person) => {
			const searchName = _.lowerCase(_.camelCase(person.name));
			const searchUserName = _.lowerCase(_.camelCase(person.username));
			if (searchName.includes(value) || searchUserName.includes(value))
				check = [...check, person];
		});
		setConnections(check);
		// console.log(connections);
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
									{userConnections.map(
										(person, index) =>
											index < 4 && (
												<div
													className="Col-lg-25 Col-md-25 col-lg-30"
													key={index}
												>
													<ConnectionsCard
														axiosInstance={
															axiosInstance
														}
														person={person}
														included={true}
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
								<span>People across the portal</span>
								<div className="connections-row-head-controls">
									<button
										className="icon icon-sm"
										onClick={() =>
											setPage({
												...page,
												page:
													page.page === 1
														? page.page
														: page.page - 1,
											})
										}
										title={
											page.page <= 1
												? "No more going back"
												: "Go to previous page"
										}
										disabled={page.page <= 1}
									>
										<span className="material-icons">
											chevron_left
										</span>
									</button>
									<span>
										{page.page} of{" "}
										{parseInt(totalPeople / page.pageSize) +
											1}
									</span>
									<button
										className="icon icon-sm"
										onClick={() =>
											setPage({
												...page,
												page:
													totalPeople /
														page.pageSize >
													page.page
														? page.page + 1
														: page.page,
											})
										}
										title={
											totalPeople / page.pageSize >
											page.page
												? "Go To next page"
												: "No more going forward"
										}
										disabled={
											totalPeople / page.pageSize <=
											page.page
										}
									>
										<span className="material-icons">
											chevron_right
										</span>
									</button>
								</div>
							</div>
							<div className="connections-row-body">
								<div className="Row">
									{connections.map((person, index) => (
										<div
											className="Col-lg-25 Col-md-25 col-lg-30"
											key={index}
										>
											<ConnectionsCard
												axiosInstance={axiosInstance}
												person={person}
												included={person.connected}
												handleConnect={handleConnect}
											/>
										</div>
									))}
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
					axiosInstance={axiosInstance}
					close={() => setAllConnectionsBox(false)}
					save={(a) => setUserConnections(a)}
					handleConnect={handleConnect}
				/>
			)}
			{open && <SnackBar text={message.text} color={message.color} />}
		</div>
	);
};

export default Connections;
