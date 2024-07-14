import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <div>
        <h1>Hello React</h1>
        <div>
          <Link to="/implements/redux">Redux</Link>
          <Link to="/implements/promise">Promise</Link>
        </div>
        {/* <BatchUpdateComponent /> */}
        {/* <Eventloop /> */}
      </div>
    </div>
  );
}
