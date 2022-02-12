import React, { useState } from "react";

const AddScholarship = ({ close, save }) => {
	const [scholarship, setScholarship] = useState({
		title: "",
		type: "",
		content: "",
		file: "",
		openDate: Date(),
		closeDate: Date(),
		amount: 0,
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setScholarship({
			...scholarship,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(scholarship);
		save(scholarship);
		setScholarship({
			title: "",
			type: "",
			link: "",
			content: "",
			file: "",
			openDate: Date(),
			closeDate: Date(),
			amount: null,
		});
	};
	return (
		<div className="add-scholarship">
			<div className="add-scholarship-box" data-aos="zoom-in">
				<div className="add-scholarship-head">
					<button
						className="add-scholarship-head-close"
						onClick={close}
					>
						<span className="material-icons">close</span>
					</button>
				</div>
				<div className="add-scholarship-body">
					<form
						className="add-scholarship-form"
						onSubmit={handleSubmit}
					>
						<div className="add-scholarship-form-group">
							<label>Scholarship Title</label>
							<input
								type="text"
								name="title"
								placeholder="Scholarship Title"
								value={scholarship.title}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="add-scholarship-form-group">
							<label>Scholarship Type</label>
							<select
								type="text"
								name="type"
								placeholder="Scholarship Title"
								value={scholarship.type}
								onChange={handleChange}
								required
							>
								<option hidden>Choose One</option>
								<option value="undergraduate">
									Undergraduate
								</option>
								<option value="post-graduate">
									Post graduate
								</option>
							</select>
						</div>
						<div className="add-scholarship-form-group">
							<label style={{ alignItems: "flex-start" }}>
								Scholarship Details
							</label>
							<textarea
								type="text"
								name="content"
								placeholder="Scholarship Details"
								value={scholarship.content}
								onChange={handleChange}
								required
								rows={4}
							></textarea>
						</div>
						<div className="add-scholarship-form-group">
							<label>Scholarship Amount</label>
							<input
								type="number"
								name="amount"
								placeholder="Scholarship Amount"
								value={scholarship.amount}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="add-scholarship-form-group">
							<label>Opening Date</label>
							<input
								type="date"
								name="openDate"
								placeholder="Opening Date"
								value={scholarship.openDate}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="add-scholarship-form-group">
							<label>Closing Date</label>
							<input
								type="date"
								name="closeDate"
								placeholder="Closing Date"
								value={scholarship.closeDate}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="add-scholarship-form-group">
							<label>More Deatils</label>
							<input
								type="file"
								name="file"
								placeholder="More Details"
								value={scholarship.file}
								onChange={handleChange}
							/>
						</div>
						<div className="add-scholarship-form-group">
							<button
								onClick={close}
								className="add-scholarship-btn add-scholarship-btn-outline"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="add-scholarship-btn"
							>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddScholarship;
