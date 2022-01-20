import React from "react";
import { Link } from "react-router-dom";

function SingleEvent({ event }) {
  return (
    <>
      {event.map((e) => (
        <div className="post">
            {e.photo&&<img src={"https://tegniescorporation.tech/images/"+e.photo} alt="" className="postImg" />}
          

          <div className="postInfo">
            <div className="postcats">
              <span className="postCat">{e.category1}</span>
              <span className="postCat">{e.category2}</span>
            </div>
            <div className="postTile-Date">
              
                <span className="postTitle">{e.title}</span>
            

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
