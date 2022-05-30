import React, { useContext, useState } from "react";
import ProfilePopup from "../../components/ProfilePopup/ProfilePopup";
import { Context } from "../../context/Context";
import favicon from "../../Images/logo.png";

const ConnectionsCard = ({
	person,
	included,
	handleConnect,
	axiosInstance,
}) => {
	const { user } = useContext(Context);
	const connectionClick = () => {
		const cardData = {
			email: user.email,
			userEmail: person.email,
			included: included,
			name: person.name,
		};
		handleConnect(cardData);
	};
	const [openProfilePopup, setOpenProfilePopup] = useState(false);
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
						backgroundImage:
							`url(${axiosInstance.defaults.baseURL}images/${person.email})` ||
							favicon,
					}}
					onClick={() => setOpenProfilePopup(true)}
				></div>
				<div className="connections-card-content">
					<span className="connections-card-content__name">
						{person.name}
					</span>
					<span className="connections-card-content__username">
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
			{openProfilePopup && (
				<ProfilePopup
					axiosInstance={axiosInstance}
					userEmail={person.email}
					close={() => setOpenProfilePopup(false)}
				/>
			)}
		</div>
	);
};

export default ConnectionsCard;
