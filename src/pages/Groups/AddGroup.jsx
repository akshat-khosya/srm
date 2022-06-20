import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import {v1} from "uuid";

const AddGroup = ({ close, save, axiosInstance }) => {
	const { user } = useContext(Context);
	// console.log(user);
	const [group, setGroup] = useState({
		group_name: "",
		group_tags: "",
		group_image: v1(),
		group_owner: user._id,
		group_description: "",
	});
	const [file, setFile] = useState(null);
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setGroup({
			...group,
			[name]: value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		console.log(group);
		save(group);
		// ask not working?
		setGroup({
			group_name: "",
			group_tags: "",
			group_image: v1(),
			group_owner: user._id,
			group_description: "",
		});
		
		// console.log(group.group_image);

		try{
			console.log("first");
			const res = await axiosInstance.post("/api/group/creategroup",group);
			
			console.log("second");
			console.log(res);
				const image = new FormData();
				const filename = group.group_image;
				image.append("name", filename);
				image.append("file", file);
			if (res.data.status) {
				let imgPost = await axiosInstance.post("/api/upload", image);
				console.log(imgPost);
			}
		}catch (err) {
			console.log(err);
		}

	};
	return (
		<div className="add-group">
			<div className="add-group-box" data-aos="zoom-in">
				<div className="add-group-head">
					<button className="add-group-head-close" onClick={close}>
						<span className="material-icons">close</span>
					</button>
				</div>
				<div className="add-group-body">
					<form className="add-group-form" onSubmit={handleSubmit}>
						<div className="add-group-form-group">
							<label>Group Title</label>
							<input
								type="text"
								name="group_name"
								placeholder="Enter Group Name"
								value={group.group_name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="add-group-form-group">
							<label>Group Tags</label>
							<input
								type="text"
								name="group_tags"
								placeholder="Enter Group Tags"
								value={group.group_tags}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="add-group-form-group">
							<label>Group Owner</label>
							<input
								type="text"
								name="group_owner"
								placeholder="Group Owner"
								value={user.name}
								required
								disabled
							/>
						</div>
						<div className="add-group-form-group">
							<label>Group Icon</label>
							<input
								type="file"
								name="group_image"
								placeholder="Icon"
								onChange={(e) => {
									setFile(e.target.files[0]);
									// group.group_image=e.target.files[0].name;
								}}
							/>
						</div>
						<div className="add-group-form-group">
							<label style={{ alignItems: "flex-start" }}>
								Group Description
							</label>
							<textarea
								type="text"
								name="group_description"
								placeholder="Group Description"
								value={group.group_description}
								onChange={handleChange}
								rows={4}
								required
							></textarea>
						</div>
						<div className="add-group-form-group">
							<button
								onClick={close}
								className="add-group-btn add-group-btn-outline"
							>
								Cancel
							</button>
							<button type="submit" className="add-group-btn">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddGroup;
