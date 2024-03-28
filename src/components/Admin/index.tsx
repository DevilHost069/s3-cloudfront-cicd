
import { useGetConsultationAdmin } from "@server/admin/useGetAllConsultationData";
import AppointmentCard from "@components/Card/AppointmentCard";

import { use, useCallback, useEffect, useState } from "react";
import Loader from "@components/shared/Loader";

const AdminDashboard = () => {

  const { data, isLoading } = useGetConsultationAdmin();
  const [totalAppointments, setTotalAppointments] = useState("0");
  const [nurseAppointments, setNurseAppointments] = useState("0");
  const [prescriberAppointments, setPrescriberAppointments] = useState("0");
  const [claculating, setCalculating] = useState(false);

  const hasNAN = isNaN(parseInt(totalAppointments));

  const countAppointmentsForToday = useCallback((consultations, today) => {
    return consultations?.reduce((count, consultation) => {
      if (consultation.booked_date_time.includes(today)) {
        return count + 1;
      }
      return count;
    }, 0);

  }, [data, isLoading]);


  useEffect(() => {
    setCalculating(true);
    if (!isLoading && data) {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in (YYYY-MM-DD) format 
      let prescriberCount = countAppointmentsForToday(data.prescriber_consultations, today);
      let nurseCount = countAppointmentsForToday(data.nurse_consultations, today);

      setTotalAppointments((prescriberCount + nurseCount).toString());
      setNurseAppointments(nurseCount?.toString());
      setPrescriberAppointments(prescriberCount?.toString());
      setCalculating(false);
    }
  }, [data, isLoading, claculating]);

  if (isLoading || claculating || hasNAN) {
    return <Loader />;
  }


  return (
    <>

      <div className="row" style={{
        marginTop: "55px",
      }}>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-3 mb-sm-0">
          <AppointmentCard title="Total Appointments For Today" totalAppointment={totalAppointments} />
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-3 mb-sm-0">
          <AppointmentCard title="Total Nurse Appointments" totalAppointment={nurseAppointments} />
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-3 mb-sm-0">
          <AppointmentCard title="Total Prescriber Appointments" totalAppointment={prescriberAppointments} />
        </div>

      </div>

    </>
  );

};
export default AdminDashboard;


