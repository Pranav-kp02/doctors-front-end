import React, { useEffect } from "react";
import "./UserAppoiment.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { API } from "../AXIOS";
import { getUserAppoiment } from "../REDUX/userAuthenticationSlice";

const MyAppoiment = () => {
  const dispatch = useDispatch();
  const appoimentDetails = useSelector(
    (state) => state.userAth.allUserAppoiments ?? []
  );

  useEffect(() => {
    const getAlluserAppoiment = async () => {
      try {
        const res = await API.get("/userAllAppoiment", {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log(res.data.appoiment);

          dispatch(getUserAppoiment(res.data.appoiment));
        } else {
          toast.error(res.data.message);
          console.log(res.data.message);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        toast.error(errorMessage);
        console.log(errorMessage);
      }
    };
    getAlluserAppoiment();
  }, [dispatch]);

  return (
    <div className="container">
      <p className="myAppoi-header">My Appoiment</p>
      <div>
        {appoimentDetails.map((item, index) => (
          <div className="myAppoi-doc-card" key={index}>
            <div>
              <img
                className="myAppoi-img"
                src={item.docData.fullName}
                alt={item.docData.fullName}
              />
            </div>
            <div className="myAppoi-content">
              <p className="myAppoi-name">{item.docData.fullName}</p>
              <p>{item.docData.speciality}</p>
              {/* <p className="myAppoi-address">Address:</p>
              <p className="myAppoi-address-line">{item.address.line1}</p>
              <p className="myAppoi-address-line">{item.address.line2}</p> */}
              <p className="myAppoi-p-span">
                <span className="myAppoi-span">Date & Time: </span>
                {item.slotBookedDate} | {item.slotBookedTime}
              </p>
            </div>
            <div></div>
            <div className="myAppoi-div-btn">
              <button className="myAppoi-cancel-btn">Cancel Appoiment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppoiment;
