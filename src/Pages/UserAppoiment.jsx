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

  const handleUserCancel = async (appoimentID) => {
    try {
      const res = await API.put(
        `/appoimentCancel/${appoimentID}`,
        {
          cancel: true, // Sending the new availability state
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const cancelledAppoiment = appoimentDetails.map((appoi) => {
          if (appoi._id === appoimentID) {
            return { ...appoi, isCancelled: true };
          }
          return appoi;
        });
        dispatch(getUserAppoiment(cancelledAppoiment));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update availability";
      toast.error(errorMessage);
      console.error(errorMessage);
    }
  };

  useEffect(() => {
    const getAlluserAppoiment = async () => {
      try {
        const res = await API.get("/userAllAppoiment", {
          withCredentials: true,
        });
        if (res.data.success) {
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
              <p className="myAppoi-p-span">
                <span className="myAppoi-span">Status: </span>
                {item.status}
              </p>
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
              {item.isCancelled ? (
                <button className="myAppoi-cancel-btn cancelled-btn" disabled>
                  Cancelled
                </button>
              ) : (
                <button
                  onClick={() => handleUserCancel(item._id)}
                  className="myAppoi-cancel-btn"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppoiment;
