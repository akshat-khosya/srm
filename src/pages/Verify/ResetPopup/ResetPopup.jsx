import React, { useState } from "react";
import SnackBar from "../../../components/Snackbar";
import "./reset-popup.css";

const ResetPopup = ({ close }) => {
	const [newUser, setNewUser] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [open, setOpen] = useState(false);
	const [snackText, setSnackText] = useState("");
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewUser({
			...newUser,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(newUser);
		const { email, password, confirmPassword } = newUser;
		if (password !== confirmPassword) {
			console.log(email);
			setSnackText("Passwords do not match");
			setOpen(true);
			setTimeout(() => {
				setOpen(false);
			}, 3500);
		} else {
			setNewUser({
				email: "",
				password: "",
				confirmPassword: "",
			});
			close();
		}
	};
	return (
		<div className="reset-popup">
			<div className="reset-popup-box" data-aos="zoom-in">
				<div className="reset-popup-head">
					<button className="reset-popup-head-close" onClick={close}>
						<span className="material-icons">close</span>
					</button>
				</div>
				<div className="reset-popup-body">
					<form className="reset-popup-form" onSubmit={handleSubmit}>
						<div className="reset-popup-form-group">
							<label>Email</label>
							<input
								type="email"
								name="email"
								placeholder="Enter email"
								value={newUser.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="reset-popup-form-group">
							<label>New Password</label>
							<input
								type="password"
								name="password"
								placeholder="New Password"
								value={newUser.password}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="reset-popup-form-group">
							<label>Confirm Password</label>
							<input
								type="password"
								name="confirmPassword"
								placeholder="Enter New Password again"
								value={newUser.confirmPassword}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="reset-popup-form-group">
							<button
								className="reset-popup-btn reset-popup-btn-outline"
								onClick={close}
							>
								Cancel
							</button>
							<button className="reset-popup-btn" type="submit">
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
			{open && <SnackBar text={snackText} />}
		</div>
	);
};

export default ResetPopup;
