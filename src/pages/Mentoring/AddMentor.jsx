import React, { useContext, useState } from "react";
import SnackBar from "../../components/Snackbar";
import { Context } from "../../context/Context";

const AddMentor = ({ close, save ,axiosInstance}) => {
	const {user}=useContext(Context);
	const [mentorData, setMentorData] = useState({
		email: user.email,
		name: user.name,
		interests: [],
		current: "",
		mode: "",
		frequency: "",
	});
	const [snackMsg, setSnackMsg] = useState("");
	const [open, setOpen] = useState(false);
	const [snackColor, setSnackColor] = useState("var(--red)");
	const currOptions = [
		"Technology",
		"Buisness",
		"Legal",
		"HR",
		"Finance",
		"Marketing",
		"Innovation",
		"Research",
		"Design",
		"Investment",
		"Intellectual Property",
		"Social Media",
	];
	const mentorOptions = [
		"Academic Mentor",
		"Professional Mentor",
		"Enterpreneur",
		"Career Development",
	];
	const freqOptions = ["Weekly", "Fortnightly", "Monthly"];
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "interests") {
			let newMent = [...mentorData.interests];
			if (mentorData.interests.includes(e.target.value)) {
				newMent = mentorData.interests.filter((item) => item !== value);
			} else newMent = [...newMent, value];
			setMentorData({
				...mentorData,
				interests: newMent,
			});
		} else
			setMentorData({
				...mentorData,
				[name]: value,
			});
	};
	const handleSubmit = async(e) => {
		e.preventDefault();
		if (
			mentorData.interests.length === 0 ||
			mentorData.mode === "" ||
			mentorData.frequency === "" ||
			mentorData.current === "" ||
			mentorData.current === "Choose One" ||
			mentorData.mode === "Choose One"
		) {
			setSnackColor("var(--red)");
			setSnackMsg("Please select at least one choice in every field");
			setOpen(true);
			setTimeout(() => {
				setOpen(false);
			}, 3500);
		} else {
			console.log(mentorData);

			try {
				const res = await axiosInstance.post("/api/mentoring/", mentorData);
				console.log(res);
				if(res.data.status){
					alert(res.data.message);
				}
			} catch (err) {
				console.log(err);
			}
			setSnackColor("var(--blue)");
			setSnackMsg("Submission Successful");
			setOpen(true);
			setTimeout(() => {
				setOpen(false);
			}, 3500);
			close();
			setMentorData({
				email: "",
				name: "",
				interests: [],
				current: "",
				mode: "",
				frequency: "",
			});
		}
	};
	return (
		<div className="mentoring-add">
			<div className="mentoring-add-box" data-aos="zoom-in">
				<div className="mentoring-add-head">
					<button
						className="mentoring-add-head-close"
						onClick={close}
					>
						<span className="material-icons">close</span>
					</button>
				</div>
				<div className="mentoring-add-body">
					<form
						className="mentoring-add-form"
						onSubmit={handleSubmit}
					>
						<div className="mentoring-add-form-group">
							<label htmlFor="email">Name</label>
							<input
								type="text"
								name="name"
								placeholder="Name"
								value={mentorData.name}
								
								disabled
							/>
						</div>
						<div className="mentoring-add-form-group">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={mentorData.email}
								disabled
							/>
						</div>
						<div className="mentoring-add-form-group">
							<label htmlFor="email">Mentor Interests</label>
							<div className="mentoring-add-interests-group">
								{mentorOptions.map((item, index) => (
									<label key={index}>
										<input
											type="checkbox"
											name="interests"
											placeholder={item}
											value={item}
											onChange={handleChange}
											checked={mentorData.interests.includes(
												item
											)}
										/>
										{item}
									</label>
								))}
							</div>
						</div>
						<div className="mentoring-add-form-group">
							<label htmlFor="email">
								Your current area of work
							</label>
							<select
								type="text"
								name="current"
								placeholder="Email"
								value={mentorData.current}
								onChange={handleChange}
								required
							>
								<option hidden>Choose One</option>
								{currOptions.map((item, index) => (
									<option value={item} key={index}>
										{item}
									</option>
								))}
							</select>
						</div>
						<div className="mentoring-add-form-group">
							<label htmlFor="email">
								How would you prefer to mentor
							</label>
							<select
								type="text"
								name="mode"
								value={mentorData.mode}
								placeholder="Email"
								onChange={handleChange}
								required
							>
								<option hidden>Choose One</option>
								<option value="Online">Online</option>
								<option value="In-person">In-person</option>
								<option value="Both">Both Online and In-person</option>
							</select>
						</div>
						<div className="mentoring-add-form-group">
							<label htmlFor="email">
								Your preferred frequency of mentoring would be
							</label>
							{freqOptions.map((item, index) => (
								<label key={index}>
									<input
										type="radio"
										name="frequency"
										placeholder={item}
										value={item}
										onChange={handleChange}
										checked={mentorData.frequency === item}
									/>
									{item}
								</label>
							))}
						</div>
						<div className="mentoring-add-form-group">
							<button
								onClick={close}
								className="mentoring-add-btn mentoring-add-btn-outline"
							>
								Cancel
							</button>
							<button type="submit" className="mentoring-add-btn">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
			{open && <SnackBar text={snackMsg} color={snackColor} />}
		</div>
	);
};

export default AddMentor;
