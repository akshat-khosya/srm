
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";

const AddJob = ({ close, save ,load,axiosInstance}) => {
	const {user}=useContext(Context);
	const [job, setJob] = useState({
		title: "",
	
		field: "",
		department: "",
		link: "",
		content: "",
		
	});
	const [file,setFile]=useState(null);
	const [icon,setIcon]=useState(null);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setJob({
			...job,
			[name]: value,
		});
	};
	const handleSubmit =async (e) => {
		e.preventDefault();
		
		const userData={
			title:job.title,
			field:job.field,
			email:user.email,
			department:job.department,
			link:job.link,
			author:user.name
		}
		console.log(userData);
		if(icon){
			const imageIcon=new FormData();
			const filename=Date.now()+icon.name;
			imageIcon.append("name",filename);
			imageIcon.append("file",icon);
			userData.companyicon=filename;
			try {
				const res = await axiosInstance.post("/api/upload", imageIcon);
				console.log(res);
			  } catch (err) {
				console.log(err);
			  }
		}
		if(file){
			const pdfFile=new FormData();
			const filename=Date.now()+file.name;
			pdfFile.append("name",filename);
			pdfFile.append("file",file);
			userData.pdf=filename;
			try {
				const res = await axiosInstance.post("/api/upload/pdf", pdfFile);
				console.log(res);
			  } catch (err) {
				console.log(err);
			  }
		}
		try {
			const res = await axiosInstance.post(
				"/api/oppo/",
				userData
			  );
			  if(res.data.status){
				  load();
				  alert(res.data.message);
				  setJob({
					title: "",
					
					field: "",
					department: "",
					link: "",
					content: "",
					
				});
				setIcon(null);
				setFile(null);
				save(job);
			  }

		} catch (error) {
			console.log(error);
		}
		
		
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
								required
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
								required
							/>
						</div>
						<div className="add-job-form-group">
							<label>Company Icon</label>
							<input
								type="file"
								name="icon"
								placeholder="Icon"
								
								onChange={(e)=>{setIcon(e.target.files[0])}}
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
								required						
							></textarea>
						</div>
						<div className="add-job-form-group">
							<label>Job Details</label>
							<input
								type="file"
								name="link"
								placeholder="Job Details"
								
								onChange={(e)=>{setFile(e.target.files[0])}}
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
