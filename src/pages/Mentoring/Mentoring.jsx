import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import SnackBar from "../../components/Snackbar";
import AddMentor from "./AddMentor";
import "./mentoring.css";

const Mentoring = (axiosInstance) => {
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
							{
								mentors.map((mentor,index)=>{
									<div className="Col-lg-50 Col-md-100 Col-sm-100" key={index}>
										<div className="mentoring-mentor"></div>
									</div>
								})
							}
						</div>
					</div>
				</div>
			</div>
			{showaddMentorBox && (
				<AddMentor
					close={() => setShowAddMentorBox(false)}
					save={addMentor}
				/>
			)}
		</div>
	);
};

export default Mentoring;
