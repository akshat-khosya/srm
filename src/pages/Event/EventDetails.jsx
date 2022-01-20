import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";

const EventDetails = ({ close, load, Event, axiosInstance, submitEvent }) => {
	const { user } = useContext(Context);
	const [event, setEvent] = useState({ ...Event });
	const [file, setFile] = useState(null);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setEvent({
			...event,
			[name]: value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const eventData = {
			email: user.email,
			author: user.author,
			title: event.title,
			date: event.date,
			time: event.time,
			category1: event.category1,
			category2: event.category2,
			desc: event.desc,
			id:event._id
		};
		if (file) {
			const image = new FormData();
			const filename = Date.now() + file.name;
			image.append("name", filename);
			image.append("file", file);
			eventData.photo = filename;
			console.log(eventData);
			try {
				const res = await axiosInstance.post("/api/upload", image);
				console.log(res);
			} catch (err) {
				console.log(err);
			}
		}
		try {
			const res = await axiosInstance.patch("/api/event/", eventData);
			console.log(res);
			if (res.data.status) {
				load();
				alert(res.data.message);
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
			}
		} catch (err) {
			console.log(err);
		}
	};
	const [userValid, setUserValid] = useState(user.email===event.email?true:false);
	return (
		<div className="event-popup">
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
							readOnly={!userValid}
						/>
						<textarea
							className="event-popup-form__input"
							name="desc"
							value={event.desc}
							onChange={handleChange}
							placeholder="Event Content"
							rows={5}
							readOnly={!userValid}
						></textarea>
						{userValid && (
							<>
								<label htmlFor="image">Upload Image: </label>
								<input
									className="event-popup-form__input"
									name="image"
									value={event.image}
									onChange={(e) => {
										setFile(e.target.files[0]);
									}}
									placeholder="Event Image"
									type="file"
									readOnly={!userValid}
								/>
							</>
						)}
						<div className="event-popup-form-group">
							<input
								className="event-popup-form__input"
								name="date"
								type="date"
								value={event.date}
								onChange={handleChange}
								placeholder="Event Date"
								required
								readOnly={!userValid}
							/>
							<input
								className="event-popup-form__input"
								name="time"
								type="time"
								value={event.time}
								onChange={handleChange}
								placeholder="Event Time"
								required
								readOnly={!userValid}
							/>
						</div>
						<div className="event-popup-form-group">
							<input
								className="event-popup-form__input"
								name="category1"
								type="text"
								value={event.category1}
								onChange={handleChange}
								placeholder="Event Type 1"
								list="typeSuggestions1"
								required
								readOnly={!userValid}
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
								name="category2"
								type="text"
								value={event.category2}
								onChange={handleChange}
								placeholder="Event Type 2"
								list="typeSuggestions2"
								required
								readOnly={!userValid}
							/>
							<datalist id="typeSuggestions2">
								<option value="birthday" />
								<option value="anniversary" />
								<option value="meeting" />
								<option value="festival" />
								<option value="ceremony" />
							</datalist>
						</div>
						{userValid && (
							<button className="aavesh-btn" type="submit">
								<span className="aavesh-btn-text">
									Save Changes
								</span>
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default EventDetails;
