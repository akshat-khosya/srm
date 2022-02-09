import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import AddMentor from "./AddMentor";
import Mentor from "./Mentor";
import "./mentoring.css";

const Mentoring = ({ axiosInstance }) => {
  const loadData = async () => {
    try {
      const res = await axiosInstance.get("/api/mentoring/");
      setMentors(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  const { user } = useContext(Context);
  const [showaddMentorBox, setShowAddMentorBox] = useState(false);
  const [mentors, setMentors] = useState([]);
  const addMentor = (a) => {
    console.log(a);
    setMentors([...mentors, a]);
    setShowAddMentorBox(false);
  };
  return (
    <div className="mentoring-container">
      <div className="mentoring-box">
        <div className="mentoring-head">
          <span>Expression of Interest to be Mentor</span>
          <button
            className="aavesh-btn"
            onClick={() => setShowAddMentorBox(true)}
          >
            <span className="aavesh-btn-text">Add a new mentor</span>
          </button>
        </div>
        <div className="mentoring-body">
          <div className="Row">
            {mentors.map((mentor, index) => (
              <div className="Col-lg-50 Col-md-100 Col-sm-100" key={index}>
                <Mentor
                  mentor={mentor}
                  axiosInstance={axiosInstance}
                  key={index}
				  load={loadData}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {showaddMentorBox && (
        <AddMentor
          load={loadData}
          close={() => setShowAddMentorBox(false)}
          save={addMentor}
          axiosInstance={axiosInstance}
          
        />
      )}
    </div>
  );
};

export default Mentoring;
