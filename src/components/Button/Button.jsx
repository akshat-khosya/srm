import React from "react";
import "./button.css";

function Button(props) {
	let classs=`${props.classs} aavesh-btn`
	return (
		<>
			{props.link ? (
				<button className={props.classs}>
					<a
						target={props.target && props.target}
						href={props.link}
						className="aavesh-btn"
					>
						<span className="aavesh-btn-text">
							{props.text ? props.text : "Button"}
						</span>
					</a>
				</button>
			) : (
				<button type={props.type && props.type} className={classs}>
					<span className="aavesh-btn-text">
						{props.text ? props.text : "Button"}
					</span>
				</button>
			)}
		</>
	);
}

export default Button;
