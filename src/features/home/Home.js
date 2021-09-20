import React from "react";
import { Link } from "react-router-dom";
import image from "./diabetes.jpg";

export default function Home() {
  return (
    <React.Fragment>
      <div className="home">
        <img className="home-img" src={image} />
        <Link className="btn btn-primary start-test" to="/test">
          {" "}
          Start arithmetic test
        </Link>
      </div>
    </React.Fragment>
  );
}
