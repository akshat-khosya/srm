import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useState } from 'react';
import './profile.css'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

function Profile() {
    const {user} = useContext(Context);
    
    console.log(user);
    
    return (
        <div className="home">
      <div className="Row">
        <Sidebar />
        <div className="Col-lg-83">
          <div className="home-main">
            <Navbar />
        <div className='profile user-profile '>
            <div className="regisWrapper">
        <h1 className="regisprimary">Profile</h1>
        <form >
          <div className="regis-inputgroup regis-inputgroup-profile">
            <label className="Imglabel" htmlFor="file">
              
              <img
                className="regisImg"
                src={"/images/"+user.photo}
                alt=""
              />
            </label>
            <input disabled
             
              required
              className="Imgupload"
              type="file"
              id="file"
            />
          </div>
          <div className="regiscontainer Row">
            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="name">
                Name<span className="requiredLabel">*</span>
              </label>
              <input disabled value={user.name}  required type="name" id="name" name="name" />
            </div>
            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="email">
                Email<span className="requiredLabel">*</span>
              </label>
              <input disabled
                value={user.email}
                
                required
                type="email"
                id="email"
                name="email"
              />
            </div>
            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="name">
                Phone Number<span className="requiredLabel">*</span>
              </label>
              <input disabled
                value={user.phone}
                required
                
                
                type="text"
                id="phone"
                name="phone"
              />
            </div>
            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="dob">
                Date of Birth<span className="requiredLabel">*</span>
              </label>
              <input disabled value={user.dob}  required type="text" id="dob" name="dob" />
            </div>
            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="gender">
                Gender<span className="requiredLabel">*</span>
              </label>
              <input disabled value={user.gender} required name="gender" id="gender" />
                
              
            </div>
            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="fname">
                Father's Name<span className="requiredLabel">*</span>
              </label>
              <input disabled  value={user.fname} required type="text" id="fname" name="fname" />
            </div>
            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="mname">Mother's Name</label>
              <input disabled value={user.mname}  type="text" id="mname" name="mname" />
            </div>

            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="currently">
                Currently At<span className="requiredLabel">*</span>
              </label>
              <input disabled value={user.currently}  required type="text" id="currently" name="currently" />
            </div>
            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="work">
                Work History<span className="requiredLabel">*</span>
              </label>
              <input disabled value={user.work}  required type="text" id="work" name="work" />
            </div>
            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="name">
                Batch<span className="requiredLabel">*</span>
              </label>
              <input disabled value={user.batch}  required name="batch" id="batch" />
                
             
            </div>
            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-33 Col-md-50 Col-sm-100">
              <label htmlFor="course">
                Course<span className="requiredLabel">*</span>
              </label>
              <input disabled value={user.course}  required name="course" id="course" />
               
            </div>
            <div className="regis-inputgroup regis-inputgroup-profile Col-lg-100 Col-md-100 Col-sm-100">
              <label htmlFor="bio">
                Short Bio<span className="requiredLabel">*</span>
              </label>
              <textarea disabled value={user.bio}  required rows="5" type="text" id="bio" name="bio" />
            </div>
          </div>

          <div className="Buttongroup">
            <button type="submit" className="aavesh-btn">
              <span className="aavesh-btn-text">Edit</span>
            </button>
            
           
          </div>
        </form>
      </div>
        </div>
        </div>
          </div>
        </div>
      </div>
    
    )
}

export default Profile
