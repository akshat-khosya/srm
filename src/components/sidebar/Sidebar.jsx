import "./sidebar.css";
import logo from "../../Images/logo.png";
import dashboard from "../../Images/dashboard_white_24dp.svg";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { Link, useLocation } from "react-router-dom";
import { admin } from "../../globalVariable";
function Sidebar({ axiosInstance }) {
	const { user, dispatch } = useContext(Context);
	const [icon, setIcon] = useState("fas fa-caret-down");
	const [dropdown, setDropdown] = useState(true);
	const location = useLocation();
	const [noti, setnoti] = useState();
	const [totalchat, settotalchat] = useState(0);
	const [refetch, setrefetch] = useState(false);
	const handleIcon = () => {
		if (icon === "fas fa-caret-down") {
			setIcon("fas fa-caret-up");
			setDropdown(false);
		} else {
			setIcon("fas fa-caret-down");
			setDropdown(true);
		}
	};

	async function allchatNoti() {
		const allchatNoti = await axiosInstance.post("/api/group/getallnoti", {
			userid: user._id,
		});
		let totalno = 0;
		// const totalchat = allchatNoti.data.totalunread.map((el)=>{
		// let totalno = 0;
		// totalno += el.newarray
		// })

		for (let i = 0; i < allchatNoti.data.totalunread.length; i++) {
			totalno += allchatNoti.data.totalunread[i].newarray;
		}
		console.log(totalno);
		settotalchat(totalno);
		console.log(allchatNoti);
	}

	async function getnotification() {
		const getNoti = await axiosInstance.post("/api/noti/getnoticount", {
			userid: user._id,
		});
		setnoti(getNoti);
		console.log(getNoti);
		console.log(noti);
	}

	async function readEventNotification() {
		const readallevent = await axiosInstance.post("/api/event/readevent", {
			userid: user._id,
		});
		setrefetch(!refetch);
		console.log(readallevent);
	}

	async function readMentoringNotification() {
		const readallmentor = await axiosInstance.post(
			"/api/mentoring/readmentoring",
			{ userid: user._id }
		);
		setrefetch(!refetch);
		console.log(readallmentor);
	}

	async function readOpportunityNotification() {
		const readallopportunity = await axiosInstance.post(
			"/api/oppo/readopportunity",
			{ userid: user._id }
		);
		setrefetch(!refetch);
		console.log(readallopportunity);
	}

	async function readResourceNotification() {
		const readallresource = await axiosInstance.post(
			"/api/resource/readresource",
			{ userid: user._id }
		);
		setrefetch(!refetch);
		console.log(readallresource);
	}

	async function readScholarshipNotification() {
		const readallscholarship = await axiosInstance.post(
			"/api/scholarship/readscholarship",
			{ userid: user._id }
		);
		setrefetch(!refetch);
		console.log(readallscholarship);
	}

	useEffect(() => {
		setDropdown(true);
	}, [location.pathname]);

	useEffect(() => {
		getnotification();
		allchatNoti();
	}, [refetch]);

	return (
		<div className="Sidebar">
			<div className="Sidebar-container">
				<div className="Sidebar-wrapper">
					<ul className="Sidebar-ul ">
						<li className="Sidebar-li Sidebar-logo-1 ">
							<div className="logo-group Row">
								<div className="Sidebar-logo Col-lg-30">
									<img
										src={logo}
										alt="Logo of SRM, logo of SRMNCR"
									/>
								</div>
								<div className="Sidebar-content Col-lg-70">
									SRM Alumni
								</div>
							</div>
						</li>

						<li className="Sidebar-li profile">
							<div
								onClick={() => {
									handleIcon();
								}}
								className="profile-group Row"
							>
								<div className="Sidebar-profile Col-lg-20">
									<img
										src={`${axiosInstance.defaults.baseURL}images/${user.photo}`}
										alt={user.email}
										style={{
											marginLeft: "11px",
										}}
									/>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									{user.name}
								</div>
								<div className="Sidebar-icon Col-lg-10">
									<i
										className="fas fa-caret-down"
										style={{
											transition: "all 0.3s ease-in-out",
											transform: `rotateZ(${
												dropdown ? "0deg" : "180deg"
											})`,
										}}
									></i>
								</div>
							</div>
						</li>
						<ul
							className="dropdown"
							style={{
								transition: "height 0.25s ease-in",
								height: dropdown
									? "0"
									: user.email === admin
									? "125px"
									: "85px",
							}}
						>
							<Link className="link" to="/profile">
								<li className="dropdownItem Row">
									<div className="dropdown-icon Col-lg-20">
										<i className="far fa-user"></i>
									</div>
									<div className="dropdown-Content Col-lg-70">
										Profile
									</div>
								</li>
							</Link>
							{user.email === admin && (
								<Link className="link" to="/settings">
									<li className="dropdownItem Row">
										<div className="dropdown-icon Col-lg-20">
											<i className="fas fa-cog"></i>
										</div>
										<div className="dropdown-Content Col-lg-70">
											Settings
										</div>
									</li>
								</Link>
							)}
							<Link
								onClick={() => {
									dispatch({ type: "LOGIN_FAILURE" });
									localStorage.removeItem("token");
								}}
								className="link"
								to="/"
							>
								<li className="dropdownItem Row">
									<div className="dropdown-icon Col-lg-20">
										<i className="fas fa-sign-out-alt"></i>
									</div>
									<div className="dropdown-Content Col-lg-70">
										Logout
									</div>
								</li>
							</Link>
						</ul>
					</ul>
					<Link className="link" to="/">
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<img src={dashboard} alt={user.email} />
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									Dashboard
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
					<Link className="link" to="/connections">
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="fas fa-user-friends"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									Connections
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
					<Link className="link" to="/groups">
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="fas fa-users"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									<span className="Sidebar-profile-content__text">
										All Groups
									</span>
									{totalchat > 0 && (
										<span className="Sidebar-profile-content__noticon">
											totalchat
										</span>
									)}
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
					<Link
						onClick={() => readMentoringNotification()}
						className="link"
						to="/mentoring"
					>
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="fas fa-people-arrows"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									<span className="Sidebar-profile-content__text">
										Mentors
									</span>
									{noti?.data.differencementor > 0 && (
										<span className="Sidebar-profile-content__noticon">
											noti?.data.differencementor
										</span>
									)}
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
					<Link
						onClick={() => readOpportunityNotification()}
						className="link"
						to="/opportunity"
					>
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="fas fa-building"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									<span className="Sidebar-profile-content__text">
										Opportunity
									</span>
									{noti?.data.differenceopportunity > 0 && (
										<span className="Sidebar-profile-content__noticon">
											noti?.data.differenceopportunity
										</span>
									)}
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
					<Link
						onClick={() => readResourceNotification()}
						className="link"
						to="/resource"
					>
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="far fa-sticky-note"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									<span className="Sidebar-profile-content__text">
										Resources
									</span>
									{noti?.data.differenceresource > 0 && (
										<span className="Sidebar-profile-content__noticon">
											noti?.data.differenceresource
										</span>
									)}
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
					<Link
						onClick={() => readScholarshipNotification()}
						className="link"
						to="/scholarships"
					>
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="fas fa-graduation-cap"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									<span className="Sidebar-profile-content__text">
										Scholarship
									</span>
									{noti?.data.differencescholarship > 0 && (
										<span className="Sidebar-profile-content__noticon">
											noti?.data.differencescholarship
										</span>
									)}
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
					<Link
						onClick={() => readEventNotification()}
						className="link"
						to="/events"
					>
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="fas fa-calendar-week"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									<span className="Sidebar-profile-content__text">
										Events
									</span>
									{noti?.data.differenceevent > 0 && (
										<span className="Sidebar-profile-content__noticon">
											noti?.data.differenceevent
										</span>
									)}
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
