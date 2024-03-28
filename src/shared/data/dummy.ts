type IPrescriber = {
  patient_number: string;
  patient_name: string;
  patient_email: string;
  aaporved_by: string;
  date_time: string;
  status: string;
};

export const prescriberDummy = [
  {
    patient_number: "#001",
    patient_name: "John Doe",
    patient_email: "p@p.com",
    aaporved_by: "Nurse 1",
    date_time: "2021-01-01 12:00:00",
    status: "consultation_prescribed_status",
  },
  {
    patient_number: "#002",
    patient_name: "John Doe",
    patient_email: "p@p.com",
    aaporved_by: "Nurse 1",
    date_time: "2021-01-01 12:00:00",
    status: "consultation_pending_status",
  },
  {
    patient_number: "#003",
    patient_name: "John Doe",
    patient_email: "p@p.com",
    aaporved_by: "Nurse 1",
    date_time: "2021-01-01 12:00:00",
    status: "consultation_doctor_assigned",
  },
  {
    patient_number: "#004",
    patient_name: "John Doe",
    patient_email: "p@p.com",
    aaporved_by: "Nurse 1",
    date_time: "2021-01-01 12:00:00",
    status: "consultation_pending_status",
  },
  {
    patient_number: "#005",
    patient_name: "John Doe",
    patient_email: "p@p.com",
    aaporved_by: "Nurse 1",
    date_time: "2021-01-01 12:00:00",
    status: "consultation_pending_status",
  },
  {
    patient_number: "#006",
    patient_name: "John Doe",
    patient_email: "p@p.com",
    aaporved_by: "Nurse 1",
    date_time: "2021-01-01 12:00:00",
    status: "consultation_pending_status",
  },
  {
    patient_number: "#007",
    patient_name: "John Doe",
    patient_email: "p@p.com",
    aaporved_by: "Nurse 1",
    date_time: "2021-01-01 12:00:00",
    status: "consultation_pending_status",
  },
  {
    patient_number: "#008",
    patient_name: "John Doe",
    patient_email: "p@p.com",
    aaporved_by: "Nurse 1",
    date_time: "2021-01-01 12:00:00",
    status: "consultation_pending_status",
  },
] as IPrescriber[];
