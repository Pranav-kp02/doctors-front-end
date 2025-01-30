import React, { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import style from "./AddDoctors.module.css";
import { API } from "../../AXIOS";
import toast from "react-hot-toast";
import { getApplyDoctorData } from "../../REDUX/adminSlice";
import { useForm } from "react-hook-form";

function AddDoctors() {
  const dispatch = useDispatch();
  const docDetails = useSelector((state) => state.Admin.docApplyData ?? []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data, doctor) => {
    // Log selected role and doctor's details
    toast.success(`Filter Applied: ${data.role} for ${doctor.fullName}`);

    // Example usage of doctor data
    console.log("Selected Doctor Data:", doctor._id);
    console.log("Selected Role:", data.role);

    // Call an API or perform actions based on doctor data
    handleDoctorApproval(doctor._id, data.role);
  };

  const handleDoctorApproval = async (doctorId, role) => {
    try {
      const res = await API.post(
        `/docApplyUpdate/${doctorId}`,
        { role },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Doctor approved successfully");
        const updatedDoctors = docDetails.filter((doc) => doc._id !== doctorId);
        dispatch(getApplyDoctorData(updatedDoctors)); // Refresh the data
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Error approving doctor");
    }
  };

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
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong";
        toast.error(errorMessage);
      }
    };
    getAddDoctorData();
  }, [dispatch]);

  return (
    <div className="main">
      <h1 className="docList-admin-head">Doctors Management</h1>

      {docDetails.length === 0 ? (
        <p className={style.nodatamessage}>No doctor applications available.</p>
      ) : (
        docDetails.map((ele, index) => (
          <div key={index} className={style.content}>
            <p className={style.appoiName}>
              {ele.fullName}
              <AiFillCheckCircle />
            </p>
            <p>Email: {ele.email}</p>

            <div className={style.qlfy}>
              <p>
                {ele.degree} - {ele.speciality}
                <button className={style.qlfyBtn}>
                  {ele.experience} years
                </button>
              </p>
            </div>

            {/* About section */}
            <div>
              <p className={style.about}>
                About
                <IoMdInformationCircleOutline />
              </p>
              <p className={style.disc}>{ele.about}</p>
            </div>

            <p className={style.fee}>
              Appointment fee: <span className={style.fee2}>${ele.fees}</span>
            </p>

            {/* Filter section inside the map loop */}
            <form
              onSubmit={handleSubmit((data) => onsubmit(data, ele))}
              className={style.filterContainer}
            >
              <select
                className={style.select}
                {...register("role", { required: "This field is required" })}
              >
                <option value="Doctor">Doctor</option>
              </select>

              {errors.role && (
                <span className={style.error}>{errors.role.message}</span>
              )}

              <button className={style.filterBtn} type="submit">
                APPROVE
              </button>
            </form>
          </div>
        ))
      )}
    </div>
  );
}

export default AddDoctors;
