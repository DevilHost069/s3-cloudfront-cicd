export type IConsulationPrescribers = {
  id?: number;
  oid: string;
  nurse_consultation_oid: string;
  patient_internal_id: string;
  prescriber_oid: string;
  patient_oid: string;
  nurse_full_name: string;
  patient_full_name: string;
  prescriber_full_name: string;
  patient_email: string;
  created_at: string;
  updated_at: string;
  booked_date_time: string;
  consultation_status: string;
};

export type IConsultationDetails = {
  id: number;
  oid: string;
  patient_oid: string;
  nurse_oid: string;
  nurse_full_name: string;
  created_at: string;
  updated_at: string;
  booked_date_time: string;
  nurse_approved: boolean;
  consultation_status: string;
  prescriber_consultation: IConsulationPrescribers;
  is_ongoing_consultation: boolean;
  get_nurse_or_doctor_status: string;
};
