import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";

const AddScholarship = ({ close, axiosInstance }) => {
	const {user}=useContext(Context);
	const [scholarship, setScholarship] = useState({
		title: "",
		type: "",
		content: "",
		
		openDate: Date(),
		closeDate: Date(),
		amount: 0,
	});
	const [file,setFile]=useState(null);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setScholarship({
			...scholarship,
			[name]: value,
		});
	};
	const handleSubmit = async(e) => {
		e.preventDefault();
		console.log(scholarship);
		const sendData={
			email:user.email,
			...scholarship
		};
		const newFile=new FormData();
		const filename=Date.now()+file.name;
		newFile.append("name",filename);
		newFile.append("file",file);
		sendData.file=filename;
		console.log(sendData);
		try {
			const res = await axiosInstance.post("/api/upload", newFile);
        	console.log(res);
			if(res.data.status){
				
				try {
					console.log("hello");
					const respond = await axiosInstance.post(
						"/api/scholarship/",
						sendData
					  );
					  console.log(respond);
					  if(respond.data.status){
						  alert("Added");
						  setScholarship({
							title: "",
							type: "",
							link: "",
							content: "",
							
							openDate: Date(),
							closeDate: Date(),
							amount: null,
						});
						close();
						  
					  }else{
						  alert("try again");
					  }
				} catch (error) {
					console.log(error);
				}
			}else{
				console.log(res.data.message);
			}
		} catch (err) {
			console.log(err);
		}
		
		
	
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
								required
								onChange={(e)=>{setFile(e.target.files[0])}}
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
