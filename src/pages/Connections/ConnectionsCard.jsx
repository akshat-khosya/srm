import React, { useContext } from "react";
import { Context } from "../../context/Context";

const ConnectionsCard = ({ person, included, handleConnect,axiosInstance }) => {
	console.log(included);
	const {user}=useContext(Context);
	const connectionClick=()=>{
		const cardData={
			email:user.email,
			userEmail:person.email,
			included:included,
			name:person.name
		}
		handleConnect(cardData);
	}
	return (
		<div className="connections-card">
			<div
				className="connections-card-box"
				style={{
					backgroundImage: `url(http://www.transparenttextures.com/patterns/skulls.png)`,
				}}
			>
				<div
					className="connections-card-image"
					style={{
						backgroundImage: `url(${axiosInstance.defaults.baseURL}images/${person.email})`,
					}}
				></div>
				<div className="connections-card-content">
					<span
						
						className="connections-card-content__name"
					>
						{person.name}
					</span>
					<span
						
						className="connections-card-content__username"
					>
						{person.username}
					</span>
					<span className="connections-card-content__about">
						{person.role}
					</span>
					<button
						className="connections-card-btn"
						onClick={connectionClick}
					>
						{included ? "Unfollow" : "Connect"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConnectionsCard;
