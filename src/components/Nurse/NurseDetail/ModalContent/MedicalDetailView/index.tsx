import React from "react";

import { IPatientDetailsBYOid } from "../../main";

type IProps = {
  patientDetail: IPatientDetailsBYOid;
};

export default function MedicalDetailView({ patientDetail }: IProps) {
  const { data } = patientDetail;

  const Response = () => {
    if (data && data?.patient_responses) {
      return (
        data?.patient_responses[0]?.response_json?.map((item: any) => {
          return {
            question: item.question,
            answer: item.answer,
          };
        }) ?? []
      );
    } else {
      return [];
    }
  };

  const resp = Response();

  return (
    <>
      <div className="medical_view">
        <div className="medical_inner_view custom-scrollbar">
          {resp?.map((item: any, index: number) => {
            return (
              <div key={index} className="medical_inner_view_lisr ">
                <div
                  className="card-question"
                  style={{
                    textAlign: "left",
                  }}
                >
                  {item.question}
                </div>
                <div className="card-answer text-capitalize">{item.answer}</div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="btn btn-primary"
        data-bs-dismiss="modal"
        style={{ float: "right", marginTop: "10px", height: "48px" }}
      >
        Close
      </button>
    </>
  );
}
