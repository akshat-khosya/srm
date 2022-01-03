import Login from "./pages/login/Login";
import Home from './pages/home/Home'
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from "./pages/registration/Registration";
import { Context } from "./context/Context";
import axios from "axios";
import Profile from "./pages/profile/Profile";
function App() {
	const axiosInstance = axios.create({
		baseURL: "https://srmportal.herokuapp.com/",
	});
	const { user, dispatch, isFetching } = useContext(Context);
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

	useEffect(() => {
		loadData();
	}, []);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						user ? (
							user.verifcation ? (
								<Home axiosInstance={axiosInstance} />
							) : (
								<Registration axiosInstance={axiosInstance} />
							)
						) : (
							<Login axiosInstance={axiosInstance} />
						)
					}
				/>
				<Route
					path="/login"
					element={
						user ? (
							<Home axiosInstance={axiosInstance} />
						) : (
							<Login axiosInstance={axiosInstance} />
						)
					}
				/>
				<Route
					path="/register"
					element={
						user ? (
							user.verifcation ? (
								<Home axiosInstance={axiosInstance} />
							) : (
								<Registration axiosInstance={axiosInstance} />
							)
						) : (
							<Login axiosInstance={axiosInstance} />
						)
					}
				/>
				<Route
					path="/profile"
					element={
						user &&
						user.verifcation && (
							<Profile axiosInstance={axiosInstance} />
						)
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
