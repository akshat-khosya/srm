import Login from "./pages/login/Login";
import Home from './pages/home/Home'
import { useContext,useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from "./pages/registration/Registration";
import { Context } from "./context/Context";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import Profile from "./pages/profile/Profile";
import Event from "./pages/Event/Event";
import Fake from "./pages/fake/Fake";
import Opportunity from "./pages/Opportunity/Opportunity";

function App() {
	const axiosInstance = axios.create({
		baseURL: "http://localhost:4000",
	});
  const {user,dispatch,isFetching}=useContext(Context);
  const[num,setNum]=useState(true);
  const loadData=async()=>{
    
    try {
      dispatch({ type: "Login_START" });
      const data=await axiosInstance.get("/api/verifytoken",{ headers: {"token" : localStorage.getItem('token')}})
      console.log(data);
      dispatch({ type: "LOGIN_SUCCESS", payload: data.data.user });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }
  if(localStorage.getItem('token')&& num){
    
      loadData();
      setNum(false);
    
  }
  AOS.init();
 
  

  return (
    <Router>
      
    <Routes>
      <Route  path="/" element={user?(user.verifcation?(<Home axiosInstance={axiosInstance} />):<Registration />):<Login axiosInstance={axiosInstance} />}/>
      <Route  path="/login" element={user?<Home axiosInstance={axiosInstance} />:<Login axiosInstance={axiosInstance} />}/>
      <Route  path="/register" element={user?(user.verifcation?<Home axiosInstance={axiosInstance} />:<Registration />):<Login axiosInstance={axiosInstance} />}/>
      <Route path="/profile" element={user?(user.verifcation ? <Profile axiosInstance={axiosInstance} /> :<Registration />):(<Login axiosInstance={axiosInstance} />)} />
      <Route path="/events" element={user?(user.verifcation ? <Event axiosInstance={axiosInstance} /> :<Registration />):(<Login axiosInstance={axiosInstance} />)} />
      <Route path="/connections" element={user?(user.verifcation ? <Fake />:<Registration />):(<Login axiosInstance={axiosInstance} />)} />
      <Route path="/group" element={user?(user.verifcation ? <Fake />:<Registration />):(<Login axiosInstance={axiosInstance} />)} />
      <Route path="/opportunity" element={user?(user.verifcation ? <Opportunity axiosInstance={axiosInstance} />:<Registration />):(<Login axiosInstance={axiosInstance} />)} />
      <Route path="/resource" element={user?(user.verifcation ? <Fake />:<Registration />):(<Login axiosInstance={axiosInstance} />)} />
      <Route path="/code" element={user?(user.verifcation ? <Fake />:<Registration />):(<Login axiosInstance={axiosInstance} />)} />
      <Route path="/scholarships" element={user?(user.verifcation ? <Fake />:<Registration />):(<Login axiosInstance={axiosInstance} />)} />
    </Routes>
  </Router>
  );
}

export default App;
// "https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"