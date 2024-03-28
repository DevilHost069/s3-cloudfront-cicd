import { Booking } from "@components/GetStartedForm";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@contexts/ProfileContext";
import { useGetPAtientConsulation } from "@server/patient/PatientConsultations";
import Loader from "@components/shared/Loader";
import {
  consultation_missed_value,
  precriber_missed_status,
  prescriber_prescribed_status,
  prescriber_rejected_status,
} from "@utils/constants";
import moment from "moment";

export default function BookConsulation() {
  const [loading, setLoading] = React.useState(false);
  const [hasSelected, setHasSelected] = React.useState(false);
  const [selectedvalue, setSelectedValue] = React.useState(null);
  const [activeButton, setActiveButton] = React.useState(false);
  const ctx = useProfile();
  const navigate = useNavigate();

  const { data: patient, isLoading } = useGetPAtientConsulation(
    ctx?.profile?.profile_id,
  );

  const statuses = [
    prescriber_prescribed_status,
    consultation_missed_value,
    prescriber_rejected_status,
    precriber_missed_status,
  ];

  const switchStatus = (status) => {
    switch (status) {
      case prescriber_prescribed_status:
        return true;
      case consultation_missed_value:
        return true;
      case prescriber_rejected_status:
        return true;
      case precriber_missed_status:
        return true;
      default:
        return false;
    }
  };

  const checkISGoingConsulation = () => {
    if (patient && !isLoading) {
      const lists = patient?.map((item) => item);
      const latestDate = lists?.reduce((prev, current) =>
        prev.booked_date_time > current.booked_date_time ? prev : current,
      );
      return latestDate;
    }
  };
  const isOnGoing = checkISGoingConsulation();
  const hasPrescribed = switchStatus(isOnGoing?.get_nurse_or_doctor_status);

  useEffect(() => {
    if (loading) {
      localStorage.setItem("alert", "true");
      navigate("/boooking-success");
    }
  }, [loading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className="col-12"
        style={{
          padding: "30px 24px",
        }}
      >
        {hasPrescribed ? (
          <>
            <div className="pt-5">
              <Booking
                hasSelected={hasSelected}
                setHasSelected={setHasSelected}
                setLoading={setLoading}
                selectedvalue={selectedvalue}
                setSelectedValue={setSelectedValue}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                title="Book a Nurse"
              />
            </div>
          </>
        ) : (
          <>
            <div className="card text-center mt-5">
              <div className="card-body p-5">
                <h4>
                  You already have a consultation pending so Booking is
                  unavailable at the moment.
                </h4>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
