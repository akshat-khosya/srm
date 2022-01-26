import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import AddJob from "./AddJob";
import "./opportunity.css";

const Opportunity = ({ axiosInstance,load }) => {
	const loadData = async () => {
		try {
			const data = await axiosInstance.get("/api/oppo/");
			setJobs({
				title:data.data.title,
				icon:`${axiosInstance.defaults.baseURL}images/${data.data.companyicon}`,
				filed:data.data.field,
				department:data.data.department,
				link:data.data.link,
				content:data.data.content,
				file:`${axiosInstance.defaults.baseURL}pdf/${data.data.pdf}`
			})
			console.log(data);
			
		} catch (err) {
			console.log(err);
		}
	};
	// const [jobs, setJobs] = useState([
	// 	{
	// 		title: "Frontend Developer",
	// 		icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
	// 		field: "Web Development",
	// 		department: "devs",
	// 		link: "https://g.co/io",
	// 		content:
	// 			"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and ",
	// 		file: "https://edutechlearners.com/download/Introduction_to_algorithms-3rd%20Edition.pdf",
	// 	},
	// 	{
	// 		title: "Frontend Developer",
	// 		icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
	// 		field: "Web Development",
	// 		department: "devs",
	// 		link: "https://g.co/io",
	// 		content:
	// 			"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
	// 		file: "https://edutechlearners.com/download/Introduction_to_algorithms-3rd%20Edition.pdf",
	// 	},
	// 	{
	// 		title: "Frontend Developer",
	// 		icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
	// 		field: "Web Development",
	// 		department: "devs",
	// 		link: "https://g.co/io",
	// 		content:
	// 			"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
	// 		file: "https://edutechlearners.com/download/Introduction_to_algorithms-3rd%20Edition.pdf",
	// 	},
	// 	{
	// 		title: "Frontend Developer",
	// 		icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
	// 		field: "Web Development",
	// 		department: "devs",
	// 		link: "https://g.co/io",
	// 		content:
	// 			"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
	// 		file: "https://edutechlearners.com/download/Introduction_to_algorithms-3rd%20Edition.pdf",
	// 	},
	// 	{
	// 		title: "Frontend Developer",
	// 		icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
	// 		field: "Web Development",
	// 		department: "devs",
	// 		link: "https://g.co/io",
	// 		content:
	// 			"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
	// 		file: "https://edutechlearners.com/download/Introduction_to_algorithms-3rd%20Edition.pdf",
	// 	},
	// 	{
	// 		title: "Frontend Developer",
	// 		icon: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
	// 		field: "Web Development",
	// 		department: "devs",
	// 		link: "https://g.co/io",
	// 		content:
	// 			"Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
	// 		file: "https://edutechlearners.com/download/Introduction_to_algorithms-3rd%20Edition.pdf",
	// 	},
	// ]);
	const [jobs, setJobs] = useState([]);
	useEffect(()=>{
		loadData();
	},[])
	const handleJobs = (item) => {
		
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
