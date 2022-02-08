import React, { useEffect, useState } from "react";
import AddJob from "./AddJob";
import Job from "./Job";
import "./opportunity.css";

const Opportunity = ({ axiosInstance, load }) => {
	const [jobs, setJobs] = useState([]);
	const loadData = async () => {
		try {
			const data = await axiosInstance.get("/api/oppo/");
			let allJobs = [...data.data];
			let newJobs = [];
			allJobs.forEach((Job) => {
				newJobs = [
					...newJobs,
					{
						title: Job.title,
						icon: `${axiosInstance.defaults.baseURL}images/${Job.companyicon}`,
						field: Job.field,
						department: Job.department,
						link: Job.link,
						content: Job.content,
						file: `${axiosInstance.defaults.baseURL}pdf/${Job.pdf}`,
					},
				];
			});
			setJobs(newJobs);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		loadData();
	}, []);
	const handleJobs = (item) => {
		console.log(item);
		setShowAddJobBox(false);
	};
	const [showAddJobBox, setShowAddJobBox] = useState(false);
	return (
		<div className="opportunity-container">
			<div className="opportunity-box">
				<div className="opportunity-head">
					<span>All Jobs</span>
				</div>
				<div className="opportunity-add">
					<button
						className="aavesh-btn"
						onClick={() => setShowAddJobBox(true)}
					>
						<span className="aavesh-btn-text">Add a new job</span>
					</button>
				</div>
				<div className="opportunity-body">
					<div className="Row">
						{jobs.map((job, index) => (
							<div
								className="Col-lg-50 Col-md-100 Col-sm-100"
								key={index}
							>
								<Job job={job} />
							</div>
						))}
					</div>
				</div>
			</div>
			{showAddJobBox && (
				<AddJob
					close={() => setShowAddJobBox(false)}
					axiosInstance={axiosInstance}
					save={handleJobs}
					load={loadData}
				/>
			)}
		</div>
	);
};

export default Opportunity;
