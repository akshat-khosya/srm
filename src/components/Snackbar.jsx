import React, { useState } from "react";

const SnackBar = ({ text, err }) => {
	const [open, setOpen] = useState(true);
	if(err){
		setOpen(!err);
	}
	return (
		<>
			{open && (
				<div
					className="snackbar"
					data-aos="fade-up"
					data-aos-duration="250"
				>
					<span className="snackbar-text">{text}</span>
				</div>
			)}
		</>
	);
};

export default SnackBar;
