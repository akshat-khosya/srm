import React, { useEffect } from "react";
import "./event.css";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import logo from "../../Images/post.jpg";
import EventPopup from "./EventPopup";
import axios from "axios";
import SingleEvent from "./SingleEvent";
import EventDetails from "./EventDetails";
function Event() {
	const [event, setEvent] = useState([]);
	const [eventPopupBox, setEventPopupBox] = useState(false);
	const [eventDetailsBox, setEventDetailsBox] = useState(false);
	const [eventToDisplay, setEventToDisplay] = useState({});
	const addEvent = (a) => {
		console.log(a);
		setEventPopupBox(false);
	};
	const editEvent = (a) => {
		console.log(a);
		setEventPopupBox(false);
	};
	const axiosInstance = axios.create({
		baseURL: "http://localhost:4000",
	});
	const loadData = async () => {
		try {
			const data = await axiosInstance.get("/api/event");
			console.log(data);
			setEvent(data.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		loadData();
	}, []);
	const [classname, setClassname] = useState(
		window.innerWidth > 1200 ? "Col-lg-83" : " Col-lg-83"
	);
	return (
		<div className="home">
			<div className="Row">
				<Sidebar />
				<div className={classname}>
					<div className="home-main">
						<Navbar />
						<div className="home-container">
							<div className="event">
								{eventPopupBox && (
									<EventPopup
										load={loadData}
										close={() => setEventPopupBox(false)}
										submitEvent={(a) => {
											addEvent(a);
										}}
										axiosInstance={axiosInstance}
									/>
								)}
								{eventDetailsBox && (
									<EventDetails
										Event={eventToDisplay}
										close={() => {
											setEventDetailsBox(false);
											console.log("Close");
										}}
										submitEvent={(a) => {
											editEvent(a);
										}}
										load={loadData}
										axiosInstance={axiosInstance}
									/>
								)}
								<div className="event-heading">Events</div>
								<div className="new-Event">
									<button
										type="submit"
										className="aavesh-btn"
										onClick={() => setEventPopupBox(true)}
									>
										<span className="aavesh-btn-text">
											Create Event
										</span>
									</button>
								</div>
								<div className="events">
									<SingleEvent
										event={event}
										axiosInstance={axiosInstance}
										openEvent={(eve) => {
											setEventToDisplay(eve);
											setEventDetailsBox(true);
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Event;
