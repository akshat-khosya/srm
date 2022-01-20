import React, { useEffect } from "react";
import "./event.css";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import logo from "../../Images/post.jpg";
import EventPopup from "./EventPopup";
import axios from "axios";
import SingleEvent from "./SingleEvent";
function Event() {
  const [event,setEvent]=useState([]);
	const [eventPopupBox, setEventPopupBox] = useState(false);
	const addEvent = (a) => {
		console.log(a);
    setEventPopupBox(false);
	};
  const loadData=async()=>{
    
    try {
      
      const data=await axios.get("http://localhost:4000/api/event/");
      console.log(data);
      setEvent(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    loadData();
  },[])
  const [classname,setClassname]=useState(window.innerWidth>1200?"Col-lg-83":" Col-lg-83");
  return (
    <div className="home">
      <div className="Row">
        <Sidebar />
        <div className={classname}>
          <div className="home-main">
            <Navbar />
            <div className="home-container">
              <div className="event">
               
								{eventPopupBox && (
									<EventPopup
										close={() => setEventPopupBox(false)}
										submitEvent={(a) => {
											addEvent(a);
										}}
									/>
								)}
                <div className="event-heading">Events</div>
                <div className="new-Event">
                  <button type="submit" className="aavesh-btn" onClick={() => setEventPopupBox(true)}>
                    <span className="aavesh-btn-text">Create Event</span>
                  </button>
                </div>
                <div className="events">
                  <SingleEvent event={event} />
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
