import React, { useEffect } from "react";
import "./AdminDashboad.css";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getDashData } from "../../REDUX/adminSlice";

function AdminDashboad() {
  const dispatch = useDispatch();
  const dashData = useSelector((state) => state.Admin.dashData ?? []);

  useEffect(() => {
    const getAdminDash = async () => {
      try {
        const res = await API.get("/adminDashBoard", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(getDashData(res.data.dashData));
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
    getAdminDash();
    window.scrollTo(0, 0);
  }, [dispatch]);

  if (!dashData) {
    return <div>Loading...</div>;
  }

  return (
    dashData && (
      <div className="m-5">
        <div className="top-div">
          <div className="top-icon">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              height="3em"
              width="3rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path>
            </svg>
            <div>
              <p className="top-text-style">{dashData.doctors}</p>
              <p className="top-sec-para">Doctors</p>
            </div>
          </div>

          <div className="top-icon">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              height="3rem"
              width="3rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 96C0 43 43 0 96 0L384 0l32 0c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32l0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0L96 512c-53 0-96-43-96-96L0 96zM64 416c0 17.7 14.3 32 32 32l256 0 0-64L96 384c-17.7 0-32 14.3-32 32zM208 112l0 48-48 0c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l48 0 0 48c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-48 48 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-48 0 0-48c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"></path>
            </svg>
            <div>
              <p className="top-text-style">{dashData.appoiment}</p>
              <p className="top-sec-para">Appoiments</p>
            </div>
          </div>

          <div className="top-icon">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              height="3rem"
              width="3rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"></path>
            </svg>
            <div>
              <p className="top-text-style">{dashData.user}</p>
              <p className="top-sec-para">Users</p>
            </div>
          </div>
        </div>
        {/* {appoi} */}
        <div>
          <div className="dash-appoiment">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="2rem"
              width="2rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
            </svg>
            <p className="dash-para">Latest Bookings</p>
          </div>
        </div>

        {dashData.latestAppoiment && dashData.latestAppoiment.length > 0 ? (
          dashData.latestAppoiment.map((ele, index) => (
            <div className="dash-booklate-div" key={index}>
              <img
                className="dash-book-img"
                src={ele.docData.image || "default-doctor-image.jpg"}
                alt={ele.docData.fullName || "Doctor"}
              />
              <div className="das-book-details">
                <p className="dash-book-para1">{ele.docData.fullName}</p>
                <p className="dash-book-para2">
                  Patient: {ele.userData.fullName}
                </p>
                <p className="dash-book-para2">
                  Date: {ele.slotBookedDate} | Time: {ele.slotBookedTime}
                </p>
                <p className="dash-book-para2">Status: {ele.status}</p>
                <p className="dash-book-para2">Fees: ₹{ele.fees}</p>
                <hr className="dash-book-hr" />
              </div>
            </div>
          ))
        ) : (
          <p className="no-data-message">No latest bookings available.</p>
        )}
      </div>
    )
  );
}

export default AdminDashboad;
