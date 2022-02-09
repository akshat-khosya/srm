import React from "react";
import DispEvent from "./DispEvent";

function SingleEvent({ event, axiosInstance, openEvent,load }) {
	return (
		<div className="Row">
			{event.map((e, index) => (
					<DispEvent
						load={load}
						e={e}
						openEvent={openEvent}
						axiosInstance={axiosInstance}
					/>
			))}
		</div>
	);
}

export default SingleEvent;
