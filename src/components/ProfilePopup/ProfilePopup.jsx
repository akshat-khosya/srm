import React, { useEffect, useState } from "react";
import "./profile-popup.css";

const ProfilePopup = ({ axiosInstance, close, userEmail }) => {
	const [user, setUser] = useState({
		email: userEmail,
	});
	const loadData = async () => {
		const data = {
			email: userEmail,
		};
		try {
			const res = await axiosInstance.post("/api/adminprofile/", data);
			if (res.data.status) {
				setUser(res.data.profile);
				console.log(res.data.profile);
				console.log(user);
			} else {
				alert("err");
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		loadData();
	}, []);
	const [file, setFile] = useState(null);
	return (
		<>
			<div className="profile-popup">
				<div className="profile-popup-box" data-aos="zoom-in">
					<div className="profile-popup-head">
						<button
							className="profile-popup-head-close"
							onClick={close}
						>
							<span className="material-icons">close</span>
						</button>
					</div>
					<div className="profile-popup-body">
						<div className="regisWrapper">
							<h1 className="regisprimary">{user.name}</h1>
							<form>
								<div className="regis-inputgroup">
									<label className="Imglabel" htmlFor="file">
										<img
											className="regisImg"
											src={
												file
													? URL.createObjectURL(file)
													: `${axiosInstance.defaults.baseURL}images/${user.photo}`
											}
											alt={user.email}
										/>
									</label>
									<input
										onChange={(e) => {
											setFile(e.target.files[0]);
										}}
										className="Imgupload"
										type="file"
										id="file"
									/>
								</div>
								<div className="regiscontainer Row">
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="name">Name</label>
										<input
											required
											disabled
											value={user.name}
											type="name"
											id="name"
											name="name"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="email">Email</label>
										<input
											disabled
											value={user.email}
											type="email"
											id="email"
											name="email"
										/>
									</div>
									{user.phone !== "" && (
										<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
											<label htmlFor="phone">Phone No.</label>
											<input
												disabled
												value={user.phone}
												type="email"
												id="phone"
												name="phone"
											/>
										</div>
									)}
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="username">
											Username
										</label>
										<input
											required
											disabled
											value={user.username}
											type="text"
											id="username"
											name="username"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="dob">
											Date of Birth
										</label>
										<input
											value={user.dob}
											required
											disabled
											type="date"
											id="dob"
											name="dob"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="gender">Gender</label>
										<input
											value={user.gender}
											required
											disabled
											name="gender"
											id="gender"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="currentoriginaztion">
											Current Originzation
										</label>
										<input
											value={user.currentoriginaztion}
											required
											disabled
											type="text"
											id="currentoriginaztion"
											name="currentoriginaztion"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="desgination">
											Desgination
										</label>
										<input
											required
											disabled
											value={user.desgination}
											name="desgination"
											id="desgination"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="program">Program</label>
										<input
											value={user.program}
											required
											disabled
											name="program"
											id="program"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="batch">Batch</label>
										<input
											value={user.batch}
											required
											disabled
											name="batch"
											id="batch"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="pyear">
											Passing Year
										</label>
										<input
											required
											disabled
											className="myInput IP"
											type="number"
											name="pyear"
											id="pyear"
											min="1997"
											max="2050"
											step="1"
											value={user.pyear}
											placeholder="Passing Year"
										/>
									</div>

									<div className="regis-inputgroup Col-lg-100 Col-md-100 Col-sm-100">
										<label htmlFor="bio">Short Bio</label>
										<textarea
											value={user.bio}
											required
											disabled
											rows="5"
											type="text"
											id="bio"
											name="bio"
										/>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfilePopup;
