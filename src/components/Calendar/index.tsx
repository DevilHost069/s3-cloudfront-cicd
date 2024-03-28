import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import { useGetConsultationAdmin } from "@server/admin/useGetAllConsultationData";
import { useEffect, useRef, useState } from "react";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import BasicModal from "@components/Modal";
import moment from "moment";
import { getNameInitials } from "@utils/helper";
import { useProfile } from "@contexts/ProfileContext";
import { Navigate } from "react-router-dom";

interface IConsultationData {
  booked_date_time: string;
  created_at: string;
  end_time: string;
  id: number;
  nurse_full_name: string;
  oid: string;
  patient_email: string;
  patient_full_name: string;
  patient_id: string;
  patient_oid: string;
  prescriber_email: string;
  prescriber_full_name: string;
  prescriber_number: string;
  prescriber_oid: string;
  prescriber_type: string;
  start_time: string;
  updated_at: string;
}
interface ICalEventData extends IConsultationData {
  attendee1: string;
  attendee2: string;
  type: string;
}
interface IEvent {
  fullDesc: string;
  title: string;
  start: string;
  end: string;
  data: ICalEventData;
}
const Calendar = () => {
  const { data, isLoading } = useGetConsultationAdmin();
  const modalRef = useRef(null);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ICalEventData>(null);
  const { profile } = useProfile();
  useEffect(() => {
    const newCalData = [
      ...data?.prescriber_consultations.map((datum) => {
        {
          return {
            fullDesc: `${moment(datum.start_time).format("h:mm A")}-${moment(
              datum.end_time
            ).format("h:mm A")} ${datum.prescriber_full_name} - ${
              datum.patient_full_name
            }`,
            title: `${getNameInitials(datum.prescriber_full_name)} and ${datum.patient_full_name}`,
            start: datum.start_time,
            end: datum.end_time,
            data: {
              ...datum,
              attendee1: datum.prescriber_full_name,
              attendee2: datum.patient_full_name,
              type: "Prescriber",
            },
          };
        }
      }),
      ...data?.nurse_consultations.map((datum) => {
        {
          return {
            fullDesc: `${moment(datum.start_time).format("h:mm A")}-${moment(
              datum.end_time
            ).format("h:mm A")} ${datum.nurse_full_name} - ${
              datum.patient_full_name
            }`,
            title: `${getNameInitials(datum.nurse_full_name)} and ${datum.patient_full_name}`,
            start: datum.start_time,
            end: datum.end_time,
            data: {
              ...datum,
              attendee1: datum.nurse_full_name,
              attendee2: datum.patient_full_name,
              type: "Nurse",
            },
          };
        }
      }),
    ];
    setEvents(newCalData);
  }, [data]);
  if (profile.user_role && profile.user_role !== "tenant_admin") {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events as EventSourceInput}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "timeGridWeek,timeGridDay,dayGridMonth", // user can switch between the two
        }}
        eventClick={function (info) {
          console.log(info.event._def.extendedProps.data);
          setSelectedEvent(info.event._def.extendedProps.data);
          modalRef.current?.click();
        }}
        eventDidMount={function (info) {
          info.el.title = info.event.extendedProps.fullDesc;
        }}
        eventTimeFormat={{
          // like '14:30:00'
          hour: "2-digit",
          minute: "2-digit",
          meridiem: true,
        }}
      />
      <div
        id="get-started-btn"
        data-bs-toggle="modal"
        data-bs-target="#calendarEventDetails"
        className="d-none"
        ref={modalRef}
      ></div>
      <BasicModal
        modalId="calendarEventDetails"
        title={"Consultation Details"}
        extraStyle={{}}
        refresh={false}
        // onClose={() =>{}}
      >
        <div className="row gap-2 ">
          <div className="col-5">{selectedEvent?.type}:</div>
          <div className="col-6">{selectedEvent?.attendee1}</div>
          <div className="col-5">Patient: </div>
          <div className="col-6 break-word">
            {selectedEvent?.patient_full_name}
          </div>
          <div className="col-5">Patient Email: </div>
          <div className="col-6 break-word">{selectedEvent?.patient_email}</div>
          <div className="col-5">Consultation Start: </div>
          <div className="col-6">
            <div className="d-flex flex-column">
              <div className="td-font">
                {moment(selectedEvent?.start_time).format("DD MMMM YYYY")}
              </div>
              <div className="td-sm-font">
                {moment(selectedEvent?.start_time).format("h:mm A")}
              </div>
            </div>
          </div>
          <div className="col-5">Consultation End: </div>
          <div className="col-6">
            <div className="d-flex flex-column">
              <div className="td-font">
                {moment(selectedEvent?.end_time).format("DD MMMM YYYY")}
              </div>
              <div className="td-sm-font">
                {moment(selectedEvent?.end_time).format("h:mm A")}
              </div>
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
};

export default Calendar;
