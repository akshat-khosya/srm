import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import SnackBar from "../../components/Snackbar";
import userFallback from "../../Images/user.svg";

const Mentor = ({ mentor, axiosInstance, load }) => {
	const { user } = useContext(Context);
	const [contextMenu, setContextMenu] = useState(false);
	const [open, setOpen] = useState(false);
	const [userImage, setUserImage] = useState(
		`${axiosInstance.defaults.baseURL}images/${mentor.email}`
	);
	const [err, setErr] = useState({
		text: "",
		err: "",
		color: "var(--red)",
	});
	const editMentor = () => {
		console.log("Edit the Mentor");
		setContextMenu(false);
	};
	const delMentor = async () => {
		try {
			const res = await axiosInstance.delete("/api/mentoring/", {
				data: { id: mentor._id },
			});
			console.log(res);
			if (res.data.status === true) {
				setOpen(true);
				setErr({
					text: res.data.message,
					err: "",
					color: "var(--green)",
				});
				load();
				setContextMenu(false);

				setTimeout(() => {
					setOpen(false);
				}, 2000);
			}
		} catch (err) {}
	};
	return (
		<div className="mentoring-mentor">
			<div className="mentoring-mentor-head">
				<div className="mentoring-mentor-head-icon">
					<img
						src={userImage}
						className="mentoring-mentor-head-icon__img"
						alt={mentor.name}
						onError={() => {
							setUserImage(userFallback);
						}}
					/>
				</div>
				<div className="mentoring-mentor-head-content">
					<span className="mentoring-mentor-head__name">
						{mentor.name}
					</span>
					<a
						href={`mailto:${mentor.email}`}
						className="mentoring-mentor-head__email"
					>
						{mentor.email}
					</a>
				</div>
				<div className="mentoring-mentor-head-context">
					{user.email === mentor.email && (
						<div className="more-context">
							<button
								className="icon more-icon"
								onClick={() => setContextMenu(!contextMenu)}
							>
								<span className="material-icons">
									more_horiz
								</span>
							</button>
							<input
								type="checkbox"
								checked={contextMenu}
								name="openContextMenu"
								onChange={() => console.log("Changed")}
							/>
							<div className="more-popup">
								<ul className="more-list">
									{/* <li
									className="more-item"
									onClick={() => editMentor()}
								>
									<span className="material-icons">edit</span>
									<span className="more-item-label">
										Edit Mentor
									</span>
								</li> */}
									<li
										className="more-item"
										onClick={() => delMentor()}
									>
										<span className="material-icons">
											delete
										</span>
										<span className="more-item-label">
											Delete Mentor
										</span>
									</li>
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="mentoring-mentor-body">
				<div className="mentoring-mentor-interests">
					{mentor.interests.map((item, index) => (
						<span className="mentoring-mentor-interest" key={index}>
							{item}
						</span>
					))}
				</div>
				<div className="mentoring-mentor-current">
					{`Currenly working in ${mentor.current}`}
				</div>
			</div>
			<div className="mentoring-mentor-tag">
				{`Prefers to work ${mentor.mode} ${mentor.frequency}`}
			</div>
			{contextMenu && (
				<div
					className="context-menu-cover"
					onClick={() => setContextMenu(false)}
				></div>
			)}
			{open && <SnackBar text={err.text} color={err.color} />}
		</div>
	);
};

export default Mentor;
