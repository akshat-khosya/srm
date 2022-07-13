import React, { useEffect, useState } from "react";
import userFallback from "../../Images/user.svg";
import "./profile-popup.css";
import "../../pages/profile/profile.css";

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
				setUserPhoto(
					`${axiosInstance.defaults.baseURL}images/${res.data.profile.email}`
				);
				setIsLoadingImage(false);
			} else {
				alert("err");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const [userPhoto, setUserPhoto] = useState(userFallback);
	const [isLoadingImage, setIsLoadingImage] = useState(true);
	useEffect(() => {
		loadData();
	}, []);
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
						<form className="profile-form">
							<div className="Row">
								<div className="Col-lg-40 Col-md-40 Col-sm-100">
									<div
										className="profile-form-group"
										style={{
											justifyContent: "flex-start",
											margin: "1rem 0",
										}}
									>
										<input
											disabled
											required
											className="profile-input profile-input-img dispn"
											type="file"
											id="file"
										/>
										<label htmlFor="file">
											{!isLoadingImage && (
												<img
													src={userPhoto}
													alt={user.name}
													onError={() =>
														setUserPhoto(
															userFallback
														)
													}
												/>
											)}
										</label>
									</div>
								</div>
								<div className="Col-lg-50 Col-md-50 Col-sm-100">
									<div className="profile-form-group">
										<input
											placeholder="Name"
											value={user.name}
											disabled
											required
											type="text"
											id="name"
											name="name"
											title="Name"
										/>
										<div
											className="profile-form-input-group"
											title="Email"
											style={{
												width: "100%",
												margin: "0",
											}}
										>
											<label htmlFor="email">
												<span className="material-icons">
													email
												</span>
											</label>
											<input
												placeholder="Email"
												value={user.email}
												disabled
												required
												type="email"
												id="email"
												name="email"
											/>
										</div>
										{user.phone !== "" && (
											<div
												className="profile-form-input-group"
												title="Phone No."
												style={{ width: "49%" }}
											>
												<label htmlFor="phone">
													<span className="material-icons">
														phone
													</span>
												</label>
												<input
													placeholder="Phone No."
													value={user.phone}
													disabled
													required
													type="tel"
													id="phone"
													name="phone"
												/>
											</div>
										)}
										<div
											className="profile-form-input-group"
											title="Username"
											style={{ width: "49%" }}
										>
											<label htmlFor="username">
												<span className="material-icons">
													account_circle
												</span>
											</label>
											<input
												placeholder="Username"
												value={user.username}
												disabled
												required
												type="text"
												id="username"
												name="username"
											/>
										</div>
										<div
											className="profile-form-input-group"
											title="Short Bio"
											style={{ width: "100%" }}
										>
											<label htmlFor="username">
												<span className="material-icons">
													lightbulb
												</span>
											</label>
											<input
												placeholder="Short Bio"
												value={user.bio}
												disabled
												required
												type="text"
												id="bio"
												name="bio"
											/>
										</div>
									</div>
								</div>
								<div className="Col-lg-10 Col-md-10 Col-sm-100"></div>
								<div className="Col-lg-33 Col-md-50 Col-sm-100">
									<div
										className="profile-form-input-group"
										title="Date Of Birth"
									>
										<label htmlFor="dob">
											<span className="material-icons">
												today
											</span>
										</label>
										<input
											placeholder="Date Of Birth"
											value={user.dob}
											disabled
											required
											type="date"
											id="dob"
											name="dob"
										/>
									</div>
								</div>
								<div className="Col-lg-33 Col-md-50 Col-sm-100">
									<div
										className="profile-form-input-group"
										title="Gender"
									>
										<label htmlFor="gender">
											<span className="material-icons">
												{user.gender === "Male"
													? "man"
													: user.gender === "Female"
													? "woman"
													: "man_4"}
											</span>
										</label>
										<select
											placeholder="Gender"
											name="gender"
											id="gender"
											disabled
											required
											value={user.gender}
										>
											<option value="Male">Male</option>
											<option value="Female">
												Female
											</option>
											<option value="Rather Not Say">
												Rather Not Say
											</option>
										</select>
									</div>
								</div>
								<div className="Col-lg-33 Col-md-50 Col-sm-100">
									<div
										className="profile-form-input-group"
										title="Current Organization"
									>
										<label htmlFor="currently">
											<span className="material-icons">
												business
											</span>
										</label>
										<input
											placeholder="Current Organization"
											value={user.currentoriginaztion}
											disabled
											required
											type="text"
											id="currently"
											name="currently"
										/>
									</div>
								</div>
								<div className="Col-lg-33 Col-md-50 Col-sm-100">
									<div
										className="profile-form-input-group"
										title="Designation"
									>
										<label htmlFor="work">
											<span className="material-icons">
												badge
											</span>
										</label>
										<input
											placeholder="Designation"
											value={user.desgination}
											disabled
											required
											type="text"
											id="work"
											name="work"
										/>
									</div>
								</div>
								<div className="Col-lg-33 Col-md-50 Col-sm-100">
									<div
										className="profile-form-input-group"
										title="Batch"
									>
										<label htmlFor="batch">
											<span className="material-icons">
												date_range
											</span>
										</label>
										<input
											placeholder="Batch"
											value={user.batch}
											disabled
											required
											type="text"
											id="batch"
											name="batch"
										/>
									</div>
								</div>
								<div className="Col-lg-33 Col-md-50 Col-sm-100">
									<div
										className="profile-form-input-group"
										title="Program"
									>
										<label htmlFor="course">
											<span className="material-icons">
												cast_for_education
											</span>
										</label>
										<input
											placeholder="Program"
											value={user.program}
											disabled
											required
											type="text"
											id="course"
											name="course"
										/>
									</div>
								</div>
								<div className="Col-lg-33 Col-md-100 Col-sm-100">
									<div
										className="profile-form-input-group"
										title="Passing Year"
									>
										<label htmlFor="pyear">
											<span className="material-icons">
												school
											</span>
										</label>
										<input
											placeholder="Passing Year"
											value={user.pyear}
											disabled
											required
											type="text"
											id="pyear"
											name="pyear"
										/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfilePopup;
