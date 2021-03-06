import React, { useState } from "react";

const AddUsers = ({ close }) => {
	const [search, setSearch] = useState("");
	let originalUsers = [];
	const [users, setUsers] = useState([...originalUsers]);
	const selectUsers = (a) => {
		let newUsers = [];
		users.forEach((u, id) => {
			let newUser = { ...u };
			if (u === a) newUser = { ...u, selected: !u.selected };
			newUsers = [...newUsers, newUser];
		});
		originalUsers.forEach((b) => {
			if (a === b) b.selected = !b.selected;
		});
		console.log(originalUsers);
		setUsers(newUsers);
	};
	const handleChange = (e) => {
		const { value } = e.target;
		setSearch(value);
	};
	const joinToGroup = () => {
		let usersToJoin = [];
		users.forEach((e) => {
			if (e.selected) usersToJoin = [...usersToJoin, { ...e }];
		});
		console.log(usersToJoin);
		setUsers((prev) => {
			let newUsers = [];
			prev.forEach((e) => {
				newUsers = [
					...newUsers,
					{
						...e,
						selected: false,
					},
				];
			});
			return newUsers;
		});
		close();
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
							person.name.includes(search) ||
							person.username.includes(search) ? (
								<>
									<div
										className="groups-add-users-person"
										onClick={() => {
											selectUsers(person);
										}}
									>
										<div className="groups-add-users-person-select">
											<span className="material-icons">
												{person.selected
													? "check_box"
													: "check_box_outline_blank"}
											</span>
										</div>
										<div className="groups-add-users-person-image">
											<img
												src={person.photo}
												alt={person.username}
											/>
										</div>
										<div className="groups-add-users-person-content">
											<span className="groups-add-users-person-name">
												{person.name}
											</span>
											<span className="groups-add-users-person-username">
												@{person.username}
											</span>
										</div>
									</div>
								</>
							) : (
								<></>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddUsers;
