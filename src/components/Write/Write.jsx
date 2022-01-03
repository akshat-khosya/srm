import {useState, useContext } from 'react'
import { Context } from '../../context/Context'
import './write.css'
import photo from '../../Images/photo.png'
import axios from 'axios'
function Write({load,axiosInstance}) {
    const [file,setFile]=useState(null);
    const [desc,setDesc]=useState("");
    const {user} = useContext(Context);
    const handelPost=async (e)=>{
        e.preventDefault();
        const postInfo={
            email:user.email,
            author:user.name

        } 
            if(file){
                const image=new FormData();
                const filename=user.name+Date.now();
                image.append("name",filename);
                image.append("file",file);
                postInfo.media=filename;
                
                try {
                  const res=await axios.post("/api/upload",image);
                  console.log(res);
                } catch (err) {
                  console.log(err);
                }
            }
            if(desc===""){
                try {
                    const res=await axios.post("/api/post",postInfo);
                    console.log(res);
                  } catch (err) {
                    console.log(err);
                  }

            }else{
                postInfo.desc=desc;
                console.log(postInfo);
                try {
                    const res=await axios.post("/api/post",postInfo);
                    console.log(res);
                  } catch (err) {
                    console.log(err);
                  }
            }
            load();
           setFile(null);
           setDesc("");
        

    }
    return (
        <div className='write'>
            <div className="write-wrapper">
                <div className="write-container">
                    <form onSubmit={handelPost}>
                    <div className="write-heading">
                    <h3 className="writeheading">Create Post</h3>
                    </div>
                    <div className="write-desc">
                        <label htmlFor="desc"><img src={axiosInstance.defaults.baseURL+"images/"+user.photo} alt="" />{user.name}</label>
                        <textarea value={desc} onChange={(e)=>{setDesc(e.target.value)}} placeholder='Write somethings here' name="desc" id="desc" ></textarea>
                    </div>
                    {file && (<div className='media-show'>
                        <img src={URL.createObjectURL(file)} alt="" />
                    </div>) }
                    <div className="write-media">
                        <div className="media-group">
                        <label htmlFor="media"><img src={photo} alt="" />Photo/Video</label>
                        <input onChange={(e)=>{setFile(e.target.files[0]);}} type="file" id="media" name="media" />
                        </div>
                        <div className="post-group">
                            <button type='submit'>Post</button>
                        </div>
                        
                    </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Write
