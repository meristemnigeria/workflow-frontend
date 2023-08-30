import RequestCard from "../../request/RequestCard";
import NavBar from "./NavBar";
import "./adminDashboard.css";

const AdminDashboard = () => {
  return (
    <>
      <NavBar />
      <RequestCard showViewButton={false} />
    </>
  );
};

export default AdminDashboard;
