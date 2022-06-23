import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import groupFallbackIcon from "../../Images/group_icon.svg";
import "./chat.css";

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
	const handleChange = (e) => {
		setMessage(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
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
	};

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
								{msg.message}
							</span>
						</div>
					))}
				</div>
				<div className="chat-foot">
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							name="message"
							value={message}
							onChange={handleChange}
							placeholder="Your Message Here"
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

/* 
{
    "_id": "61f55f3e21bf1cad717a4b5f",
    "name": "Akshat Mittal",
    "email": "akshatmittal2506@gmail.com",
    "phone": 9456849466,
    "username": "akshatmittal61",
    "verifcation": true,
    "createdAt": "2022-01-29T15:37:34.099Z",
    "updatedAt": "2022-06-11T11:43:36.441Z",
    "__v": 0,
    "batch": "2020",
    "bio": "MERN Stack developer",
    "currentoriginaztion": "MERN",
    "desgination": "Developer",
    "dob": "2002-06-25",
    "fname": "M",
    "gender": "Male",
    "mname": "C",
    "photo": "akshatmittal2506@gmail.com",
    "program": "B.Tech",
    "pyear": "2024",
    "following": [
        "akshatkhosya@itsforyou.live",
        "20106@iiitu.ac.in",
        "akshatdps12@gmail.com",
        "jronak922@gmail.com",
        "ihardikrastogi12@gmail.com",
        "ihardikrastogi@gmail.com",
        "ihardikrastogi1234@gmail.com",
        "mannsinha1902@gmail.com"
    ],
    "verifyStatus": true
} */
