import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import "./profile.css";

function Profile({ axiosInstance }) {
	const [edit, setEdit] = useState(false);
	const [showSaveBtn, setShowSaveBtn] = useState(false);
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
		if (!showSaveBtn) setShowSaveBtn((p) => !p);
		const { name, value } = e.target;
		console.log(name, value);
		setPersonal((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	};
	const handleSubmit = async (e) => {
		e?.preventDefault();
		setShowSaveBtn(() => false);
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
	useEffect(() => {
		if (!edit) setShowSaveBtn(false);
	}, [edit]);

	return (
		<>
			<div className="profile-container">
				<div className="profile-box">
					<div className="profile-head">
						<span>My Profile</span>
						<div className="profile-head-btns">
							<button
								className="profile-head-btn icon"
								onClick={() => setEdit((p) => !p)}
							>
								<span className="material-icons">
									{edit ? "close" : "edit"}
								</span>
							</button>
							{showSaveBtn && (
								<button
									className="profile-head-btn save-btn"
									onClick={handleSubmit}
								>
									Save Profile
								</button>
							)}
						</div>
					</div>
					<div className="profile-body" onSubmit={handleSubmit}>
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
											onChange={(e) => {
												setFile(e.target.files[0]);
												if (!showSaveBtn)
													setShowSaveBtn((p) => !p);
											}}
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
											disabled={!edit}
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
												disabled
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
													<span
														style={{
															fontSize: "1rem",
															position:
																"absolute",
															top: 0,
															right: 0,
															transform:
																"translate(0.5rem,-0.5rem)",
														}}
														className="material-icons"
														title="Your phone number is public. To keep it private, leave the field empty"
													>
														tips_and_updates
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
													lightbulb
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
											type="date"
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
												{personal.gender === "Male"
													? "man"
													: personal.gender ===
													  "Female"
													? "woman"
													: "man_4"}
											</span>
										</label>
										<select
											placeholder="Gender"
											name="gender"
											id="gender"
											disabled={!edit}
											required
											value={personal.gender}
											onChange={handleChange}
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
}

export default Profile;
