import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Appoiment.css";
import RelatedDoctor from "../Componets/Appoiment/RelatedDoctor";
import { useDispatch, useSelector } from "react-redux";
import {
  doctorsDetails,
  getAppoimentIndex,
  getAppoimentSlot,
  getAppoimentTime,
  getRelatedDoc,
} from "../REDUX/doctorsSlice";
import DoctorInfo from "../Componets/Appoiment/DoctorInfo";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { API } from "../AXIOS";

const Appoiment = () => {
  const { docId } = useParams();
  const dispatch = useDispatch();

  dispatch(doctorsDetails(docId));
  dispatch(getRelatedDoc(docId));

  const docAppoimentSlot = useSelector((state) => state.doctors.appoimentSlots);
  const docAppoimentIndex = useSelector((state) => state.doctors.slotIndex);
  const docAppoimentTime = useSelector((state) => state.doctors.slotTime);

  const daysInWeek = ["SUN", "MON", "TUE", "WED", "THUS", "FRI", "SAT"];

  useEffect(() => {
    const getAvailableSlot = async () => {
      let today = new Date();
      today.setSeconds(0, 0); // Reset seconds and milliseconds for accuracy

      const slots = [];

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        let endTime = new Date(currentDate);
        endTime.setHours(21, 0, 0, 0); // Set end time to 9 PM

        if (i === 0) {
          // If it's today, adjust the start time
          let now = new Date();
          currentDate.setHours(
            now.getHours() >= 10 ? now.getHours() + 1 : 10,
            now.getMinutes() >= 30 ? 30 : 0
          );
        } else {
          // Set start time for other days
          currentDate.setHours(10, 0, 0, 0); // 10:00 AM
        }

        let timeSlot = [];
        while (currentDate < endTime) {
          // Format time in "11:00 am" format
          let formattedTime = currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // AM/PM formatting
          });

          // Format date in "Wed Jan 29 2025" format
          let formattedDate = currentDate.toLocaleDateString("en-GB", {
            weekday: "short", // "Wed"
            year: "numeric", // "2025"
            month: "short", // "Jan"
            day: "numeric", // "29"
          });

          timeSlot.push({
            // Store formatted date and time as strings
            dateTime: formattedDate, // "Wed Jan 29 2025"
            time: formattedTime, // "11:00 am"
            // Store these for easier display later
            dayOfWeek: currentDate.getDay(),
            dayOfMonth: currentDate.getDate(),
          });

          currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
        }

        slots.push(timeSlot); // Add the day's slots to the list
      }

      dispatch(getAppoimentSlot(slots)); // Dispatch slots to Redux store
    };

    getAvailableSlot();
  }, [dispatch]);

  // Format today's date for default value
  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-GB", {
    weekday: "short", // "Wed"
    year: "numeric", // "2025"
    month: "short", // "Jan"
    day: "numeric", // "29"
  });

  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      date: formattedToday, // Set formatted today's date here as a string
      time: null,
    },
  });

  // Handle appointment submission
  const onSubmit = async (data) => {
    if (!data.time) {
      toast.error("enter time");
    }
    // Convert the date to ISO string for API submission (if needed)
    const submissionData = {
      ...data,
      date: data.date, // Keep the formatted date for API submission
    };

    try {
      const res = await API.post(`/docProf/${docId}`, submissionData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
      console.log(errorMessage);
    }
    console.log(submissionData);
    dispatch(getAppoimentTime(data.time));
  };

  return (
    <div>
      {/* --------doc info----------- */}
      <DoctorInfo />

      {/* slot booking */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Appointment Slot Selection */}
          <div className="slot-main-appoi">
            <p>Booking slot</p>

            {/* Day Slot Selection */}
            <div className="day-slot-appoi">
              {docAppoimentSlot.length > 0 &&
                docAppoimentSlot.map((ele, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      dispatch(getAppoimentIndex(index));
                      // When a day is selected, set the date value as string
                      setValue("date", ele[0].dateTime); // Store formatted date string
                    }}
                    className={`week-slot-appoi ${
                      docAppoimentIndex === index
                        ? "selected-week"
                        : "not-selcted-week"
                    }`}
                  >
                    <p>{ele[0] && daysInWeek[ele[0].dayOfWeek]}</p>
                    <p>{ele[0] && ele[0].dayOfMonth}</p>
                  </div>
                ))}
            </div>

            {/* Time Slot Selection */}
            <div className="time-slot-main-appoi container">
              {docAppoimentSlot.length &&
                docAppoimentSlot[docAppoimentIndex].map((items, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      dispatch(getAppoimentTime(items.time));
                      setValue("time", items.time); // Set the selected time in the form
                    }}
                    className={`time-slot-appoi ${
                      items.time === docAppoimentTime
                        ? "selected-times"
                        : "not-selected-times"
                    }`}
                  >
                    {items.time.toLowerCase()}
                  </p>
                ))}
            </div>

            {/* Submit Button */}
            <button type="submit" className="booking-btn">
              Book An Appointment
            </button>
          </div>
        </div>
      </form>

      {/* -------realted doc---------- */}
      <RelatedDoctor />
    </div>
  );
};

export default Appoiment;
