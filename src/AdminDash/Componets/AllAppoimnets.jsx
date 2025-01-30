import React, { useEffect } from "react";
import style from "./AllAppoimnets.module.css";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { allAppoimentData } from "../../REDUX/adminSlice";

function AllAppoimnets() {
  const dispatch = useDispatch();
  const appoimentData = useSelector((state) => state.Admin.allApppoiment ?? []);
  const handleCancel = async (appId) => {
    try {
      const res = await API.put(
        `/appoimentCancel/${appId}`,
        {
          cancel: true, // Sending the new availability state
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const cancelledAppoiment = appoimentData.map((appoi) => {
          if (appoi._id === appId) {
            return { ...appoi, isCancelled: true };
          }
          return appoi;
        });
        dispatch(allAppoimentData(cancelledAppoiment));
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
    const getAllAppoimentData = async () => {
      try {
        const res = await API.get("/allAppoiment", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(allAppoimentData(res.data.appoiment));
          console.log(res.data);
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
    getAllAppoimentData();
  }, [dispatch]);
  return (
    <div className={style.mainDiv}>
      <p className={style.heading}>All Appoiment</p>

      <div className={style.divContainer}>
        <div className={style.gridContainer}>
          <p>#</p>
          <p>patiens</p>
          <p>status</p>
          <p>date & time</p>
          <p>doc name</p>
          <p>fee</p>
          <p>action</p>
        </div>
        {appoimentData.map((ele, index) => (
          <div className={style.divIndex} key={index}>
            <p className={style.pIndex}>{index + 1}</p>
            <div className={style.userDiv}>
              <img className={style.imgUser} src={ele.userData.image} alt="" />{" "}
              <p>{ele.userData.fullName}</p>
            </div>
            <p className={style.hiddenAge}>{ele.status}</p>
            <p>
              {ele.slotBookedDate} , {ele.slotBookedTime}
            </p>
            <div className={style.userDiv}>
              <img className={style.imgUser} src={ele.docData.image} alt="" />{" "}
              <p>{ele.docData.fullName}</p>
            </div>
            <p>{ele.fees}</p>

            {ele.isCancelled ? (
              <p>cancelled</p>
            ) : (
              <p
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleCancel(ele._id)}
              >
                cancel
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAppoimnets;
