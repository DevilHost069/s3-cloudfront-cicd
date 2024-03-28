import { IResponseMeta } from "./common";

export type IResponse = {
  slug: string;
  question: string;
  data_type: string;
  input_type: string;
  options: string[];
  required: boolean;
};

export type IQuestionnaire = {
  patient_id: string;
  response_json: IResponse[];
};
