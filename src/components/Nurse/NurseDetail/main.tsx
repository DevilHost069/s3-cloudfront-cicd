import "@assets/css/Nurse/nurse_detail.css";
import "@assets/css/notes.css";
import DetailAction from "./DetailAction";
import PersonalDetail from "./PersonalDetail";
import MedicalDetail from "./MedicalDetail";
import NotesAndReminder from "./NotesAndReminder";
import { useEffect, useState } from "react";
import BasicModal from "@components/Modal";

import "react-quill/dist/quill.snow.css";
import NewNote from "./ModalContent/Note/NewNote";
import MedicalDetailContent from "./ModalContent/MedicalDetail";
import PersonalDetailContent from "./ModalContent/PersonalDetail";
import PatientDocumentContent from "./ModalContent/PatientDocument";
import {
  INurseConsulationDetail,
  useGetNurseConsulationDetailByOID,
} from "@server/Nurse/Nurse-Consulation/detail";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import Loader from "@components/shared/Loader";
import { IPatientDetailByOID } from "@server/patient/getPatientDetailByOID";
import {
  INoteData,
  useGetNoteList,
} from "@server/Nurse/Nurse-Consulation/Note/List";
import { useSearchParams } from "react-router-dom";
import DeleteContent from "./ModalContent/Note/DeleteContent";
import { useGetNote } from "@server/Nurse/Nurse-Consulation/Note/detail";
import { useDeletNote } from "@server/Nurse/Nurse-Consulation/Note/delete";
import { useUpdateNote } from "@server/Nurse/Nurse-Consulation/Note/update";
import { useMarkConsultationAsMissed } from "@server/Nurse/Nurse-Consulation/useMarkConsultationAsMissed";
import {
  consultation_doctor_assigned_value,
  consultation_missed_value,
  consultation_nurse_approved_status_value,
  getConsultationStatus,
} from "@utils/constants";
import { useMarkConsultationAsApproved } from "@server/Nurse/Nurse-Consulation/useMarkConsulationAsApproved";
import { useUpdatePatient } from "@server/patient/update";
import { useUpdatePatientResponse } from "@server/patient/updatequestionnaireResponse";
import CardInformation from "./ModalContent/makePayment/cardInformation";
import AssignDoctor from "./ModalContent/AssignDoctor";
import ConsulationDetails from "./ConsulationDetails";
import { IPrescriberConsulationDetail } from "@server/prescriber/useGetSingleDetailResponseOfPrescriberConsulation";
import { useProfile } from "@contexts/ProfileContext";
import { useGetSinglePatientDetailByOid } from "@server/patient/getSinglePatientDetail";
import Alert from "../Alert";
import PersonalDetailView from "./ModalContent/PersonalDetailView";
import MedicalDetailView from "./ModalContent/MedicalDetailView";
import PatientTimeline from "@components/Patient/Timeline";
import { useGetPatientTimelineData } from "@server/patient/getPatientTimeline";
import { ITimelineEvents } from "@components/prescriber/PrescriberDetail/main";

export type INurseConsulationDetails = {
  data: INurseConsulationDetail | undefined;
  isError: boolean | undefined;
  isLoading: boolean | undefined;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<INurseConsulationDetail, Error>>;
};

export type IPatientDetailsBYOid = {
  data: IPatientDetailByOID;
  isError: boolean | undefined;
  isLoading: boolean | undefined;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};

export type INoteList = {
  data: any | undefined;
  isError: boolean | undefined;
  isLoading: boolean | undefined;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};

export type IPrescriberConsulationDetails = {
  data: IPrescriberConsulationDetail | undefined;
  isError: boolean | undefined;
  isLoading: boolean | undefined;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};

