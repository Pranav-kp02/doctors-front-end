import React, { useEffect } from "react";
import style from "./AllAppoimnets.module.css";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { allAppoimentData } from "../../REDUX/adminSlice";

function AllAppoimnets() {
  const dispatch = useDispatch();
  const appoimentData = useSelector((state) => state.Admin.allApppoiment ?? []);
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

            <svg
              stroke="currentColor"
              style={{ color: "red" }}
              fill="none"
              stroke-width="0"
              viewBox="0 0 15 15"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAppoimnets;
