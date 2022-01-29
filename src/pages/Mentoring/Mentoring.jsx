import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SnackBar from "../../components/Snackbar";
import { Context } from "../../context/Context";
import AddMentor from "./AddMentor";
import "./mentoring.css";

const Mentoring = ({ axiosInstance }) => {
	const loadData = async () => {
		try {
			const res = await axiosInstance.get("/api/mentoring/");
			setMentors(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		loadData();
	}, []);
	const{user}=useContext(Context);
	const [showaddMentorBox, setShowAddMentorBox] = useState(false);
	const [mentors, setMentors] = useState([]);
	const addMentor = (a) => {
		console.log(a);
		setMentors([...mentors, a]);
		setShowAddMentorBox(false);
	};
	return (
		<div className="mentoring">
			<Sidebar axiosInstance={axiosInstance} />
			<div className="mentoring-container">
				<Navbar />
				<div className="mentoring-box">
					<div className="mentoring-head">
						<span>Expression of Interest to be Mentor</span>
						<button
							className="aavesh-btn"
							onClick={() => setShowAddMentorBox(true)}
						>
							<span className="aavesh-btn-text">
								Add a new mentor
							</span>
						</button>
					</div>
					<div className="mentoring-body">
						<div className="Row">
							{mentors.map((mentor, index) => (
								<div
									className="Col-lg-50 Col-md-100 Col-sm-100"
									key={index}
								>
									<div className="mentoring-mentor">
										<div className="mentoring-mentor-head">
											<div className="mentoring-mentor-head-icon">
												<img
													src={`${axiosInstance.defaults.baseURL}images/${user.photo}`}
													className="mentoring-mentor-head-icon__img"
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
										</div>
										<div className="mentoring-mentor-body">
											<div className="mentoring-mentor-interests">
												{mentor.interests.map(
													(item, index) => (
														<span
															className="mentoring-mentor-interest"
															key={index}
														>
															{item}
														</span>
													)
												)}
											</div>
											<div className="mentoring-mentor-current">
												{`Currenly working in ${mentor.current}`}
											</div>
										</div>
										<div className="mentoring-mentor-tag">
											{`Prefers to work ${mentor.mode} ${mentor.frequency}`}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			{showaddMentorBox && (
				<AddMentor
					close={() => setShowAddMentorBox(false)}
					save={addMentor}
					axiosInstance={axiosInstance}
				/>
			)}
		</div>
	);
};

export default Mentoring;
