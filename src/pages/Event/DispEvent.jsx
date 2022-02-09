import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import SnackBar from "../../components/Snackbar";


const DispEvent = ({ e, axiosInstance, openEvent,load }) => {
	const {user}=useContext(Context);
	const [open,setOpen]=useState(false);
	const [err,setErr]=useState({
		text:"",
		err:"",
		color:"var(--red)"
	});
	
	const [contextMenu, setContextMenu] = useState(false);
	const editEvent = () => {
		console.log("Edit the event");
		openEvent(e);
		setContextMenu(false);
	};
	const delEvent =async () => {
		try {
			console.log(e._id);
			

			const res=await axiosInstance.delete("/api/event",{data:{id:e._id}});
			console.log(res);
			if(res.data.status===true){
				setOpen(true);
				setErr({
					text:res.data.message,
					err:"",
					color:"var(--green)"
				})
				
				setContextMenu(false);
				load();
				setTimeout(() => {
					setOpen(false);
				}, 2000);
				
			}
		} catch (err) {
			
		}
	};
	return (
		<div className="post">
			{e.photo && (
				<img
					src={`${axiosInstance.defaults.baseURL}images/${e.photo}`}
					alt=""
					className="postImg"
				/>
			)}

			<div className="postInfo">
				<div className="postTile-Date">
					<span className="postTitle" onClick={() => openEvent(e)}>
						{e.title}
					</span>
					<span className="postDate">
						{e.date}
							{user.email===e.email&&<div className="more-context">
							<button
								className="icon more-icon"
								onClick={() => setContextMenu(!contextMenu)}
							>
								<span className="material-icons">
									more_horiz
								</span>
							</button>
							<input
								type="checkbox"
								checked={contextMenu}
								name="openContextMenu"
								onChange={() => console.log("Changed")}
							/>
							
							<div className="more-popup">
								<ul className="more-list">
									<li
										className="more-item"
										onClick={() => editEvent()}
									>
										<span className="material-icons">
											edit
										</span>
										<span className="more-item-label">
											Edit Event
										</span>
									</li>
									<li
										className="more-item"
										onClick={() => delEvent()}
									>
										<span className="material-icons">
											delete
										</span>
										<span className="more-item-label">
											Delete Event
										</span>
									</li>
								</ul>
							</div>
						</div> }
						
					</span>
				</div>
				<div className="postcats">
					<span className="postCat">{e.category1}</span>
					<span className="postCat">{e.category2}</span>
				</div>
				<h6>Author: {e.author}</h6>
			</div>
			<p className="postDesc">{e.desc}</p>
			{contextMenu && (
				<div
					className="context-menu-cover"
					onClick={() => setContextMenu(false)}
				></div>
			)}
			{open && <SnackBar text={err.text}color={err.color} />}
		</div>
	);
};

export default DispEvent;
