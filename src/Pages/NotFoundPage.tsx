import React from "react";

// RRD components
import { Link } from "react-router-dom";

// TODO: Add a back button to return the user to the index page(ONGOING)

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      404! Not Found!
      <div>
        <Link to="/">Back to Home</Link>;
      </div>
    </div>
  );
};

export default NotFoundPage;
