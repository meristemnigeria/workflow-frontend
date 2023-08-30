import React from "react";
import "./Initiator.css";
import RequestCard from "../../request/RequestCard";
import InitiatorNav from "./InitiatorNav";

const Initiator: React.FC = () => {
  return (
    <>
      <InitiatorNav />
      <div className="initiator">
        <RequestCard />
      </div>
    </>
  );
};

export default Initiator;
