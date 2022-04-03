import React, { useEffect, useState } from "react";
import ResetPopup from "./ResetPopup/ResetPopup";
import UserProfile from "./UserProfile/UserProfile";
import "./verify.css";

const Verify = ({ axiosInstance }) => {
	useEffect(()=>{
		loadData();
	},[])
	const [openUserProfileEmail, setOpenUserProfileEmail] = useState("");
	const loadData=async()=>{
		try {
			const res=await axiosInstance.get("/api/userstatus/");
			setUsers(res.data.users);
		} catch (err) {
			console.log(err);
		}
	}
	const [users, setUsers] = useState([]);
	const [openResetPswdBox, setOpenResetPswdBox] = useState(false);
	const [openUserProfilePopup, setOpenUserProfilePopup] = useState(false);
	const handleStatus = async(id) => {
		try {
			const data={
				email:users[id].email,
				status:!users[id].status
			};
			const res=await axiosInstance.post("/api/verifystatus/",data);
			if(res.data.status){
				loadData();
			}else{
				alert("err");
			}
		} catch (err) {
			console.log(err);
		}
	};
	const openUser = (emailId) => {
		setOpenUserProfilePopup(true);
		setOpenUserProfileEmail(emailId);
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
								<tr className="verify-table-tr" key={index}>
									<td>{index + 1}</td>
									<td onClick={()=>{
										setOpenUserProfilePopup(true);
										setOpenUserProfileEmail(user.email);
									}}>{user.name}</td>
									<td onClick={()=>{
										setOpenUserProfilePopup(true);
										setOpenUserProfileEmail(user.email);
									}}>{user.email}</td>
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
				<ResetPopup axiosInstance={axiosInstance} close={() => setOpenResetPswdBox(false)} />
			)}
			{openUserProfilePopup && (
				<UserProfile
					axiosInstance={axiosInstance}
					close={() => setOpenUserProfilePopup(false)}
					userEmail={openUserProfileEmail}
				/>
			)}
		</div>
	);
};

export default Verify;
