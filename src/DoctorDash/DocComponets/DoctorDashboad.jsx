import React, { useEffect } from "react";
import style from "./DoctorDashboad.module.css";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDashData } from "../../REDUX/docAthetication";

function DoctorDashboad() {
  const dispatch = useDispatch();
  const dashData = useSelector((state) => state.DoctorAth.docDash ?? []);
  const doctorId = useSelector((state) => state.DoctorAth.doctor.id ?? []);

  useEffect(() => {
    const getAdminDash = async (doctorId) => {
      try {
        const res = await API.get(`/doctorDashboard/${doctorId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log(res.data);

          dispatch(getDoctorDashData(res.data.dashData));
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
    getAdminDash(doctorId);
    window.scrollTo(0, 0);
  }, [dispatch]);

  if (!dashData) {
    return <div>Loading...</div>;
  }

  return (
    dashData && (
      <div className="m-5">
        <div className={style.topdiv}>
          <div className={style.topicon}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.5003 8C13.8278 8.43606 14.0625 8.94584 14.175 9.5H16V11H14.175C13.8275 12.7117 12.3142 14 10.5 14H10.3107L14.0303 17.7197L12.9697 18.7803L8 13.8107V12.5H10.5C11.4797 12.5 12.3131 11.8739 12.622 11H8V9.5H12.622C12.3131 8.62611 11.4797 8 10.5 8H8V6.5H16V8H13.5003Z"></path>
            </svg>
            <div>
              <p className={style.toptextstyle}>{dashData.earning}</p>
              <p className="top-sec-para">Revenue</p>
            </div>
          </div>

          <div className={style.topicon}>
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
              <p className={style.toptextstyle}>{dashData.appoimentLength}</p>
              <p className={style.topsecpara}>Appoiments</p>
            </div>
          </div>

          <div className={style.topicon}>
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
              <p className={style.toptextstyle}>{dashData.patient}</p>
              <p className={style.topsecpara}>Patient</p>
            </div>
          </div>
        </div>
        {/* {appoi} */}
        <div>
          <div className={style.dashappoiment}>
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
            <p className={style.dashpara}>Latest Bookings</p>
          </div>
        </div>

        {dashData.latestAppoiment && dashData.latestAppoiment.length > 0 ? (
          dashData.latestAppoiment.map((ele, index) => (
            <div className={style.dashbooklatediv} key={index}>
              <img
                className={style.dashbookimg}
                src={ele.userData.image || "default-doctor-image.jpg"}
                alt={ele.userData.fullName || "Doctor"}
              />
              <div className={style.dasbookdetails}>
                <p className={style.dashbookpara1}>
                  {" "}
                  Patient: {ele.userData.fullName}
                </p>
                <p className={style.dashbookpara2}>
                  Date: {ele.slotBookedDate} | Time: {ele.slotBookedTime}
                </p>
                <p
                  className={style.dashbookpara2}
                  data-status={ele.status.toLowerCase()}
                >
                  Status: {ele.status}
                </p>
                <p className={style.dashbookpara2}>Fees: ₹{ele.fees}</p>
                <hr className={style.dashbookhr} />
              </div>
            </div>
          ))
        ) : (
          <p className={style.nodatamessage}>No latest bookings available.</p>
        )}
      </div>
    )
  );
}

export default DoctorDashboad;