export default function NurseDetail() {
  const ctx = useProfile();
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalContent, setModalContent] = useState("");
  const [noteOid, setNoteOid] = useState<string>("");
  const [styler, setStyler] = useState({});
  const [detailFilled, setDetailFilled] = useState(false);
  const [hideCross, setHideCross] = useState(false);
  const [showMobileNotes, setShowMobileNotes] = useState(false);
  const alertMsg = "Personal Details or Medical Details are mandatory to fill.";

  useEffect(() => {
    if (detailFilled) {
      setTimeout(() => {
        setDetailFilled(false);
      }, 5000);
    }
  }, [detailFilled]);

  const crossClick = () => {
    setDetailFilled(!detailFilled);
  };

  /* These lines of code are retrieving the values of the query parameters "nurse_oid", "patient_oid",
  and "consultation_oid" from the URL. The values are stored in the variables `nurseOid`,
  `patientOid`, and `consultationOid`, respectively. These query parameters are typically used to pass
  data between different pages or components in a web application. */
  const nurseOid = searchParams.get("nurse_oid");
  const patientOid = searchParams.get("patient_oid");
  const consultationOid = searchParams.get("consultation_oid");

  const patientDetail = useGetSinglePatientDetailByOid(
    patientOid
  ) as IPatientDetailsBYOid;

  const timeline_events = useGetPatientTimelineData(
    patientOid
  ) as ITimelineEvents;

  const { data } = patientDetail;

  const dataofPersonalDetail = {
    medicare_number: data?.medicare_number,
    dob: data?.dob,
    gender: data?.gender,
    address: data?.address,
    health_identifier: data?.health_identifier,
  };

  const checkPersonalDetail = () => {
    if (
      dataofPersonalDetail.medicare_number === null ||
      dataofPersonalDetail.medicare_number === "" ||
      dataofPersonalDetail.medicare_number === undefined
    ) {
      return true;
    }
    if (
      dataofPersonalDetail.dob === null ||
      dataofPersonalDetail.dob === "" ||
      dataofPersonalDetail.dob === undefined
    ) {
      return true;
    }
    if (
      dataofPersonalDetail.gender === null ||
      dataofPersonalDetail.gender === "" ||
      dataofPersonalDetail.gender === undefined
    ) {
      return true;
    }
    if (
      dataofPersonalDetail.address === null ||
      dataofPersonalDetail.address === "" ||
      dataofPersonalDetail.address === undefined
    ) {
      return true;
    }
    if (
      dataofPersonalDetail.health_identifier === null ||
      dataofPersonalDetail.health_identifier === "" ||
      dataofPersonalDetail.health_identifier === undefined
    ) {
      return true;
    }
    return false;
  };

  const checkDataofPersonalDetail = checkPersonalDetail();

  const dataofMedicalDetail = {
    patient_responses: data?.patient_responses?.map((item) => {
      return {
        response_json: item?.response_json?.map((item) => {
          return {
            question: item.question,
            answer: item.answer,
          };
        }),
      };
    }),
  };
  const responseJson = dataofMedicalDetail.patient_responses?.map((item) => {
    // check length of response_json if it is 0  or less than equal to 4
    return (
      item?.response_json?.length === 0 || item?.response_json?.length <= 6
    );
  });
  // check length of response_json if it is 0  or less than equal to 4
  const checkResponseJson = responseJson?.includes(true) as boolean;

  //  check data of medical detail and checkResponseJson
  const checkDataofMedicalDetail =
    dataofMedicalDetail.patient_responses?.length === 0 ||
    (dataofMedicalDetail.patient_responses?.every((item) => {
      return item?.response_json?.every((item) => {
        return (
          item.question === null ||
          item.question === "" ||
          item.question === undefined ||
          item.answer === null ||
          item.answer === "" ||
          item.answer === undefined ||
          checkResponseJson
        );
      });
    }) as boolean);

  /* The line of code `const details = useGetNurseConsulationDetailByOID(consultationOid) as
  INurseConsulationDetails;` is calling a custom hook `useGetNurseConsulationDetailByOID` and
  assigning the returned value to the variable `details`. The `useGetNurseConsulationDetailByOID` hook
  is responsible for fetching the nurse consultation details based on the provided `consultationOid`.
  The `as INurseConsulationDetails` part is used to specify the type of the returned value, ensuring
  that `details` has the correct type. */
  const details = useGetNurseConsulationDetailByOID(
    consultationOid
  ) as INurseConsulationDetails;

  const isDoctorAssigned =
    details.data.consultation_status === consultation_doctor_assigned_value
      ? true
      : false;

  /* These lines of code are using custom hooks `useGetNoteList` and `useGetPAtientDtailByOID` to fetch
  data related to notes and patient details. */
  const notes = useGetNoteList(consultationOid) as INoteList;

  /* The line of code `const updatePatient = useUpdatePatient(patientOid || "");` is using a custom
  hook `useUpdatePatient` to create a function `updatePatient` that can be used to update patient
  details. The `useUpdatePatient` hook takes the `patientOid` as a parameter and returns the
  `updatePatient` function. */
  const updatePatient = useUpdatePatient(patientOid || "");

  /* The line of code `const getNote = useGetNote(noteOid || "") as any;` is creating a variable
  `getNote` that is assigned the value returned by the `useGetNote` hook. The `useGetNote` hook is
  responsible for fetching a specific note based on the provided `noteOid`. The `noteOid` is passed
  as a parameter to the `useGetNote` hook. The `|| ""` part is a fallback value in case `noteOid` is
  `null` or `undefined`. The `as any` part is used to specify the type of the returned value as
  `any`, which means the type is not known or not important in this context. */
  const getNote = useGetNote(noteOid || "") as any;
  /* The line `const deleteNote = useDeletNote();` is creating a variable `deleteNote` that is assigned
  the value returned by the `useDeletNote` hook. The `useDeletNote` hook is responsible for deleting
  a note. The `deleteNote` variable can be used to call the deleteNote function and delete a specific
  note. */
  const deleteNote = useDeletNote();
  /* The line of code `const update = useUpdateNote(noteOid || "");` is using a custom hook
  `useUpdateNote` to create a function `update` that can be used to update a specific note. The
  `useUpdateNote` hook takes the `noteOid` as a parameter and returns the `update` function. The
  `noteOid` is passed as a parameter to the `useUpdateNote` hook. The `|| ""` part is a fallback
  value in case `noteOid` is `null` or `undefined`. */
  const update = useUpdateNote(noteOid || "");

  /* The line of code `const missed = useMarkConsultationAsMissed({...}) as any;` is using a custom
  hook `useMarkConsultationAsMissed` to create a function `missed` that can be used to mark a
  consultation as missed. */
  const missed = useMarkConsultationAsMissed({
    consultation_status: consultation_missed_value,
    msg: "Consultation marked as missed",
  }) as any;
  /* The line of code `const nurseApproved = useMarkConsultationAsApproved({...}) as any;` is using a
  custom hook `useMarkConsultationAsApproved` to create a function `nurseApproved` that can be used
  to mark a consultation as approved by the nurse. */
  const nurseApproved = useMarkConsultationAsApproved({
    consultation_status: consultation_nurse_approved_status_value,
  }) as any;
  /* The line of code `const doctorAssigned = useMarkConsultationAsApproved({...}) as any;` is using a
  custom hook `useMarkConsultationAsApproved` to create a function `doctorAssigned` that can be used
  to mark a consultation as assigned to a doctor. */
  const doctorAssigned = useMarkConsultationAsApproved({
    consultation_status: consultation_doctor_assigned_value,
    msg: "Consultation marked as Doctor Assigned.",
  }) as any;

  /* The line `const updPatientResponse = useUpdatePatientResponse(patientOid);` is using a custom hook
  `useUpdatePatientResponse` to create a function `updPatientResponse` that can be used to update the
  patient's questionnaire response. The `useUpdatePatientResponse` hook takes the `patientOid` as a
  parameter and returns the `updPatientResponse` function. This function can be used to update the
  patient's questionnaire response data. */
  const updPatientResponse = useUpdatePatientResponse(patientOid);

  /* The code is defining an object called `contentName` which contains different properties,
  each representing a specific content component. These components are used in a React application
  to render different sections of a user interface. Each property value is a JSX element that
  represents a specific content component. */

  const contentName = {
    personal_detail: (
      <PersonalDetailContent
        patientDetail={patientDetail}
        updatePatient={updatePatient}
      />
    ),
    personal_detail_view: <PersonalDetailView patientDetail={patientDetail} />,
    medical_detail: (
      <MedicalDetailContent
        patientDetail={patientDetail}
        updPatientResponse={updPatientResponse}
      />
    ),
    medical_detail_view: <MedicalDetailView patientDetail={patientDetail} />,
    notes_and_reminder: (
      <NewNote state={title} getNote={getNote} update={update} />
    ),
    patient_document: <PatientDocumentContent />,
    notes_and_reminder_delete: (
      <DeleteContent
        noteOid={noteOid}
        deleteNote={deleteNote}
        setNoteOid={setNoteOid}
      />
    ),
    make_payment: <CardInformation />,
    assign_doctor: <AssignDoctor doctorAssigned={doctorAssigned} />,
  };

  const contentType = [
    "personal_detail_view",
    "personal_detail",
    "medical_detail",
    "medical_detail_view",
  ];

  /* The above code is using the useEffect hook in a React component. It is checking the value of the
  "modalContent" variable and if it is equal to "medical_detail", it sets the "styler" state to an
  object with a height of "800px" and overflowY set to "scroll". Otherwise, it sets the "styler"
  state to an empty object. This code is likely used to dynamically adjust the styling of a modal
  component based on the value of "modalContent". */
  useEffect(() => {
    if (modalContent === "medical_detail") {
      setStyler({
        height: "800px",
        overflowY: "scroll",
      });
    } else {
      setStyler({});
    }
  }, [modalContent]);

  useEffect(() => {
    if (
      modalContent === "personal_detail_view" ||
      modalContent === "medical_detail_view"
    ) {
      setHideCross(true);
    }
  }, [modalContent]);

  /* The above code is checking multiple conditions using the logical OR operator (||). It is checking
  if any of the following conditions are true: */
  if (
    details?.isLoading ||
    patientDetail?.isLoading ||
    notes?.isLoading ||
    deleteNote.isSuccess ||
    update.isSuccess ||
    missed.isPending
  ) {
    return <Loader />;
  }

  return (
    <>
      <div className="row row-scroll">
        {detailFilled && (
          <div
            className="col-xs-12 col-sm-12 col-md-8 col-xl-8"
            style={{
              padding: "0px 40px",
            }}
          >
            <Alert
              msg={alertMsg}
              style={styler}
              crossClick={crossClick}
              bgColor="bg-danger-50"
            />
          </div>
        )}
        <div className="col-xs-12 col-sm-12 col-md-8 col-xl-8 mb-md-3 main-content-container">
          <div className="d-flex d-md-none w-full justify-content-end">
            <button
              className="btn btn-outline-primary mb-3"
              type="button"
              style={{
                cursor: "pointer",
                textAlign: "center",
                fontWeight: "600",
              }}
              onClick={() => setShowMobileNotes(true)}
            >
              Notes
            </button>
          </div>
          <DetailAction
            nurseApproved={nurseApproved}
            details={details}
            missed={missed}
            patientDetail={patientDetail}
            setTitle={setTitle}
            setModalContent={setModalContent}
            checkDataofPersonalDetail={checkDataofPersonalDetail}
            checkDataofMedicalDetail={checkDataofMedicalDetail}
            setDetailFilled={setDetailFilled}
          />
          <div className="row pt-3">
            <div className="col-12 mb-xs-3 mb-sm-3 mb-md-3">
              <PersonalDetail
                setTitle={setTitle}
                setModalContent={setModalContent}
                patientDetail={patientDetail}
                details={details}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-12 mb-xs-3 mb-sm-3 mb-md-3">
              <MedicalDetail
                setTitle={setTitle}
                setModalContent={setModalContent}
                patientDetail={patientDetail}
                details={details}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-12 mb-md-3">
              {isDoctorAssigned ? (
                <ConsulationDetails prescriberDetail={details} />
              ) : null}
            </div>
            {/* <div className="col-xs-12 col-sm-12 col-md-12 col-xl-6 mb-md-3">
              <PatientDocument
                setTitle={setTitle}
                setModalContent={setModalContent}
              />
            </div> */}
          </div>

          <div className="row pt-3">
            <div className="col-12 mb-md-3">
              <PatientTimeline
                setTitle={setTitle}
                timeline_events={timeline_events}
              />
            </div>
          </div>
        </div>
        <div className="col-4 bg-white col-sm-12 col-md-4 col-xl-4 mb-md-3 card-header aside row-scroll">
          <div
            className={`patient_notes  ${
              showMobileNotes ? "expanded" : ""
            } bg-white`}
          >
            <NotesAndReminder
              setTitle={setTitle}
              setModalContent={setModalContent}
              notes={notes}
              setNoteOid={setNoteOid}
              getNote={getNote}
              setShowMobileNotes={setShowMobileNotes}
              updatesAllowed={true}
            />
          </div>
        </div>
      </div>
      <BasicModal
        title={title}
        extraStyle={styler}
        modalSize={contentType.includes(modalContent) ? "modal-lg" : ""}
        hideCross={hideCross}
      >
        {contentName[modalContent]}
      </BasicModal>
    </>
  );
}
