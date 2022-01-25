import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState,useEffect } from "react";
import Write from "../../components/Write/Write";
import Posts from "../../components/posts/Posts";

function Home({axiosInstance}) {
  const [posts,setPosts]=useState([]);
  const loadPost=async()=>{
    try {
      
      const data=await axiosInstance.get("/api/post")
      console.log(data);
      setPosts(data.data);
      
    } catch (err) {
      console.log(err);
    }
  }
useEffect(() => {
  loadPost();
}, [])
  
  const [navbar, setNavbar] = useState("Navbar");
  const changeClass = () => {
    console.log(window.scrollY);
    if (window.scrollY > 1) {
      setNavbar("Navbaractive Navbar");
    } else {
      setNavbar("Navbaractive");
    }
  };
  window.addEventListener("scroll", changeClass);
  return (
    <div className="home">
      <div className="Row">
        <Sidebar axiosInstance={axiosInstance} />
        <div className="Col-lg-83 Col-md-100">
          <div className="home-main">
            <Navbar />
            <div className="home-container">
                <div className="posts">
               <Write load={loadPost} axiosInstance={axiosInstance} />
               <Posts posts={posts} axiosInstance={axiosInstance} />
                </div>
                <div className="events">
                
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
