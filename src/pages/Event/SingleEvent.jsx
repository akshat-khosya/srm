import React from "react";
import DispEvent from "./DispEvent";

function SingleEvent({ event, axiosInstance, openEvent }) {
	return (
		<div className="Row">
			{event.map((e, index) => (
					<DispEvent
						e={e}
						openEvent={openEvent}
						axiosInstance={axiosInstance}
					/>
			))}
		</div>
	);
}

export default SingleEvent;
