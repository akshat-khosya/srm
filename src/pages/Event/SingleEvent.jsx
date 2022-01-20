import React from "react";
import { Link } from "react-router-dom";

function SingleEvent({ event }) {
  return (
    <>
      {event.map((e) => (
        <div className="post">
          <img src={"http://localhost:4000/images/"+e.photo} alt="" className="postImg" />

          <div className="postInfo">
            <div className="postcats">
              <span className="postCat">{e.category1}</span>
              <span className="postCat">{e.category2}</span>
            </div>
            <div className="postTile-Date">
              <Link className="link" to="/">
                <span className="postTitle">{e.title}</span>
              </Link>

              <hr />
              <span className="postDate">{e.date}</span>
            </div>
          </div>
          <p className="postDesc">
           {e.desc}
          </p>
        </div>
      ))}
    </>
  );
}

export default SingleEvent;
