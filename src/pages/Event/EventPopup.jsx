import React, { useState } from "react";

const EventPopup = ({ close, submitEvent }) => {
	const currentDate = `${new Date().getFullYear()}-${
		new Date().getMonth() < 9
			? "0" + (new Date().getMonth() + 1)
			: new Date().getMonth() + 1
	}-${
		new Date().getDate() < 10
			? "0" + new Date().getDate()
			: new Date().getDate()
	}`;
	const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
	const [event, setEvent] = useState({
		title: "",
		content: "",
		date: currentDate,
		time: currentTime,
		image: "",
		type1: "",
		type2: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setEvent({
			...event,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		submitEvent(event);
		setEvent({
			title: "",
			content: "",
			date: "",
			time: "",
			image: "",
			type1: "",
			type2: "",
		});
	};
	return (
		<section className="event-popup">
			<div className="event-popup-box" data-aos="zoom-in">
				<div className="event-popup-head">
					<button className="icon" onClick={close}>
						<span className="material-icons">close</span>
					</button>
				</div>
				<div className="event-popup-body">
					<form className="event-popup-form" onSubmit={handleSubmit}>
						<input
							className="event-popup-form__input"
							name="title"
							value={event.title}
							onChange={handleChange}
							placeholder="Event Title"
							required
							type="text"
						/>
						<textarea
							className="event-popup-form__input"
							name="content"
							value={event.content}
							onChange={handleChange}
							placeholder="Event Content"
							rows={5}
						></textarea>
						<label htmlFor="image">Upload Image: </label>
						<input
							className="event-popup-form__input"
							name="image"
							value={event.image}
							onChange={handleChange}
							placeholder="Event Image"
							type="file"
						/>
						<div className="event-popup-form-group">
							<input
								className="event-popup-form__input"
								name="date"
								type="date"
								value={event.date}
								onChange={handleChange}
								placeholder="Event Date"
								required
							/>
							<input
								className="event-popup-form__input"
								name="time"
								type="time"
								value={event.time}
								onChange={handleChange}
								placeholder="Event Time"
								required
							/>
						</div>
						<div className="event-popup-form-group">
							<input
								className="event-popup-form__input"
								name="type1"
								type="text"
								value={event.type1}
								onChange={handleChange}
								placeholder="Event Type 1"
								list="typeSuggestions1"
								required
							/>
							<datalist id="typeSuggestions1">
								<option value="birthday" />
								<option value="anniversary" />
								<option value="meeting" />
								<option value="festival" />
								<option value="ceremony" />
							</datalist>
							<input
								className="event-popup-form__input"
								name="type2"
								type="text"
								value={event.type2}
								onChange={handleChange}
								placeholder="Event Type 2"
								list="typeSuggestions2"
								required
							/>
							<datalist id="typeSuggestions2">
								<option value="birthday" />
								<option value="anniversary" />
								<option value="meeting" />
								<option value="festival" />
								<option value="ceremony" />
							</datalist>
						</div>
						<button className="aavesh-btn" type="submit">
							<span className="aavesh-btn-text">Add Event</span>
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default EventPopup;
