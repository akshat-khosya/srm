import React, { useState } from "react";

const SnackBar = ({ text, err = false, color = "var(--red)" }) => {
	const [transform, setTransform] = useState(-100);
	setInterval(() => {
		setTransform(0);
	}, 1);
	return (
		<div
			className="snackbar"
			style={{
				backgroundColor: color,
				transition: "all 0.2s ease-in-out",
				transform: `translateX(${transform}%)`,
			}}
		>
			<span className="snackbar-text">{text}</span>
		</div>
	);
};

export default SnackBar;
