import React from "react";
import RequestCard from "../../request/RequestCard";
import CheckerNav from "./CheckerNav";

const Checker: React.FC = () => {
  return (
    <div>
      <CheckerNav />
      <RequestCard />
    </div>
  );
};

export default Checker;
