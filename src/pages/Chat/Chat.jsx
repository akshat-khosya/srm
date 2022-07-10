import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import groupFallbackIcon from "../../Images/group_icon.svg";
import "./chat.css";

const onlySpaces = (str) => str.trim().length === 0;

const Chat = () => {
	const { groupName } = useParams();
	const { user } = useContext(Context);
	const navigate = useNavigate();
	const [group, setGroup] = useState({
		title: "Developers",
		subtitle: "The group of web devs",
		icon: "akshatmittal61-group-developers.jpg",
		admin: "akshatmittal2506@gmail.com",
		description:
			"This is a group of all developers which mainly focuses on Web development but an open source community always welcomes everyone",
		members: [],
	});
	const [groupIcon, setGroupIcon] = useState(
		`https://tegniescorporation.tech/images/${group.icon}`
	);
	const [messages, setMessages] = useState([
		{
			user: "akshatmittal2506@gmail.com",
			name: "Akshat Mittal",
			message: "Test message 1",
		},
		{
			user: "akshatdps12@gmail.com",
			name: "Akshat Khosya",
			message: "Test 2",
		},
		{
			user: "20107@iiitu.ac.in",
			name: "Akshat Mittal",
			message: "This is a test message 3",
		},
		{
			user: "20106@iiitu.ac.in",
			name: "Akshat",
			message: "This message 4",
		},
	]);
	const [message, setMessage] = useState("");
	const [file, setFile] = useState(null);
	const handleChange = (e) => {
		setMessage(e.target.value);
	};
	const handleFile = (e) => {
		setFile(e.target.files[0]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (message !== "" && !onlySpaces(message)) {
			setMessages((prev) => {
				return [
					...prev,
					{
						user: user.email,
						name: user.name,
						message: message,
					},
				];
			});
			setMessage("");
		}
	};
	useEffect(() => {
		const chatBotContainer = document.querySelector(".chat-body-container");
		chatBotContainer.scrollTop = chatBotContainer.scrollHeight;
	}, [messages]);

	function urlify(text) {
		const urlRegex = /(https?:\/\/[^\s]+)/g;
		return text.split(urlRegex).map((part) => {
			if (part.match(urlRegex)) {
				return (
					<a target="_blank" href={part}>
						{part}
					</a>
				);
			}
			return part;
		});
	}

	return (
		<section className="chat-container">
			<div className="chat-box">
				<div className="chat-head">
					<div className="chat-head-back">
						<button className="icon" onClick={() => navigate(-1)}>
							<span className="material-icons">arrow_back</span>
						</button>
					</div>
					<div className="chat-head-icon">
						<img
							src={groupIcon}
							alt={group.title}
							onError={() => {
								setGroupIcon(groupFallbackIcon);
							}}
						/>
					</div>
					<div className="chat-head-name">
						<span>{group.title}</span>
					</div>
				</div>
				<div className="chat-body">
					<div className="chat-body-container">
						{messages.map((msg, index) => (
							<div className="chat-message" key={index}>
								<a
									href={`mailto:${msg.user}`}
									target="_blank"
									rel="noreferrer"
									className="chat-message-user"
								>
									{msg.name}
								</a>
								<span className="chat-message-msg">
									{/* {msg.message} */}
									{urlify(msg.message)}
								</span>
							</div>
						))}
					</div>
				</div>
				<div className="chat-foot">
					<form onSubmit={handleSubmit}>
						<label htmlFor="file">
							<input
								type="file"
								name="file"
								id="file"
								value={file}
								onChange={handleFile}
							/>
							<span className="material-icons icon">
								attach_file
							</span>
						</label>
						<input
							type="text"
							name="message"
							value={message}
							onChange={handleChange}
							placeholder="Your Message Here"
							autoFocus
						/>
						<button type="submit" className="icon">
							<span className="material-icons">send</span>
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Chat;
