import TopBar from "../../components/topbar/TopBar";
import "./registration.css";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import SnackBar from "../../components/Snackbar";
import axios from "axios";
import userLogo from "../../Images/user.svg";
function Registration() {
  const { user, dispatch } = useContext(Context);
  const [err, setErr] = useState({
    status: false,
    message: "",
  });

  const [file, setFile] = useState(null);

  const [personal, setPersonal] = useState({
    dob: "",
    gender: "",
    fname: "",
    mname: "",
    currentoriginaztion: "",
    desgination: "",
    program: "",
    batch: "",
    bio: "",
    pyear:"2020"
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
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const allPersonal = {
        email: user.email,
        ...personal,
      };
      const image = new FormData();
      const filename = user.email;
      image.append("name", filename);
      image.append("file", file);
      allPersonal.photo = filename;
      console.log(allPersonal);
      try {
        const res = await axios.post("/api/upload", image);
        console.log(res);
      } catch (err) {}
      try {
        const res = await axios.patch(
          "/api/newregister",
          allPersonal
        );
        if (res.data.status) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setErr({ status: true, message: "Please Select Image" });
    }

  };
  return (
    <div className="regis">
      {err.status && <SnackBar text={err.message} />}
      <TopBar />
      <div className="regisWrapper">
        <h1 className="regisprimary">Personal Information</h1>
        <form onSubmit={handelSubmit}>
          <div className="regis-inputgroup">
            <label className="Imglabel" htmlFor="file">
              <i className="fas fa-pen"></i>
              <img
                className="regisImg"
                src={file ? URL.createObjectURL(file) : userLogo}
                alt=""
              />
            </label>
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
                setErr({ status: false, message: "" });
              }}
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
              <input
                disabled
                value={user.name}
                type="name"
                id="name"
                name="name"
              />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="email">
                Email<span className="requiredLabel">*</span>
              </label>
              <input
                disabled
                value={user.email}
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
                disabled
                value={user.phone}
                type="text"
                id="phone"
                name="phone"
              />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="username">
                Username<span className="requiredLabel">*</span>
              </label>
              <input
                disabled
                value={user.username}
                type="text"
                id="username"
                name="username"
              />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="dob">
                Date of Birth<span className="requiredLabel">*</span>
              </label>
              <input
                onChange={handelChange}
                value={personal.dob}
                required
                type="date"
                id="dob"
                name="dob"
              />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="gender">
                Gender<span className="requiredLabel">*</span>
              </label>
              <select
                onChange={handelChange}
                value={personal.gender}
                required
                name="gender"
                id="gender"
              >
                <option name="course" value="">
                  Select..
                </option>
                <option name="course" value="Male">
                  Male
                </option>
                <option name="course" value="Female">
                  Female
                </option>
              </select>
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="fname">
                Father's Name<span className="requiredLabel">*</span>
              </label>
              <input
                onChange={handelChange}
                value={personal.fname}
                required
                type="text"
                id="fname"
                name="fname"
              />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="mname">Mother's Name</label>
              <input
                onChange={handelChange}
                value={personal.mname}
                type="text"
                id="mname"
                name="mname"
              />
            </div>

            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="currentoriginaztion">
                Current Originzation<span className="requiredLabel">*</span>
              </label>
              <input
                onChange={handelChange}
                value={personal.currentoriginaztion}
                required
                type="text"
                id="currentoriginaztion"
                name="currentoriginaztion"
              />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="pyear">
                Passing Year<span className="requiredLabel">*</span>
              </label>
              <input
                disabled
                value={user.pyear}
                type="text"
                id="pyear"
                name="pyear"
              />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="desgination">
                Desgination<span className="requiredLabel">*</span>
              </label>
              <input
                onChange={handelChange}
                required
                name="desgination"
                id="desgination"
              />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="program">
                Program<span className="requiredLabel">*</span>
              </label>
              <select
                onChange={handelChange}
                value={personal.program}
                required
                name="program"
                id="program"
              >
                <option name="program" value="">select..</option>
                <option name="program" value="MBA">
                  MBA
                </option>
                <option name="program" value=" MCA">
                  MCA
                </option>
                <option name="program" value="M.Tech">
                  M.Tech
                </option>
                <option name="program" value="B.Tech">
                  B.Tech
                </option>
                <option name="program" value="BBA">
                  BBA
                </option>
                <option name="program" value="BCA">
                  BCA
                </option>
                <option name="program" value="B.Pharm">
                  B.Pharm
                </option>
                <option name="program" value="BHM">
                  BHM
                </option>
                <option name="program" value="others">
                  Others
                </option>
              </select>
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="batch">
                Batch<span className="requiredLabel">*</span>
              </label>
              <input
                onChange={handelChange}
                value={personal.batch}
                required
                name="batch"
                id="batch"
              />
            </div>
            <div className="regis-inputgroup Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="pyear">
                Passing Year<span className="requiredLabel">*</span>
              </label>
              <input
                            required
                            className="myInput IP"
                            type="number"
                            name="pyear"
                            id="pyear"
                            type="number"
                            min="1997"
                            max="2050"
                            step="1"
                            onChange={handelChange}
                            value={personal.pyear}
                            placeholder="Passing Year"
                          />
            
            </div>

            
            <div className="regis-inputgroup Col-lg-100 Col-md-100 Col-sm-100">
              <label htmlFor="bio">
                Short Bio<span className="requiredLabel">*</span>
              </label>
              <textarea
                onChange={handelChange}
                value={personal.bio}
                required
                rows="5"
                type="text"
                id="bio"
                name="bio"
              />
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
