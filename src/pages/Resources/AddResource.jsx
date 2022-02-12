import React, { useState } from "react";

const AddResource = ({ close, save }) => {
	const [resource, setResource] = useState({
		title: "",
		content: "",
		fileType: "",
		fileTitle: "",
		fileLink: "",
		date: "",
		link: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setResource({
			...resource,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(resource);
		save(resource);
		setResource({
			title: "",
			content: "",
			fileType: "",
			fileTitle: "",
			fileLink: "",
			date: "",
			link: "",
		});
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
							<label>Attachment type</label>
							<input
								type="text"
								name="fileType"
								value={resource.fileType}
								onChange={handleChange}
								placeholder="Extension of file"
								required
							/>
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
								value={resource.fileLink}
								onChange={handleChange}
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
