import React from "react";
import "../../profile/profile.css";
import "./user-profile.css";

const UserProfile = ({ close, axiosInstance }) => {
	const user = {
		_id: "61f55f3e21bf1cad717a4b5f",
		name: "Akshat Mittal",
		email: "akshatmittal2506@gmail.com",
		phone: 9456849466,
		username: "akshatmittal61",
		verifcation: true,
		createdAt: "2022-01-29T15:37:34.099Z",
		updatedAt: "2022-03-13T12:51:17.404Z",
		__v: 0,
		batch: "2020",
		bio: "MERN Stack developer",
		currentoriginaztion: "MERN",
		desgination: "Developer",
		dob: "2002-06-25",
		fname: "M",
		gender: "Male",
		mname: "C",
		photo: "akshatmittal2506@gmail.com",
		program: "B.Tech",
		pyear: "2024",
		following: [
			"akshatkhosya@itsforyou.live",
			"20106@iiitu.ac.in",
			"akshatdps12@gmail.com",
			"jronak922@gmail.com",
			"ihardikrastogi12@gmail.com",
			"ihardikrastogi@gmail.com",
			"ihardikrastogi1234@gmail.com",
			"mannsinha1902@gmail.com",
		],
		verifyStatus: false,
	};
	return (
		<div className="user-profile">
			<div className="user-profile-box" data-aos="zoom-in">
				<div className="user-profile-head">
					<button className="user-profile-head-close" onClick={close}>
						<span className="material-icons">close</span>
					</button>
				</div>
				<div className="user-profile-body">
					<div className="regisWrapper">
						<div className="regis-inputgroup regis-inputgroup-profile">
							<label className="Imglabel" htmlFor="file">
								<img
									className="regisImg"
									src={`${axiosInstance.defaults.baseURL}images/${user.photo}`}
									alt={user.email}
								/>
							</label>
							<input
								disabled
								required
								className="Imgupload"
								type="file"
								id="file"
							/>
						</div>
						<div className="regiscontainer Row">
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="name">
									Name<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.name}
									required
									type="name"
									id="name"
									name="name"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="email">
									Email
									<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.email}
									required
									type="email"
									id="email"
									name="email"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="name">
									Phone Number
									<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.phone}
									required
									type="text"
									id="phone"
									name="phone"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="name">
									Username
									<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.username}
									required
									type="text"
									id="phone"
									name="phone"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="dob">
									Date of Birth
									<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.dob}
									required
									type="text"
									id="dob"
									name="dob"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="gender">
									Gender
									<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.gender}
									required
									name="gender"
									id="gender"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="fname">
									Father's Name
									<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.fname}
									required
									type="text"
									id="fname"
									name="fname"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="mname">Mother's Name</label>
								<input
									disabled
									value={user.mname}
									type="text"
									id="mname"
									name="mname"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="currently">
									Current Orginzation
									<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.currentoriginaztion}
									required
									type="text"
									id="currently"
									name="currently"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="work">
									Desgination
									<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.desgination}
									required
									type="text"
									id="work"
									name="work"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="name">
									Batch
									<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.batch}
									required
									name="batch"
									id="batch"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="course">
									Program
									<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.program}
									required
									name="course"
									id="course"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-25 Col-md-33 Col-sm-50">
								<label htmlFor="course">
									Passing Year
									<span className="requiredLabel">*</span>
								</label>
								<input
									disabled
									value={user.pyear}
									required
									name="course"
									id="course"
								/>
							</div>
							<div className="regis-inputgroup regis-inputgroup-profile Col-lg-100 Col-md-100 Col-sm-100">
								<label htmlFor="bio">
									Short Bio
									<span className="requiredLabel">*</span>
								</label>
								<textarea
									disabled
									value={user.bio}
									required
									type="text"
									id="bio"
									name="bio"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
