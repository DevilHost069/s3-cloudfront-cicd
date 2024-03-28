import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  title: string;
  totalAppointment: string | number;
}

const AppointmentCard: React.FC<CardProps> = ({ title, totalAppointment }) => {
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-9">
              <h6 className="mb-2 text-base font-medium">{title}</h6>
              <h5 className="mb-1 text-3xl text-gray-800 dark:text-white font-medium">{totalAppointment || "Loading..."} <span className="text-xs text-gray-500 dark:text-white/70 font-normal"> Appointments</span></h5>
              {/* <span className="text-gray-500 dark:text-white/70">  than last month</span> */}
            </div>
            <div className="col-3 text-end">
              <span className="avatar rounded-sm bg-primary text-white p-3"><FontAwesomeIcon icon={faArrowUp} className="text-white m-1" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
