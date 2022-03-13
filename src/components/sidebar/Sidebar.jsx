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
	const [coddropdown, setCoddropdown] = useState(true);
	const location = useLocation();
	const handleIcon = () => {
		if (icon === "fas fa-caret-down") {
			setIcon("fas fa-caret-up");
			setDropdown(false);
		} else {
			setIcon("fas fa-caret-down");
			setDropdown(true);
		}
	};
	useEffect(() => {
		setDropdown(true);
		setCoddropdown(true);
	}, [location.pathname]);

	return (
		<div className="Sidebar">
			<div className="Sidebar-container">
				<div className="Sidebar-wrapper">
					<ul className="Sidebar-ul ">
						<li className="Sidebar-li Sidebar-logo-1 ">
							<div className="logo-group Row">
								<div className="Sidebar-logo Col-lg-30">
									<img src={logo} alt="Logo of SRM, logo of SRMNCR" />
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
								height: dropdown ? "0" : "125px",
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
							{user.email===admin && <Link className="link" to="/setting">
								<li className="dropdownItem Row">
									<div className="dropdown-icon Col-lg-20">
										<i className="fas fa-cog"></i>
									</div>
									<div className="dropdown-Content Col-lg-70">
										Settings
									</div>
								</li>
							</Link>}
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

					<li
						className="Sidebar-li profile"
						style={{ padding: "0", margin: "0.25rem 0" }}
					>
						<div
							onClick={() => {
								setCoddropdown(!coddropdown);
							}}
							className="profile-group Row"
						>
							<div className="Sidebar-profile Col-lg-20">
								<i className="fas fa-users"></i>
							</div>
							<div className="Sidebar-profile-content Col-lg-70">
								Groups / Clubs
							</div>
							<div className="Sidebar-icon Col-lg-10">
								<i
									className="fas fa-caret-down"
									style={{
										transition: "all 0.3s ease-in-out",
										transform: `rotateZ(${
											coddropdown ? "0deg" : "180deg"
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
							height: coddropdown ? "0" : "85px",
						}}
					>
						<Link className="link" to="/addgroup">
							<li className="dropdownItem Row">
								<div className="dropdown-icon Col-lg-20">
									<i className="far fa-user"></i>
								</div>
								<div className="dropdown-Content Col-lg-70">
									Add group
								</div>
							</li>
						</Link>
						<Link className="link" to="/code">
							<li className="dropdownItem Row">
								<div className="dropdown-icon Col-lg-20">
									<i className="fas fa-code"></i>
								</div>
								<div className="dropdown-Content Col-lg-70">
									Let's Code
								</div>
							</li>
						</Link>
					</ul>
					<Link className="link" to="/mentoring">
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="fas fa-people-arrows"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									Mentoring
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
					<Link className="link" to="/opportunity">
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="fas fa-building"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									Opportunity
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
					<Link className="link" to="/resource">
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="far fa-sticky-note"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									Resources
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
					<Link className="link" to="/scholarships">
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="fas fa-graduation-cap"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									Scholarships
								</div>
								<div className="Sidebar-icon Col-lg-10"></div>
							</div>
						</li>
					</Link>
					<Link className="link" to="/events">
						<li className="Sidebar-li ">
							<div className="profile-group Row">
								<div className="Sidebar-profile Col-lg-20">
									<i className="fas fa-calendar-week"></i>
								</div>
								<div className="Sidebar-profile-content Col-lg-70">
									Events
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
