import React, { useState } from "react";
import ResetPopup from "./ResetPopup/ResetPopup";
import UserProfile from "./UserProfile/UserProfile";
import "./verify.css";

const Verify = ({ axiosInstance }) => {
	const [users, setUsers] = useState([
		{
			name: "Akshat Mittal",
			email: "akshatmittal2506@gmail.com",
			status: true,
		},
		{
			name: "Akshat Khosya",
			email: "akshatdps12@gmail.com",
			status: false,
		},
	]);
	const [openResetPswdBox, setOpenResetPswdBox] = useState(false);
	const [openUserProfilePopup, setOpenUserProfilePopup] = useState(false);
	const handleStatus = (id) => {
		setUsers(
			users.map((user, index) =>
				index === id
					? {
							...user,
							status: !user.status,
					  }
					: user
			)
		);
	};
	const openUser = () => {
		setOpenUserProfilePopup(true);
	};
	return (
		<div className="verify-container">
			<div className="verify-box">
				<div className="verify-head">Verify Users</div>
				<div className="verify-body">
					<div className="verify-status">
						<button
							className="verify-status-btn verify-status-btn-blue"
							style={{ margin: "0 auto", fontSize: "1.25rem" }}
							onClick={() => setOpenResetPswdBox(true)}
						>
							<span className="material-icons">restart_alt</span>
							<span>Reset Password</span>
						</button>
					</div>
				</div>
				<div className="verify-body">
					<table className="verify-table">
						<thead className="verify-table-head">
							<tr className="verify-table-tr">
								<th>S. No.</th>
								<th>Name</th>
								<th>Email</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody className="verify-table-body">
							{users.map((user, index) => (
								<tr className="verify-table-tr">
									<td>{index + 1}</td>
									<td onClick={openUser}>{user.name}</td>
									<td onClick={openUser}>{user.email}</td>
									<td>
										<div className="verify-status">
											<button
												className={`verify-status-btn verify-status-btn-${
													user.status
														? "green"
														: "red"
												}`}
												onClick={() =>
													handleStatus(index)
												}
											>
												<span className="material-icons">
													{user.status
														? "done"
														: "close"}
												</span>
												<span>
													{user.status
														? "Verified"
														: "Unverified"}
												</span>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{openResetPswdBox && (
				<ResetPopup close={() => setOpenResetPswdBox(false)} />
			)}
			{openUserProfilePopup && (
				<UserProfile
					axiosInstance={axiosInstance}
					close={() => setOpenUserProfilePopup(false)}
				/>
			)}
		</div>
	);
};

export default Verify;
