import TopBar from "../../components/topbar/TopBar";
import "./registration.css";
import "../profile/profile.css";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import SnackBar from "../../components/Snackbar";
import userLogo from "../../Images/user.svg";
import { Redirect, useNavigate } from "react-router-dom";
function Registration({ axiosInstance }) {
	const navigate = useNavigate();
	const { user, dispatch } = useContext(Context);
	const [err, setErr] = useState({
		status: false,
		message: "",
	});
	const programs = [
		"MBA",
		"MCA",
		"M.Tech",
		"B.Tech",
		"BBA",
		"BCA",
		"B.Pharma",
		"BHM",
		"Other (Please Specify)",
	];
	const [file, setFile] = useState(null);

	const [personal, setPersonal] = useState({
		dob: "",
		gender: "",
		fname: "",
		mname: "",
		currentoriginaztion: "",
		desgination: "",
		program: "",
		batch: "",
		bio: "",
		pyear: "2020",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;

		setPersonal((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (file) {
			const allPersonal = {
				email: user.email,
				...personal,
			};
			const image = new FormData();
			const filename = user.email;
			image.append("name", filename);
			image.append("file", file);
			allPersonal.photo = filename;
			console.log(allPersonal);
			try {
				const res = await axiosInstance.post("/api/upload", image);
				console.log(res);
				if (res.data.status) {
					try {
						const resp = await axiosInstance.patch(
							"/api/newregister",
							allPersonal
						);
						console.log(resp.data.status);
						if (resp.data.status) {
							console.log(12);
							window.location.reload();
						}
					} catch (err) {
						console.log(err);
					}
				} else {
					alert("error");
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			setErr({ status: true, message: "Please Select Image" });
		}
	};
	return (
		<>
			{err.status && <SnackBar text={err.message} />}
			<div className="profile-box">
				<div className="profile-head">
					<span>Profile Information</span>
					<div className="profile-head-btns">
						<button
							className="profile-head-btn save-btn"
							onClick={handleSubmit}
						>
							Save Profile
						</button>
					</div>
				</div>
				<div className="profile-body">
					<form className="profile-form" onSubmit={handleSubmit}>
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
										onChange={(e) => {
											setFile(e.target.files[0]);
											setErr({
												status: false,
												message: "",
											});
										}}
										className="profile-input profile-input-img dispn"
										type="file"
										id="file"
									/>
									<label htmlFor="file">
										<img
											src={
												file
													? URL.createObjectURL(file)
													: userLogo
											}
											alt={user.name}
										/>
										<span className="profile-form-input-img-edit material-icons icon">
											edit
										</span>
									</label>
								</div>
							</div>
							<div className="Col-lg-50 Col-md-50 Col-sm-100">
								<div className="profile-form-group">
									<input
										placeholder="Name"
										value={personal.name}
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
														position: "absolute",
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
												: personal.gender === "Female"
												? "woman"
												: "man_4"}
										</span>
									</label>
									<select
										placeholder="Gender"
										name="gender"
										id="gender"
										required
										value={personal.gender}
										onChange={handleChange}
									>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
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
										required
										type="text"
										id="currentoriginaztion"
										name="currentoriginaztion"
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
										required
										type="text"
										id="desgination"
										name="desgination"
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
									<select
										placeholder="Program"
										value={personal.program}
										required
										type="text"
										id="program"
										name="program"
										onChange={handleChange}
									>
										{programs.map((program, index) => (
											<option
												key={index}
												name="program"
												value={program}
											>
												{program}
											</option>
										))}
									</select>
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
				{/* <div className="regis-inputgroup">
						<label className="Imglabel" htmlFor="file">
							<i className="fas fa-pen"></i>
							<img
								className="regisImg"
								src={
									file ? URL.createObjectURL(file) : userLogo
								}
								alt={user.email}
							/>
						</label>
						<input
							onChange={(e) => {
								setFile(e.target.files[0]);
								setErr({ status: false, message: "" });
							}}
							className="Imgupload"
							type="file"
							id="file"
						/>
					</div>
					<div className="regiscontainer Row">
						<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
							<label htmlFor="name">
								Name<span className="requiredLabel">*</span>
							</label>
							<input
								disabled
								value={user.name}
								type="name"
								id="name"
								name="name"
							/>
						</div>
						<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
							<label htmlFor="email">
								Email<span className="requiredLabel">*</span>
							</label>
							<input
								disabled
								value={user.email}
								type="email"
								id="email"
								name="email"
							/>
						</div>
						<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
							<label htmlFor="name">
								Phone Number
								<span className="requiredLabel">*</span>
							</label>
							<input
								disabled
								value={user.phone}
								type="text"
								id="phone"
								name="phone"
							/>
						</div>
						<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
							<label htmlFor="username">
								Username<span className="requiredLabel">*</span>
							</label>
							<input
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
								<span className="requiredLabel">*</span>
							</label>
							<input
								onChange={handleChange}
								value={personal.dob}
								required
								type="date"
								id="dob"
								name="dob"
							/>
						</div>
						<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
							<label htmlFor="gender">
								Gender<span className="requiredLabel">*</span>
							</label>
							<select
								onChange={handleChange}
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
								<option name="course" value="Female">
									Female
								</option>
							</select>
						</div>
						<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
							<label htmlFor="fname">
								Father's Name
								<span className="requiredLabel">*</span>
							</label>
							<input
								onChange={handleChange}
								value={personal.fname}
								required
								type="text"
								id="fname"
								name="fname"
							/>
						</div>
						<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
							<label htmlFor="mname">Mother's Name</label>
							<input
								onChange={handleChange}
								value={personal.mname}
								type="text"
								id="mname"
								name="mname"
							/>
						</div>

						<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
							<label htmlFor="currentoriginaztion">
								Current Originzation
								<span className="requiredLabel">*</span>
							</label>
							<input
								onChange={handleChange}
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
								<span className="requiredLabel">*</span>
							</label>
							<input
								onChange={handleChange}
								required
								name="desgination"
								id="desgination"
							/>
						</div>
						<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
							<label htmlFor="program">
								Program<span className="requiredLabel">*</span>
							</label>
							<select
								onChange={handleChange}
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
								<option name="program" value="M.Tech">
									M.Tech
								</option>
								<option name="program" value="B.Tech">
									B.Tech
								</option>
								<option name="program" value="BBA">
									BBA
								</option>
								<option name="program" value="BCA">
									BCA
								</option>
								<option name="program" value="B.Pharm">
									B.Pharm
								</option>
								<option name="program" value="BHM">
									BHM
								</option>
								<option name="program" value="others">
									Others
								</option>
							</select>
						</div>
						<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
							<label htmlFor="batch">
								Batch<span className="requiredLabel">*</span>
							</label>
							<input
								onChange={handleChange}
								value={personal.batch}
								required
								name="batch"
								id="batch"
							/>
						</div>
						<div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
							<label htmlFor="pyear">
								Passing Year
								<span className="requiredLabel">*</span>
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
								onChange={handleChange}
								value={personal.pyear}
								placeholder="Passing Year"
							/>
						</div>

						<div className="regis-inputgroup Col-lg-100 Col-md-100 Col-sm-100">
							<label htmlFor="bio">
								Short Bio
								<span className="requiredLabel">*</span>
							</label>
							<textarea
								onChange={handleChange}
								value={personal.bio}
								required
								rows="5"
								type="text"
								id="bio"
								name="bio"
							/>
						</div>
					</div> */}
			</div>
		</>
	);
}

export default Registration;
