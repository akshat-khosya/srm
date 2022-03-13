import React from "react";
import { admin } from "../../globalVariable.js";
import deniedSvg from "../../Images/denied.svg";
import "./access-denied.css";

const AccessDenied = () => {
	return (
		<div className="access-denied-container">
			<div className="access-denied-head">Not Authorized</div>
			<div className="access-denied-body">
				<img src={deniedSvg} alt="Access Denied" />
			</div>
			<div className="access-denied-foot">
				<span>You're not an admin</span>
				<span>
					Contact the admin for any changes to your account
					credentials at <a href={`mailto:${admin}`}>{admin}</a>.
				</span>
			</div>
		</div>
	);
};

export default AccessDenied;
