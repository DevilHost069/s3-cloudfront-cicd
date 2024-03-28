import { Eye, Null, Pencil } from "@assets/index";
import CustomCard from "@components/Card";
import { INurseConsulationDetails, IPatientDetailsBYOid } from "./main";
import {
  consultation_doctor_assigned_value,
  consultation_missed_value,
  consultation_nurse_approved_status_value,
  consultation_under_review_status_value,
} from "@utils/constants";
import { additionalQuestionsandAnswers } from "@shared/data/screening";

type IProps = {
  setTitle: (title: string) => void;
  setModalContent: (content: string) => void;
  patientDetail: IPatientDetailsBYOid;
  editable?: boolean;
  details?: INurseConsulationDetails;
};

export default function MedicalDetail({
  setTitle,
  setModalContent,
  patientDetail,
  editable = true,
  details,
}: IProps) {
  /* The code is defining a function called `pathFinder` that takes a `path` parameter of type string.
  It checks if the `path` includes the string "/nurse/consultation/". If it does, it returns the
  `Pencil` icon. Otherwise, it returns the `Eye` icon. */
  const currentPath = window.location.pathname;
  const pathFinder = (path: string) => {
    if (path.includes("/nurse/consultation/")) {
      return Pencil;
    } else {
      return Eye;
    }
  };

  /**
   * The function "openCloseModal" sets the title to "Medical Details" and the modal content to
   * "medical_detail".
   */
  const openCloseEditModal = () => {
    setTitle("Medical Details");
    setModalContent("medical_detail");
  };

  const openCloseViewModal = () => {
    setTitle("Medical Details");
    setModalContent("medical_detail_view");
  };

  const status = details?.data?.consultation_status;
  const isDoctorAssigned = status === consultation_doctor_assigned_value;
  const isConsultationMissed = status === consultation_missed_value;
  const isUnderReview = status === consultation_under_review_status_value;
  const isNurseApproved = status == consultation_nurse_approved_status_value;

  function switchLogo() {
    switch (true) {
      case isConsultationMissed:
        return null;
      case isDoctorAssigned:
        return null;
      case editable:
        return Pencil;
      case isUnderReview:
        return Pencil;
      case isNurseApproved:
        return Pencil;
      default:
        return null;
    }
  }

  /* `const { data } = patientDetail;` is using object destructuring to extract the `data` property
  from the `patientDetail` object. It assigns the value of `patientDetail.data` to the `data`
  variable. This allows easier access to the `data` property within the component. */
  const { data } = patientDetail;
  /**
   * The function `Response` returns an array of question-answer pairs extracted from a data object.
   * @returns An array of objects with "question" and "answer" properties.
   */
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

  /**
   * The function appends additional questions and answers to an existing array.
   * @returns The function `appendQuestionsandAnswers` is returning a new array `newResp` which is the
   * concatenation of the `resp` array and the `additionalQuestionsandAnswers` array.
   */
  const appendQuestionsandAnswers = () => {
    const newResp = resp.concat(additionalQuestionsandAnswers);
    return newResp;
  };
  const append = appendQuestionsandAnswers();

  const switchMapper = resp.length === 4 ? append : resp;

  return (
    <>
      <div className="main-detail">
        <CustomCard
          title={"Medical Details"}
          src={switchLogo()}
          onClick={
            isConsultationMissed || isDoctorAssigned
              ? openCloseViewModal
              : openCloseEditModal
          }
          bodyStyle={
            {
              // height: "280px",
              // overflow: "clip"
            }
          }
          // editable={
          //   isConsultationMissed || isDoctorAssigned ? false : editable
          // }
        >
          {switchMapper.length > 0 ? (
            switchMapper?.map((item: any, index: number) => {
              return (
                <div className="medical-detail-card mb-2" key={index}>
                  <div className="card-question numbering">
                    <span>{index + 1}. </span>
                    {item.question}
                  </div>
                  <div className="card-answer text-capitalize">
                    {item.answer || "N/A"}
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="row">
                <div className="col-12 img-div">
                  <img src={Null} alt="placeholder" />
                  <p className="text-gray-500 text-center">
                    No Medical Details
                  </p>
                </div>
              </div>
            </>
          )}
        </CustomCard>
      </div>
    </>
  );
}
