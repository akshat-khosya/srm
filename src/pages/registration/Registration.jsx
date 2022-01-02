import TopBar from "../../components/topbar/TopBar";
import "./registration.css";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import Button from "../../components/Button/Button";
import axios from "axios";
function Registration() {
  const { user, dispatch } = useContext(Context);
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [phone, setPhone] = useState(user.phone ? user.phone : "");
  const [file, setFile] = useState(null);
  const [personal, setPersonal] = useState({
    name: "",
    dob: "",
    gender: "",
    fname: "",
    mname: "",
    currently: "",
    work: "",
    batch: "",
    course: "",
    bio: "",
    verification:true
  });
  const handelChange = (e) => {
    const { name, value } = e.target;

    setPersonal((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const handelSubmit=async(e)=>{
    e.preventDefault();
  
    
    const allPersonal={
      email,
      phone,
      ...personal
    };
    const image=new FormData();
    const filename=email;
    image.append("name",filename);
    image.append("file",file);
    allPersonal.photo=filename;
    
    try {
      const res=await axios.post("/api/upload",image);
      console.log(res);
    } catch (err) {
      
    }
    try {
      if(user.email){
        allPersonal.auth="email"
      }else{
        allPersonal.auth="phone"
      }
      const res=await axios.post("/api/auth/register",allPersonal);
      console.log(res);
      alert(res.data);
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <div className="regis">
      <TopBar />
      <div className="regisWrapper">
        <h1 className="regisprimary">Personal Information</h1>
        <form onSubmit={handelSubmit}>
          <div className="regis-inputgroup">
            <label className="Imglabel" htmlFor="file">
              <i className="fas fa-pen"></i>
              <img
                className="regisImg"
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                }
                alt=""
              />
            </label>
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              required
              className="Imgupload"
              type="file"
              id="file"
            />
          </div>
          <div className="regiscontainer Row">
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="name">
                Name<span className="requiredLabel">*</span>
              </label>
              <input onChange={handelChange} required type="name" id="name" name="name" />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="email">
                Email<span className="requiredLabel">*</span>
              </label>
              <input
                disabled={user.email}
                onChangeCapture={(e)=>{setEmail(e.target.value)}}
                value={user.email ? user.email : email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="name">
                Phone Number<span className="requiredLabel">*</span>
              </label>
              <input
                disabled={user.phone}
                required
                value={user.phone ? user.phone : phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="text"
                id="name"
                name="name"
              />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="dob">
                Date of Birth<span className="requiredLabel">*</span>
              </label>
              <input onChange={handelChange} required type="date" id="dob" name="dob" />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="gender">
                Gender<span className="requiredLabel">*</span>
              </label>
              <select onChange={handelChange} required name="gender" id="gender">
                <option name="course" value="">Select..</option>
                <option name="course" value="Male">Male</option>
                <option name="course" value="Female">Female</option>
              </select>
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="fname">
                Father's Name<span className="requiredLabel">*</span>
              </label>
              <input onChange={handelChange} required type="text" id="fname" name="fname" />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="mname">Mother's Name</label>
              <input onChange={handelChange} type="text" id="mname" name="mname" />
            </div>

            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="currently">
                Currently At<span className="requiredLabel">*</span>
              </label>
              <input onChange={handelChange} required type="text" id="currently" name="currently" />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="work">
                Work History<span className="requiredLabel">*</span>
              </label>
              <input onChange={handelChange} required type="text" id="work" name="work" />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="name">
                Batch<span className="requiredLabel">*</span>
              </label>
              <select onChange={handelChange} required name="batch" id="batch">
                <option value="">Select..</option>
                <option  name="batch" value="2018-2021">2018-2021</option>
                <option  name="batch" value="2019-2022">2019-2022</option>
                <option  name="batch" value="2020-2024">2020-2024</option>
                <option  name="batch" value="2021-2025">2021-2025</option>
              </select>
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="course">
                Course<span className="requiredLabel">*</span>
              </label>
              <select onChange={handelChange} required name="course" id="course">
                <option name="course" value="">Select..</option>
                <option name="course" value="IT">IT</option>
                <option name="course" value="CSE">CSE</option>
                <option name="course" value="ECE">ECE</option>
              </select>
            </div>
            <div className="regis-inputgroup Col-lg-100 Col-md-100 Col-sm-100">
              <label htmlFor="bio">
                Short Bio<span className="requiredLabel">*</span>
              </label>
              <textarea onChange={handelChange} required rows="5" type="text" id="bio" name="bio" />
            </div>
          </div>

          <div className="Buttongroup">
            <button type="submit" className="aavesh-btn">
              <span className="aavesh-btn-text">Submit</span>
            </button>
            
            <button
              onClick={() => {
                dispatch({ type: "LOGOUT" });
                localStorage.removeItem("token");
              }}
              className="aavesh-btn"
            >
              <span className="aavesh-btn-text">Logout</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
