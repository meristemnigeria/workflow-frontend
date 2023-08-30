import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
  return (
    <div>
      <h1>Unauthorized Access</h1>
      <p>You don't have the necessary privileges to access this page.</p>
      <Link to="/login">Go back to Login</Link>
    </div>
  );
};

export default UnauthorizedPage;
