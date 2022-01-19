import React from "react";
import "./event.css";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import logo from "../../Images/post.jpg";
import EventPopup from "./EventPopup";
function Event() {
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
                <EventPopup />
                <div className="event-heading">Events</div>
                <div className="new-Event">
                  <button type="submit" className="aavesh-btn">
                    <span className="aavesh-btn-text">Create Event</span>
                  </button>
                </div>
                <div className="events">
                  <div className="post">
                    <img src={logo} alt="" className="postImg" />

                    <div className="postInfo">
                      <div className="postcats">
                        <span className="postCat">Web</span>
                        <span className="postCat">Intership</span>
                      </div>
                      <div className="postTile-Date">
                        <Link className="link" to="/">
                          <span className="postTitle">Title</span>
                        </Link>

                        <hr />
                        <span className="postDate">21-12-200</span>
                      </div>
                    </div>
                    <p className="postDesc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid quasi corrupti doloribus, qui earum cum sunt
                      maxime fuga ipsam consequuntur quidem libero obcaecati
                      dolore, nobis perferendis mollitia culpa blanditiis animi?
                    </p>
                  </div>

                  <div className="post">
                    <div className="postInfo">
                      <div className="postcats">
                        <span className="postCat">Web</span>
                        <span className="postCat">Intership</span>
                      </div>
                      <div className="postTile-Date">
                        <Link className="link" to="/">
                          <span className="postTitle">Title</span>
                        </Link>

                        <hr />
                        <span className="postDate">21-12-200</span>
                      </div>
                    </div>
                    <p className="postDesc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid quasi corrupti doloribus, qui earum cum sunt
                      maxime fuga ipsam consequuntur quidem libero obcaecati
                      dolore, nobis perferendis mollitia culpa blanditiis animi?
                    </p>
                  </div>

                  <div className="post">
                    <img src={logo} alt="" className="postImg" />

                    <div className="postInfo">
                      <div className="postcats">
                        <span className="postCat">Web</span>
                        <span className="postCat">Intership</span>
                      </div>
                      <div className="postTile-Date">
                        <Link className="link" to="/">
                          <span className="postTitle">Title</span>
                        </Link>

                        <hr />
                        <span className="postDate">21-12-200</span>
                      </div>
                    </div>
                    <p className="postDesc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid quasi corrupti doloribus, qui earum cum sunt
                      maxime fuga ipsam consequuntur quidem libero obcaecati
                      dolore, nobis perferendis mollitia culpa blanditiis animi?
                    </p>
                  </div>

                  <div className="post">
                    <img src={logo} alt="" className="postImg" />

                    <div className="postInfo">
                      <div className="postcats">
                        <span className="postCat">Web</span>
                        <span className="postCat">Intership</span>
                      </div>
                      <div className="postTile-Date">
                        <Link className="link" to="/">
                          <span className="postTitle">Title</span>
                        </Link>

                        <hr />
                        <span className="postDate">21-12-200</span>
                      </div>
                    </div>
                    <p className="postDesc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid quasi corrupti doloribus, qui earum cum sunt
                      maxime fuga ipsam consequuntur quidem libero obcaecati
                      dolore, nobis perferendis mollitia culpa blanditiis animi?
                    </p>
                  </div>

                  <div className="post">
                    <div className="postInfo">
                      <div className="postcats">
                        <span className="postCat">Web</span>
                        <span className="postCat">Intership</span>
                      </div>
                      <div className="postTile-Date">
                        <Link className="link" to="/">
                          <span className="postTitle">Title</span>
                        </Link>

                        <hr />
                        <span className="postDate">21-12-200</span>
                      </div>
                    </div>
                    <p className="postDesc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid quasi corrupti doloribus, qui earum cum sunt
                      maxime fuga ipsam consequuntur quidem libero obcaecati
                      dolore, nobis perferendis mollitia culpa blanditiis animi?
                    </p>
                  </div>
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
