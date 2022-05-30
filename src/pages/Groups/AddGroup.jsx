import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";

const AddGroup = ({ close, save }) => {
	const { user } = useContext(Context);
	const [group, setGroup] = useState({
		title: "",
		subtitle: "",
		icon: "",
		admin: user.email,
		description: "",
	});
	const [file, setFile] = useState(null);
	const [icon, setIcon] = useState(null);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setGroup({
			...group,
			[name]: value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		save(group);
		console.log(group);
		setGroup({
			title: "",
			subtitle: "",
			icon: "",
			admin: user.email,
			description: "",
		});
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
								name="title"
								placeholder="Enter Group Title"
								value={group.title}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="add-group-form-group">
							<label>Group Subtitle</label>
							<input
								type="text"
								name="subtitle"
								placeholder="Enter Group Subtitle"
								value={group.subtitle}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="add-group-form-group">
							<label>Group Admin</label>
							<input
								type="text"
								name="admin"
								placeholder="Group Admin"
								value={user.name}
								required
								disabled
							/>
						</div>
						<div className="add-group-form-group">
							<label>Group Icon</label>
							<input
								type="file"
								name="icon"
								placeholder="Icon"
								onChange={(e) => {
									setIcon(e.target.files[0]);
								}}
							/>
						</div>
						<div className="add-group-form-group">
							<label style={{ alignItems: "flex-start" }}>
								Group Description
							</label>
							<textarea
								type="text"
								name="description"
								placeholder="Group Description"
								value={group.description}
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
