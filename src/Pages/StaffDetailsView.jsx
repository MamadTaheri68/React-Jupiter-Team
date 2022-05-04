import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import spinner from "../assets/images/spinner.gif";
import GetStaffByIdService from "../Services/GetStaffByIdService";
import ResponseStatuses from "../Services/ResponseStatuses";
import StaffDetails from "../components/StaffDetails";

const StaffDetailsView = () => {
  const { id } = useParams();

  const [employee, setEmployee] = useState({});
  const [status, setStatus] = useState("init");

  useEffect(() => {
    GetStaffByIdService(id).then((response) => {
      const [status, data] = response;
      setEmployee(data);
      setStatus(status);
    });
  }, [id]);

  return (
    <div className="container">
      {status === "init" && <img src={spinner} alt="spinner" width={300} />}
      {status === ResponseStatuses.Error && (
        <h1>Error On Loading Data... Please Call Admin</h1>
      )}
      {status === ResponseStatuses.Success && (
        <StaffDetails employee={employee} />
      )}
    </div>
  );
};

export default StaffDetailsView;
