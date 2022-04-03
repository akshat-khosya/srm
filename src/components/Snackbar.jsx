import React, { useState } from "react";

const SnackBar = ({ text, err, color = "var(--red)" }) => {
	const [open, setOpen] = useState(true);
	if (err) {
		setOpen(!err);
	}
	return (
		<>
			{open && (
				<div className="snackbar" style={{ backgroundColor: color }}>
					<span className="snackbar-text">{text}</span>
				</div>
			)}
		</>
	);
};

export default SnackBar;
