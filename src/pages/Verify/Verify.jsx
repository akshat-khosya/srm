import React, { useState } from "react";
import "./verify.css";

const Verify = () => {
	const [users, setUsers] = useState([]);
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
	return (
		<div className="verify-container">
			<div className="verify-box">
				<div className="verify-head">Verify Users</div>
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
									<td>{user.name}</td>
									<td>{user.email}</td>
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
		</div>
	);
};

export default Verify;
