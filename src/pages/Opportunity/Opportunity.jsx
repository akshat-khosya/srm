import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import AddJob from "./AddJob";
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
						icon: `${axiosInstance.defaults.baseURL}/images/${Job.companyicon}`,
						field: Job.field,
						department: Job.department,
						link: Job.link,
						content: Job.content,
						file: `${axiosInstance.defaults.baseURL}/pdf/${Job.pdf}`,
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
		<div className="opportunity">
			<Sidebar axiosInstance={axiosInstance} />
			<div className="opportunity-container">
				<Navbar />
				<div className="opportunity-box">
					<div className="opportunity-head">
						<span>All Jobs</span>
					</div>
					<div className="opportunity-add">
						<button
							className="aavesh-btn"
							onClick={() => setShowAddJobBox(true)}
						>
							<span className="aavesh-btn-text">
								Add a new job
							</span>
						</button>
					</div>
					<div className="opportunity-body">
						<div className="Row">
							{jobs.map((job, index) => (
								<div
									className="Col-lg-50 Col-md-100 Col-sm-100"
									key={index}
								>
									<div className="opportunity-job">
										<div className="opportunity-job-head">
											<div className="opportunity-job-head-icon">
												<img
													src={job.icon}
													alt={job.title}
												/>
											</div>
											<div className="opportunity-job-head-content">
												<span className="opportunity-job-head-content-title">
													{job.title}
												</span>
												<span className="opportunity-job-head-content-field">
													{job.field}
												</span>
												<span className="opportunity-job-head-content-department">
													{job.department}
												</span>
											</div>
											<div className="opportunity-job-head-showmore">
												<a href={job.file}>
													<span className="material-icons">
														chevron_right
													</span>
												</a>
											</div>
										</div>
										<div className="opportunity-job-body">
											<div className="opportunity-job-body-content">
												{job.content}
											</div>
											<div className="opportunity-job-body-actions">
												<button className="opportunity-btn opportunity-btn-outline">
													<a
														href={job.file}
														target="_blank"
														rel="noreferrer"
													>
														View Deatils
													</a>
												</button>
												<button className="opportunity-btn">
													<a
														href={job.link}
														target="_blank"
														rel="noreferrer"
													>
														Apply Now
													</a>
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
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
