import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import { Context } from "./context/Context";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Profile from "./pages/profile/Profile";
import Event from "./pages/Event/Event";
import Fake from "./pages/fake/Fake";
import Opportunity from "./pages/Opportunity/Opportunity";
import Mentoring from "./pages/Mentoring/Mentoring";
import Connections from "./pages/Connections/Connections";
import Sidebar from "./components/sidebar/Sidebar";
import "./style.css";
import Scholarships from "./pages/Scholarship/Scholarships";
import Resources from "./pages/Resources/Resources";
import Verify from "./pages/Verify/Verify";
import { admin } from "./globalVariable";
import AccessDenied from "./pages/AccessDenied/AccessDenied";
import Groups from "./pages/Groups/Groups";
import Chat from "./pages/Chat/Chat";

function App() {
	const axiosInstance = axios.create({
		baseURL:
			process.env.NODE_ENV === "production"
				? "https://tegniescorporation.tech/"
				: "http://localhost:4000/",
	});
	// https://tegniescorporation.tech/
	const { user, dispatch } = useContext(Context);
	const [num, setNum] = useState(true);
	const loadData = async () => {
		try {
			dispatch({ type: "Login_START" });
			const data = await axiosInstance.get("/api/verifytoken", {
				headers: { token: localStorage.getItem("token") },
			});
			console.log(data);
			dispatch({ type: "LOGIN_SUCCESS", payload: data.data.user });
		} catch (err) {
			dispatch({ type: "LOGIN_FAILURE" });
		}
	};
	if (localStorage.getItem("token") && num) {
		loadData();
		setNum(false);
	}
	AOS.init();
	const getPage = (route) => {
		let component = <Fake axiosInstance={axiosInstance} />;
		switch (route) {
			case "/":
				component = <Home axiosInstance={axiosInstance} />;
				break;
			case "/login":
				component = <Home axiosInstance={axiosInstance} />;
				break;
			case "/register":
				component = <Home axiosInstance={axiosInstance} />;
				break;
			case "/profile":
				component = <Profile axiosInstance={axiosInstance} />;
				break;
			case "/events":
				component = <Event axiosInstance={axiosInstance} />;
				break;
			case "/connections":
				component = <Connections axiosInstance={axiosInstance} />;
				break;
			case "/opportunity":
				component = <Opportunity axiosInstance={axiosInstance} />;
				break;
			case "/mentoring":
				component = <Mentoring axiosInstance={axiosInstance} />;
				break;
			case "/scholarships":
				component = <Scholarships axiosInstance={axiosInstance} />;
				break;
			case "/resource":
				component = <Resources axiosInstance={axiosInstance} />;
				break;
			case "/settings":
				component = <Verify axiosInstance={axiosInstance} />;
				break;
			case "/groups":
				component = <Groups axiosInstance={axiosInstance} />;
				break;
			case "/group":
				component = <Chat />;
				break;
			default:
				component = <Fake axiosInstance={axiosInstance} />;
				break;
		}
		if (user) {
			if (user.verifcation) return component;
			else return <Registration axiosInstance={axiosInstance} />;
		} else return <Login axiosInstance={axiosInstance} />;
	};
	return (
		<>
			{user ? (
				user.verifcation && <Sidebar axiosInstance={axiosInstance} />
			) : (
				<></>
			)}
			<main>
				<Routes>
					<Route path="/" element={getPage("/")} />
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
					<Route path="/register" element={getPage("/register")} />
					<Route path="/profile" element={getPage("/profile")} />
					<Route path="/events" element={getPage("/events")} />
					<Route
						path="/connections"
						element={getPage("/connections")}
					/>
					<Route path="/groups" element={getPage("/groups")} />
					<Route path="/group/:groupName" element={getPage("/group")} />
					<Route
						path="/opportunity"
						element={getPage("/opportunity")}
					/>
					<Route path="/resource" element={getPage("/resource")} />
					<Route path="/code" element={getPage("/code")} />
					<Route
						path="/scholarships"
						element={getPage("/scholarships")}
					/>
					<Route path="/mentoring" element={getPage("/mentoring")} />
					<Route
						path="/settings"
						element={
							user &&
							user.verifcation &&
							(user.email === admin ? (
								<Verify axiosInstance={axiosInstance} />
							) : (
								<AccessDenied />
							))
						}
					/>
					<Route path="*" element={getPage("*")} />
				</Routes>
			</main>
		</>
	);
}

export default App;
// "https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
