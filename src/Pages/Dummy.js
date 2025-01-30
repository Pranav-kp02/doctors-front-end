import React, { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import style from "./AddDoctors.module.css";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import { getApplyDoctorData } from "../../REDUX/adminSlice";

function AddDoctors() {
  const dispatch = useDispatch();
  const docDetails = useSelector((state) => state.Admin.docApplyData ?? []);

  useEffect(() => {
    const getAddDoctorData = async () => {
      try {
        const res = await API.get("/allDoctorsApply", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(getApplyDoctorData(res.data.doctors));
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
    getAddDoctorData();
  }, [dispatch]);
  return (
    <div className="main">
      <h1 className="docList-admin-head">Applyed Doctors</h1>
      {docDetails.map((ele, index) => (
        <div key={index} className={style.content}>
          <p className="appoi-name">
            {ele.fullName}
            <AiFillCheckCircle />
          </p>
          <p>Email : {ele.email}</p>

          <div className={style.qlfy}>
            <p>
              {ele.degree} - {ele.speciality}
              <button className={style.qlfyBtn}>{ele.experience} years</button>
            </p>
          </div>
          {/* about */}
          <div>
            <p className={style.about}>
              About
              <IoMdInformationCircleOutline />
            </p>
            <p className={style.disc}>{ele.about}</p>
          </div>
          <p className={style.fee}>
            Appoiment fee: <span className={style.fee2}>${ele.fees}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default AddDoctors;
