import { IResponseMeta } from "./common";
import { IProducts } from "./product";

export type prescribed_items = {
  dosage: string;
  repeat: number;
  quantity: number;
  product_id: number;
  product_name: string;
  quantity_extended: string;
  patient_instruction: string;
};

export type IPrescriberConsulationDetail = {
  id: number;
  oid: string;
  patient_internal_id: string;
  prescription_internal_id: string;
  created_at: string;
  updated_at: string;
  prescription_status: string;
  prescribed_items: prescribed_items[];
  is_sent_to_pharmacy: boolean;
  prescription_sent_at: string;
  prescribed_by: any;
  new_prescribed_consultation: number;
  assigned_pharmacy: any;
};

export type IPrescriptionResponse = {
  response: IResponseMeta;
  data: IPrescriberConsulationDetail;
};

export type IPrescriptionDetail = {
  prescribed_items: [];
  dose: string;
  frequency: string;
  food: string;
  instruction: string;
  prescription_duration: string;
  script_date: string;
  private: string;
  print_script: string;
  quantity: string;
  repeats: string;
  days_btw_repeats: string;
  start_date: string;
  end_date: string;
  purpose: string;
  regulation_24: boolean;
  my_health_record_consent: boolean;
  brand_substitution: boolean;
  include_your_brand_name: boolean;
  ctg_pbs_co_payment: boolean;
  no_compliance_checking: boolean;
  urgent_supply: boolean;
  inpatient_service: boolean;
  confidential: boolean;
  new_prescribed_consultation: number;
  prescribed_recipe: IProducts;
  oid: string;
  prescription_status: string;
  prescription_type: string;
};

export type IPrescriptionListResponse = {
  response: IResponseMeta;
  data: IPrescriptionDetail[];
};
