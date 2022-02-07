import React from "react";
import "./fake.css";
function Fake({ axiosInstance }) {
	return (
		<div className="home">
			<div className="home-main">
				<div className="home-container">
					<div className="fake">
						We are coming soon.
						<br />
						<span>Stay Connected...</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Fake;
