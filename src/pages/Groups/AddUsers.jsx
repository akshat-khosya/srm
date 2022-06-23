import React, { useEffect, useState } from "react";
import Addcard from "./Addcard";

const AddUsers = ({ jobId, close, axiosInstancee }) => {
	const [search, setSearch] = useState("");
	const [users, setUsers] = useState([]);
	const [showButton, setShowButton] = useState(false);
	const [addmemlist,setaddmemlist] = useState([]);
	
	const isFetch = async () =>{
		const res = await axiosInstancee.get("/api/allusers");
		setUsers(res.data);
	}

		

	let addmemberParam = {
		groupid: jobId,
		userData: addmemlist
	}


	const handleChange = (e) => {
		setSearch(e.target.value);
	};



	useEffect(() => {
		isFetch();
	}, []);

	const handleSubmit = async (e) =>{
		e.preventDefault();
		const res = await axiosInstancee.post("/api/group/addmember",addmemberParam);
		console.log(addmemlist);
		close();
		console.log(res.data);
	};


	return (
		<div className="groups-add-users">
			<div className="groups-add-users-box" data-aos="zoom-in">
				<div className="groups-add-users-head">
					<button
						className="icon groups-add-users-head-close"
						onClick={close}
					>
						<span className="material-icons">close</span>
					</button>
				</div>
				<div className="groups-add-users-body">
					<form
						onSubmit={joinToGroup}
						className="groups-add-users-form"
					>
						<label>
							<span className="material-icons">search</span>
						</label>
						<input
							type="text"
							value={search}
							onChange={handleChange}
							autoFocus
						/>
						<button type="submit">
							<span className="material-icons">add</span>
						</button>
					</form>
					<div className="groups-add-users-people">
						{users.map((person, index) =>
						
							(search == undefined)?
							<Addcard addmemlist={addmemlist} setaddmemlist={setaddmemlist} axiosInstancee={axiosInstancee} jobId = {jobId} person={person} key={index} keyy={index}/>
							:
							person.name.includes(search) ||
							person.username.includes(search) ?
							<Addcard addmemlist={addmemlist} setaddmemlist={setaddmemlist} axiosInstancee={axiosInstancee} jobId = {jobId} person={person} key={index} keyy={index}/>
							:
							<></>
							
						)}
					</div>
					{showButton && (
						<div className="groups-add-users-buttons">
							<button
								className="groups-add-users-send"
								// onClick={joinToGroup}
							>
								<span className="material-icons">
									add_circle
								</span>
								<span style={{ marginLeft: "0.25rem" }}>
									Join to Group
								</span>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddUsers;
