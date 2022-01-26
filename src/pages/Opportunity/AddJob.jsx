import React, { useState } from "react";

const AddJob = ({ close, save }) => {
	const [job, setJob] = useState({
		title: "",
		icon: "",
		field: "",
		department: "",
		link: "",
		content: "",
		file: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setJob({
			...job,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		save(job);
		setJob({
			title: "",
			icon: "",
			field: "",
			department: "",
			link: "",
			content: "",
			file: "",
		});
	};
	return (
		<div className="add-job">
			<div className="add-job-box" data-aos="zoom-in">
				<div className="add-job-head">
					<button className="add-job-head-close" onClick={close}>
						<span className="material-icons">close</span>
					</button>
				</div>
				<div className="add-job-body">
					<form className="add-job-form" onSubmit={handleSubmit}>
						<div className="add-job-form-group">
							<label>Job Title</label>
							<select
								name="title"
								value={job.title}
								onChange={handleChange}
								required
							>
								<option>Choose One</option>
								<option value="internship">Internship</option>
								<option value="training">Training</option>
								<option value="job">Job</option>
								<option value="project">Project</option>
							</select>
						</div>
						<div className="add-job-form-group">
							<label>Job Field</label>
							<input
								type="text"
								name="field"
								placeholder="Enter Job Field"
								value={job.field}
								onChange={handleChange}
							/>
						</div>
						<div className="add-job-form-group">
							<label>Job Department</label>
							<input
								type="text"
								name="department"
								placeholder="Job Department"
								value={job.department}
								onChange={handleChange}
							/>
						</div>
						<div className="add-job-form-group">
							<label>Company Icon</label>
							<input
								type="file"
								name="icon"
								placeholder="Icon"
								value={job.icon}
								onChange={handleChange}
							/>
						</div>
						<div className="add-job-form-group">
							<label style={{ alignItems: "flex-start" }}>
								Job Content
							</label>
							<textarea
								type="text"
								name="content"
								placeholder="Job Content"
								value={job.content}
								onChange={handleChange}
								rows={3}
							></textarea>
						</div>
						<div className="add-job-form-group">
							<label>Job Details</label>
							<input
								type="file"
								name="link"
								placeholder="Job Details"
								value={job.file}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="add-job-form-group">
							<label>Job Apply URL</label>
							<input
								type="url"
								name="link"
								placeholder="Link to Apply"
								value={job.link}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="add-job-form-group">
							<button
								onClick={close}
								className="add-job-btn add-job-btn-outline"
							>
								Cancel
							</button>
							<button type="submit" className="add-job-btn">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddJob;
