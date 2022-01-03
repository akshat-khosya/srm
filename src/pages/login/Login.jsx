import "./login.css";

import react, { useState, useContext } from "react";
import axios from "axios";
import TopBar from "../../components/topbar/TopBar";
import { Context } from "../../context/Context";
function Login({ axiosInstance }) {
	const { dispatch, isFetching } = useContext(Context);
	const [userContact, setUserContact] = useState("");
	const [checkIP, setCheckIP] = useState("tel");
	const [password, setPassword] = useState("");
	const handleChangeIP = (e) => {
		const { name, value } = e.target;
		for (let i = 0; i < value.length; ++i)
			if (value[i] === "@") setCheckIP("email");
		setUserContact(value);
	};
	const loadData = async () => {
		try {
			dispatch({ type: "Login_START" });
			const data = await axiosInstance.get("/api/auth/verifytoken", {
				headers: { token: localStorage.getItem("token") },
			});
			console.log(data);
			dispatch({ type: "LOGIN_SUCCESS", payload: data.data.user });
		} catch (err) {
			dispatch({ type: "LOGIN_FAILURE" });
		}
	};
	const handelSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "Login_START" });
		let loginCred = {
			phone: "",
			email: "",
			password: "",
		};
		if (checkIP === "tel") {
			loginCred.phone = userContact;
			loginCred.password = password;
			try {
				console.log(loginCred);
				const res = await axiosInstance.post(
					"/api/auth/phone",
					loginCred
				);
				console.log(res);
				if (res.data.status === "true") {
					localStorage.setItem("token", res.data.token);
					dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
					loadData();
				} else {
					alert(res.data.messgae);
				}
			} catch (error) {
				dispatch({ type: "LOGIN_FAILURE" });
			}
		} else {
			loginCred.email = userContact;
			loginCred.password = password;
			try {
				const res = await axiosInstance.post(
					"api/auth/email",
					loginCred
				);
				console.log(res);
				if (res.data.status === "true") {
					localStorage.setItem("token", res.data.token);
					dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
					loadData();
				} else {
					alert(res.data.messgae);
				}
			} catch (error) {
				dispatch({ type: "LOGIN_FAILURE" });
			}
		}
		console.log(loginCred);
	};
	return (
		<div className="login">
			<TopBar />
			<div className="container">
				<div className="myCard">
					<div className="row">
						<div className="col-md-6">
							<div className="myLeftCtn">
								<div className="box">
									<header>SRM NCR ALUMNI PORTAL</header>
									<p>
										If you’re applying for a tertiary place,
										or a new job, or a new relationship, it
										helps to be able to point to the
										unselfish efforts you’re putting in for
										the community.
									</p>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="myRightCtn">
								<form
									onSubmit={handelSubmit}
									className="myForm text-center"
								>
									<header>Login</header>
									<div className="form-group">
										<i className="fas fa-user"></i>

										<input
											className="myInput IP"
											type={checkIP}
											name="userContact"
											onChange={handleChangeIP}
											value={userContact}
											placeholder="Email or Phone"
										/>
									</div>

									<div className="form-group">
										<i className="fas fa-lock"></i>
										<input
											onChange={(e) => {
												setPassword(e.target.value);
											}}
											className="myInput"
											type="password"
											placeholder="Password"
											name=""
										/>
									</div>
									<input
										type="submit"
										className="butt"
										name=""
										value="Login"
									/>
									<input
										type="button"
										className="butt"
										name=""
										value="Login With Google"
									/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;

// const [checkIP,setCheckIP]=useState("tel");
// const handleChange=(e)=>{
// const {name,value}=e.target;
// for(let i=0;i<value.length;++i)if(value[i]==='@')setCheckIP("email");
// }
