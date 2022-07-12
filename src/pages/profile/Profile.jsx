import { useState, useContext } from "react";
import { Context } from "../../context/Context";

import "./profile.css";

import SnackBar from "../../components/Snackbar";
function Profile({ axiosInstance }) {
	const [edit, setEdit] = useState(false);
	const { user, dispatch } = useContext(Context);
	const [err, setErr] = useState({
		status: false,
		message: "",
	});

	const [file, setFile] = useState(null);

	const [personal, setPersonal] = useState({
		name: user.name,
		phone: user.phone,
		username: user.username,

		dob: user.dob,
		gender: user.gender,
		fname: user.fname,
		mname: user.mname,
		currentoriginaztion: user.currentoriginaztion,
		desgination: user.desgination,
		program: user.program,
		batch: user.batch,
		bio: user.bio,
		pyear: user.pyear,
	});
	const loadData = async () => {
		try {
			dispatch({ type: "Login_START" });
			const data = await axiosInstance.get("/api/verifytoken", {
				headers: { token: localStorage.getItem("token") },
			});
			console.log(data);
			dispatch({ type: "LOGIN_SUCCESS", payload: data.data.user });
		} catch (err) {
			dispatch({ type: "LOGIN_FAILURE" });
		}
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setPersonal((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	};
	const handelSubmit = async (e) => {
		e.preventDefault();

		const allPersonal = {
			email: user.email,
			...personal,
		};
		console.log(allPersonal);
		if (file) {
			const image = new FormData();
			const filename = user.email;
			image.append("name", filename);
			image.append("file", file);
			allPersonal.photo = filename;
			console.log(allPersonal);
			try {
				const res = await axiosInstance.post("/api/upload", image);
				console.log(res);
				loadData();
			} catch (err) {
				console.log(err);
			}
		}
		try {
			const res = await axiosInstance.patch("/api/profile", allPersonal);
			if (res.data.status) {
				console.log(res.data);
				loadData();
				setErr({ status: true, message: "Saved" });
				setEdit(false);
				setErr({ status: false });
				console.log(user);
			} else {
				if (res.data.message === "err") {
					setErr({
						status: true,
						message:
							"Your " +
							Object.keys(res.data.err) +
							" " +
							res.data.err[Object.keys(res.data.err)[0]] +
							" is already taken",
					});
				}
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<div className="profile-container">
				<div className="profile-box">
					<div className="profile-head">
						<span>My Profile</span>
						<button
							className="profile-head-btn icon"
							onClick={() => setEdit((p) => !p)}
						>
							<span className="material-icons">
								{edit ? "close" : "edit"}
							</span>
						</button>
					</div>
					<div className="profile-body">
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
											disabled={!edit}
											required
											className="profile-input profile-input-img dispn"
											type="file"
											id="file"
										/>
										<label htmlFor="file">
											<img
												src={
													edit
														? file
															? URL.createObjectURL(
																	file
															  )
															: `${axiosInstance.defaults.baseURL}images/${user.photo}`
														: `${axiosInstance.defaults.baseURL}images/${user.photo}`
												}
												alt={user.name}
											/>
											{edit && (
												<span className="profile-form-input-img-edit material-icons icon">
													edit
												</span>
											)}
										</label>
									</div>
								</div>
								<div className="Col-lg-50 Col-md-50 Col-sm-100">
									<div className="profile-form-group">
										<input
											placeholder="Name"
											value={personal.name}
											disabled
											required
											type="text"
											id="name"
											name="name"
											onChange={handleChange}
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
												disabled={!edit}
												required
												type="email"
												id="email"
												name="email"
												onChange={handleChange}
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
													value={personal.phone}
													disabled={!edit}
													required
													type="tel"
													id="phone"
													name="phone"
													onChange={handleChange}
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
												value={personal.username}
												disabled={!edit}
												required
												type="text"
												id="username"
												name="username"
												onChange={handleChange}
											/>
										</div>
										<div
											className="profile-form-input-group"
											title="Short Bio"
											style={{ width: "100%" }}
										>
											<label htmlFor="username">
												<span className="material-icons">
													account_circle
												</span>
											</label>
											<input
												placeholder="Short Bio"
												value={personal.bio}
												disabled={!edit}
												required
												type="text"
												id="bio"
												name="bio"
												onChange={handleChange}
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
											value={personal.dob}
											disabled={!edit}
											required
											type="text"
											id="dob"
											name="dob"
											onChange={handleChange}
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
													: "woman"}
											</span>
										</label>
										<input
											placeholder="Gender"
											value={personal.gender}
											disabled={!edit}
											required
											type="text"
											id="gender"
											name="gender"
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="Col-lg-33 Col-md-50 Col-sm-100">
									<div
										className="profile-form-input-group"
										title="Father's Name"
									>
										<label htmlFor="fname">
											<span className="material-icons">
												supervisor_account
											</span>
										</label>
										<input
											placeholder="Father's Name"
											value={personal.fname}
											disabled={!edit}
											required
											type="text"
											id="fname"
											name="fname"
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="Col-lg-33 Col-md-50 Col-sm-100">
									<div
										className="profile-form-input-group"
										title="Mother's Name"
									>
										<label htmlFor="mname">
											<span className="material-icons">
												supervisor_account
											</span>
										</label>
										<input
											placeholder="Mother's Name"
											value={personal.mname}
											disabled={!edit}
											required
											type="text"
											id="mname"
											name="mname"
											onChange={handleChange}
										/>
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
											value={personal.currentoriginaztion}
											disabled={!edit}
											required
											type="text"
											id="currently"
											name="currently"
											onChange={handleChange}
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
											value={personal.desgination}
											disabled={!edit}
											required
											type="text"
											id="work"
											name="work"
											onChange={handleChange}
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
											value={personal.batch}
											disabled={!edit}
											required
											type="text"
											id="batch"
											name="batch"
											onChange={handleChange}
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
											value={personal.program}
											disabled={!edit}
											required
											type="text"
											id="course"
											name="course"
											onChange={handleChange}
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
											value={personal.pyear}
											disabled={!edit}
											required
											type="text"
											id="pyear"
											name="pyear"
											onChange={handleChange}
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
	/* return (
		<div className="home">
			<div className="home-main">
				<div className="profile">
					{edit ? (
						<div className="regisWrapper">
							<h1 className="regisprimary">Profile</h1>

							<div className="regis-inputgroup regis-inputgroup-profile">
								<label className="Imglabel" htmlFor="file">
									<img
										className="regisImg"
										src={`${axiosInstance.defaults.baseURL}images/${user.photo}`}
										alt={user.email}
									/>
								</label>
								<input
									disabled
									required
									className="Imgupload"
									type="file"
									id="file"
								/>
							</div>
							<div className="regiscontainer Row">
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="name">
										Name
										<span className="requiredLabel">*</span>
									</label>
									<input
										disabled
										value={user.name}
										required
										type="name"
										id="name"
										name="name"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="email">
										Email
										<span className="requiredLabel">*</span>
									</label>
									<input
										disabled
										value={user.email}
										required
										type="email"
										id="email"
										name="email"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="phone">
										Phone Number{" "}
										<span className="requiredLabel">*</span>{" "}
										<span
											style={{
												opacity: 1,
												fontSize: "1rem",
												display: "inline",
											}}
											className="material-icons"
											title="Your phone number is public. To keep it private, leave the field empty"
										>
											info_outline
										</span>{" "}
									</label>
									<input
										disabled
										value={user.phone}
										required
										type="text"
										id="phone"
										name="phone"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="name">
										Username
										<span className="requiredLabel">*</span>
									</label>
									<input
										disabled
										value={user.username}
										required
										type="text"
										id="phone"
										name="phone"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="dob">
										Date of Birth
										<span className="requiredLabel">*</span>
									</label>
									<input
										disabled
										value={user.dob}
										required
										type="text"
										id="dob"
										name="dob"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="gender">
										Gender
										<span className="requiredLabel">*</span>
									</label>
									<input
										disabled
										value={user.gender}
										required
										name="gender"
										id="gender"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="fname">
										Father's Name
										<span className="requiredLabel">*</span>
									</label>
									<input
										disabled
										value={user.fname}
										required
										type="text"
										id="fname"
										name="fname"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="mname">Mother's Name</label>
									<input
										disabled
										value={user.mname}
										type="text"
										id="mname"
										name="mname"
									/>
								</div>

								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="currently">
										Current Orginzation
										<span className="requiredLabel">*</span>
									</label>
									<input
										disabled
										value={user.currentoriginaztion}
										required
										type="text"
										id="currently"
										name="currently"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="work">
										Desgination
										<span className="requiredLabel">*</span>
									</label>
									<input
										disabled
										value={user.desgination}
										required
										type="text"
										id="work"
										name="work"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="name">
										Batch
										<span className="requiredLabel">*</span>
									</label>
									<input
										disabled
										value={user.batch}
										required
										name="batch"
										id="batch"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="course">
										Program
										<span className="requiredLabel">*</span>
									</label>
									<input
										disabled
										value={user.program}
										required
										name="course"
										id="course"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
									<label htmlFor="course">
										Passing Year
										<span className="requiredLabel">*</span>
									</label>
									<input
										disabled
										value={user.pyear}
										required
										name="course"
										id="course"
									/>
								</div>
								<div className="regis-inputgroup regis-inputgroup-profile Col-lg-100 Col-md-100 Col-sm-100">
									<label htmlFor="bio">
										Short Bio
										<span className="requiredLabel">*</span>
									</label>
									<textarea
										disabled
										value={user.bio}
										required
										rows="5"
										type="text"
										id="bio"
										name="bio"
									/>
								</div>
							</div>

							<div className="Buttongroup">
								<button
									onClick={changeProfile}
									className="aavesh-btn"
								>
									<span className="aavesh-btn-text">
										Edit
									</span>
								</button>
							</div>
						</div>
					) : (
						<div className="regisWrapper">
							<h1 className="regisprimary">
								Personal Information
							</h1>
							<form onSubmit={handelSubmit}>
								<div className="regis-inputgroup">
									<label className="Imglabel" htmlFor="file">
										<i className="fas fa-pen"></i>
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
										<label htmlFor="name">
											Name
											<span className="requiredLabel">
												*
											</span>
										</label>
										<input
											onChange={handelChange}
											required
											value={personal.name}
											type="name"
											id="name"
											name="name"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="email">
											Email
											<span className="requiredLabel">
												*
											</span>
										</label>
										<input
											disabled
											onChange={handelChange}
											value={user.email}
											type="email"
											id="email"
											name="email"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="name">
											Phone Number
											<span
												style={{
													opacity: 1,
													fontSize: "1rem",
													display: "inline",
												}}
												className="material-icons"
												title="Your phone number is public. To keep it private, leave the field empty"
											>
												info_outline
											</span>{" "}
										</label>
										<input
											onChange={handelChange}
											value={personal.phone}
											type="text"
											id="phone"
											name="phone"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="username">
											Username
											<span className="requiredLabel">
												*
											</span>
										</label>
										<input
											required
											onChange={handelChange}
											value={personal.username}
											type="text"
											id="username"
											name="username"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="dob">
											Date of Birth
											<span className="requiredLabel">
												*
											</span>
										</label>
										<input
											onChange={handelChange}
											value={personal.dob}
											required
											type="date"
											id="dob"
											name="dob"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="gender">
											Gender
											<span className="requiredLabel">
												*
											</span>
										</label>
										<select
											onChange={handelChange}
											value={personal.gender}
											required
											name="gender"
											id="gender"
										>
											<option name="course" value="">
												Select..
											</option>
											<option name="course" value="Male">
												Male
											</option>
											<option
												name="course"
												value="Female"
											>
												Female
											</option>
										</select>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="fname">
											Father's Name
											<span className="requiredLabel">
												*
											</span>
										</label>
										<input
											onChange={handelChange}
											value={personal.fname}
											required
											type="text"
											id="fname"
											name="fname"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="mname">
											Mother's Name
										</label>
										<input
											onChange={handelChange}
											value={personal.mname}
											type="text"
											id="mname"
											name="mname"
										/>
									</div>

									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="currentoriginaztion">
											Current Originzation
											<span className="requiredLabel">
												*
											</span>
										</label>
										<input
											onChange={handelChange}
											value={personal.currentoriginaztion}
											required
											type="text"
											id="currentoriginaztion"
											name="currentoriginaztion"
										/>
									</div>

									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="desgination">
											Desgination
											<span className="requiredLabel">
												*
											</span>
										</label>
										<input
											onChange={handelChange}
											required
											value={personal.desgination}
											name="desgination"
											id="desgination"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="program">
											Program
											<span className="requiredLabel">
												*
											</span>
										</label>
										<select
											onChange={handelChange}
											value={personal.program}
											required
											name="program"
											id="program"
										>
											<option name="program" value="">
												select..
											</option>
											<option name="program" value="MBA">
												MBA
											</option>
											<option name="program" value=" MCA">
												MCA
											</option>
											<option
												name="program"
												value="M.Tech"
											>
												M.Tech
											</option>
											<option
												name="program"
												value="B.Tech"
											>
												B.Tech
											</option>
											<option name="program" value="BBA">
												BBA
											</option>
											<option name="program" value="BCA">
												BCA
											</option>
											<option
												name="program"
												value="B.Pharm"
											>
												B.Pharma
											</option>
											<option name="program" value="BHM">
												BHM
											</option>
											<option
												name="program"
												value="others"
											>
												Others
											</option>
										</select>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="batch">
											Batch
											<span className="requiredLabel">
												*
											</span>
										</label>
										<input
											onChange={handelChange}
											value={personal.batch}
											required
											name="batch"
											id="batch"
										/>
									</div>
									<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
										<label htmlFor="pyear">
											Passing Year
											<span className="requiredLabel">
												*
											</span>
										</label>
										<input
											required
											className="myInput IP"
											type="number"
											name="pyear"
											id="pyear"
											min="1997"
											max="2050"
											step="1"
											onChange={handelChange}
											value={personal.pyear}
											placeholder="Passing Year"
										/>
									</div>

									<div className="regis-inputgroup Col-lg-100 Col-md-100 Col-sm-100">
										<label htmlFor="bio">
											Short Bio
											<span className="requiredLabel">
												*
											</span>
										</label>
										<textarea
											onChange={handelChange}
											value={personal.bio}
											required
											rows="5"
											type="text"
											id="bio"
											name="bio"
										/>
									</div>
								</div>

								<div className="Buttongroup">
									<button
										type="submit"
										className="aavesh-btn"
									>
										<span className="aavesh-btn-text">
											Save
										</span>
									</button>
								</div>
							</form>
						</div>
					)}
					{err.status && <SnackBar text={err.message} />}
				</div>
			</div>
		</div>
	); */
}

export default Profile;
