import Login from "./pages/login/Login";
import Home from './pages/home/Home'
import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from "./pages/registration/Registration";
import { Context } from "./context/Context";
import axios from "axios";
import { useEffect } from "react/cjs/react.development";
import Profile from "./pages/profile/Profile";
function App() {
  const {user,dispatch,isFetching}=useContext(Context);
  const loadData=async()=>{
    
    try {
      dispatch({ type: "Login_START" });
      const data=await axios.get("http://localhost:5000/api/verifytoken",{ headers: {"token" : localStorage.getItem('token')}})
      console.log(data);
      dispatch({ type: "LOGIN_SUCCESS", payload: data.data.user });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  }
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      loadData();
    }
   
  },[])

  return (
    <Router>
      
    <Routes>
      <Route  path="/" element={user?(user.verifcation?(<Home />):<Registration />):<Login />}/>
      <Route  path="/login" element={user?<Home />:<Login />}/>
      <Route  path="/register" element={user?(user.verifcation?<Home />:<Registration />):<Login />}/>
      <Route path="/profile" element={user&&(user.verifcation && <Profile /> )} />
    </Routes>
  </Router>
  );
}

export default App;
// "https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"