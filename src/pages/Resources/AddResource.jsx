

import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";

const AddResource = ({ close,axiosInstance,load}) => {
	const {user}=useContext(Context);
	const [resource, setResource] = useState({
		title: "",
		content: "",
		fileType: "",
		fileTitle: "",
		date: "",
		link: "",
	});
	const [file,setFile]=useState(null);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setResource({
			...resource,
			[name]: value,
		});
	};

	const handleSubmit = async(e) => {
		e.preventDefault();
		
		console.log(file.type.split("/")[1]);
		const sendData={
			email:user.email,
			title:resource.title,
			content:resource.content,
			fileType:file.type.split("/")[1],
			fileTitle:resource.fileTitle,
			date:resource.date,
			link:resource.link
		}
		console.log(sendData);
		try {
			const newFile=new FormData();
			const filename=Date.now()+file.name;
			newFile.append("name",filename);
			newFile.append("file",file);
			sendData.file=filename;
			const res = await axiosInstance.post("/api/upload/pdf", newFile);
			console.log(res);
			if(res.data.status){
				try {
					const respond=await axiosInstance.post("/api/resource/",sendData);
					const readresource = await axiosInstance.post("/api/resource/readresource",{"userid":user._id});
					console.log(readresource);
					console.log(respond);
					if(respond.data.status){
						alert("Added");
						load();
						setResource({
							title: "",
							content: "",
							fileType: "",
							fileTitle: "",
							
							date: "",
							link: "",
						});
						close();
					}
				} catch (err) {
					console.log(err);
				}
			}
		} catch (err) {
			console.log(err);
		}
		
		
	};
	return (
		<div className="add-resource">
			<div className="add-resource-box" data-aos="zoom-in">
				<div className="add-resource-head">
					<button className="add-resource-head-close" onClick={close}>
						<span className="material-icons">close</span>
					</button>
				</div>
				<div className="add-resource-body">
					<form className="add-resource-form" onSubmit={handleSubmit}>
						<div className="add-resource-form-group">
							<label>Resource Title</label>
							<input
								type="text"
								name="title"
								value={resource.title}
								onChange={handleChange}
								placeholder="Title"
								required
							/>
						</div>
						<div className="add-resource-form-group">
							<label style={{ alignItems: "flex-start" }}>
								Resource Content
							</label>
							<textarea
								type="text"
								name="content"
								value={resource.content}
								onChange={handleChange}
								placeholder="Content"
								rows={4}
							></textarea>
						</div>
					
						<div className="add-resource-form-group">
							<label>Attachment Name</label>
							<input
								type="text"
								name="fileTitle"
								value={resource.fileTitle}
								onChange={handleChange}
								placeholder="File Name"
								required
							/>
						</div>
						<div className="add-resource-form-group">
							<label>Attachment</label>
							<input
								type="file"
								name="fileLink"
								
								onChange={(e)=>{setFile(e.target.files[0])}}
								placeholder="File"
							/>
						</div>
						<div className="add-resource-form-group">
							<label>Date</label>
							<input
								type="date"
								name="date"
								value={resource.date}
								onChange={handleChange}
								placeholder="File"
								required
							/>
						</div>
						<div className="add-resource-form-group">
							<label>External Link</label>
							<input
								type="url"
								name="link"
								value={resource.link}
								onChange={handleChange}
								placeholder="External Link"
								required
							/>
						</div>
						<div className="add-resource-form-group">
							<button
								onClick={close}
								className="add-resource-btn add-resource-btn-outline"
							>
								Cancel
							</button>
							<button type="submit" className="add-resource-btn">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddResource;
