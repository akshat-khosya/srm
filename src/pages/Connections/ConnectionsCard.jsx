import React from "react";

const ConnectionsCard = ({ person, included, handleConnect }) => {
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
						backgroundImage: `url(${person.image})`,
					}}
				></div>
				<div className="connections-card-content">
					<span
						to={`/people/${person.username}`}
						className="connections-card-content__name"
					>
						{person.name}
					</span>
					<span
						to={`/people/${person.username}`}
						className="connections-card-content__username"
					>
						{person.username}
					</span>
					<span className="connections-card-content__about">
						{person.about}
					</span>
					<button
						className="connections-card-btn"
						onClick={() => handleConnect(person.username)}
					>
						{included ? "Unfollow" : "Connect"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConnectionsCard;
