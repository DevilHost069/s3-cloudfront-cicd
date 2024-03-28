import "@assets/css/Nurse/nurse_detail.css";
import "@assets/css/notes.css";
import BasicModal from "@components/Modal";
import MedicalDetail from "@components/Nurse/NurseDetail/MedicalDetail";
import PersonalDetail from "@components/Nurse/NurseDetail/PersonalDetail";
import NotesAndReminder from "@components/prescriber/PrescriberDetail/ModalContent/Note/NotesAndReminder";
import { useEffect, useState } from "react";

import DeleteContent from "@components/Nurse/NurseDetail/ModalContent/Note/DeleteContent";
import PatientDocumentContent from "@components/Nurse/NurseDetail/ModalContent/PatientDocument";
import CardInformation from "@components/Nurse/NurseDetail/ModalContent/makePayment/cardInformation";
import NewNote from "@components/prescriber/PrescriberDetail/ModalContent/Note/NewNote";
import RejectReason from "@components/prescriber/PrescriberDetail/ModalContent/RejectReason";
import PrescriberDetailAction from "@components/prescriber/PrescriberDetail/PrescriberDetailAction";
import Loader from "@components/shared/Loader";
import { INurseConsulationDetail } from "@server/Nurse/Nurse-Consulation/detail";
import { useMarkConsultationAsApproved } from "@server/Nurse/Nurse-Consulation/useMarkConsulationAsApproved";
import { IPatientDetailByOID } from "@server/patient/getPatientDetailByOID";
import { useGetSinglePatientDetailByOid } from "@server/patient/getSinglePatientDetail";
import { useUpdatePatient } from "@server/patient/update";
import { useUpdatePatientResponse } from "@server/patient/updatequestionnaireResponse";
import {
  INoteData,
  useGetNoteListPrescriber,
} from "@server/prescriber/Prescriber-Consultation/Note/List";
import { useDeletNotePrescriber } from "@server/prescriber/Prescriber-Consultation/Note/delete";
import { useGetNotePrescriber } from "@server/prescriber/Prescriber-Consultation/Note/detail";
import { useUpdateNotePrescriber } from "@server/prescriber/Prescriber-Consultation/Note/update";
import { useGetPrescriberConsulationDetailByOID } from "@server/prescriber/Prescriber-Consultation/detail";
import { useMarkConsultationAsMissedPrescriber } from "@server/prescriber/Prescriber-Consultation/useMarkConsultationAsMissed";
import { IPrescriberConsulationDetail } from "@server/prescriber/useGetSingleDetailResponseOfPrescriberConsulation";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import {
  consultation_doctor_assigned_value,
  consultation_missed_value,
  consultation_nurse_approved_status_value,
  getConsultationStatus,
  precriber_missed_status,
  prescriber_prescribed_status,
  prescriber_rejected_status,
} from "@utils/constants";
import "react-quill/dist/quill.snow.css";
import { useSearchParams } from "react-router-dom";
import RejectionDetail from "./RejectionDetail";
import MedicalDetailView from "@components/Nurse/NurseDetail/ModalContent/MedicalDetailView";
import CreatePrescription from "./ModalContent/CreatePrescription";
import ChildModal from "./ModalContent/CreatePrescription/MultiChildModals/ChildModal";
import PrescriptionDetails from "./PrescriptionDetails";
import PrescriptionDetail from "./ModalContent/PrescriptionDetail";
import { IPrescriptionResponse } from "@shared/types/prescriber";
import Medications from "./Medications/main";
import ProductOptionsProvider from "@contexts/ProductOptionsContext";
import { useProfile } from "@contexts/ProfileContext";
import {
  ITimelineData,
  useGetPatientTimelineData,
} from "@server/patient/getPatientTimeline";
import PatientTimeline from "@components/Patient/Timeline";

export type INurseConsulationDetails = {
  data: IPrescriberConsulationDetail | undefined;
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
  data: { prescriber_notes: INoteData[]; nurse_notes: INoteData[] } | undefined;
  isError: boolean | undefined;
  isLoading: boolean | undefined;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};

export type ITimelineEvents = {
  data: ITimelineData[] | undefined;
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

export type IPrescriptionDetail = {
  data: IPrescriptionResponse | undefined;
  isError: boolean | undefined;
  isLoading: boolean | undefined;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};

export default function PrescriberDetail() {
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalContent, setModalContent] = useState("");
  const [noteOid, setNoteOid] = useState<string>("");
  const [styler, setStyler] = useState({});
  const [hideCross, setHideCross] = useState(false);
  const [showMobileNotes, setShowMobileNotes] = useState(false);
  const [activeTab, setActiveTab] = useState("current rx");
  const { showMedications, setActivePatientSummaryName, setShowMedications } =
    useProfile();
  /* These lines of code are retrieving the values of the query parameters "nurse_oid", "patient_oid",
  and "consultation_oid" from the URL. The values are stored in the variables `nurseOid`,
  `patientOid`, and `consultationOid`, respectively. These query parameters are typically used to pass
  data between different pages or components in a web application. */
  const nurseOid = searchParams.get("nurse_oid");
  const patientOid = searchParams.get("patient_oid");
  const consultationOid = searchParams.get("consultation_oid");
  const prescriptionOID = searchParams.get("prescription_oid");
  const medicationsShown = searchParams.get("medications");

  /* The line of code `const details = useGetPrescriberConsulationDetailByOID(consultationOid) as
  INurseConsulationDetails;` is calling a custom hook `useGetPrescriberConsulationDetailByOID` and
  assigning the returned value to the variable `details`. The `useGetPrescriberConsulationDetailByOID` hook
  is responsible for fetching the nurse consultation details based on the provided `consultationOid`.
  The `as INurseConsulationDetails` part is used to specify the type of the returned value, ensuring
  that `details` has the correct type. */
  // const details = useGetPrescriberConsulationDetailByOID(
  //   consultationOid
  // ) as IPrescriberConsulationDetails;

  const details = useGetPrescriberConsulationDetailByOID(
    consultationOid
  ) as any;

  /* These lines of code are using custom hooks `useGetNoteList` and `useGetPAtientDtailByOID` to fetch
  data related to notes and patient details. */
  const notes = useGetNoteListPrescriber(consultationOid) as INoteList;
  const patientDetail = useGetSinglePatientDetailByOid(
    patientOid
  ) as IPatientDetailsBYOid;

  const timeline_events = useGetPatientTimelineData(
    patientOid
  ) as ITimelineEvents;
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
  const getNote = useGetNotePrescriber(noteOid || "") as any;
  /* The line `const deleteNote = useDeletNote();` is creating a variable `deleteNote` that is assigned
  the value returned by the `useDeletNote` hook. The `useDeletNote` hook is responsible for deleting
  a note. The `deleteNote` variable can be used to call the deleteNote function and delete a specific
  note. */
  const deleteNote = useDeletNotePrescriber();
  /* The line of code `const update = useUpdateNote(noteOid || "");` is using a custom hook
  `useUpdateNote` to create a function `update` that can be used to update a specific note. The
  `useUpdateNote` hook takes the `noteOid` as a parameter and returns the `update` function. The
  `noteOid` is passed as a parameter to the `useUpdateNote` hook. The `|| ""` part is a fallback
  value in case `noteOid` is `null` or `undefined`. */
  const update = useUpdateNotePrescriber(noteOid || "");

  /* The line of code `const missed = useMarkConsultationAsMissed({...}) as any;` is using a custom
  hook `useMarkConsultationAsMissed` to create a function `missed` that can be used to mark a
  consultation as missed. */
  const missed = useMarkConsultationAsMissedPrescriber({
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
    reject_reason: <RejectReason />,
    medical_detail: <MedicalDetailView patientDetail={patientDetail} />,
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
    create_prescription: (
      <CreatePrescription
        setTitle={setTitle}
        setModalContent={setModalContent}
      />
    ),
    prescription: (
      <PrescriptionDetail
        oid={prescriptionOID}
        setModalContent={setModalContent}
      />
    ),
    pharmacy: <div>Pharmacy</div>,
  };

  /* The above code is using the useEffect hook in a React component. It is checking the value of the
  "modalContent" variable and if it is equal to "medical_detail", it sets the "styler" state to an
  object with a height of "800px" and overflowY set to "scroll". Otherwise, it sets the "styler"
  state to an empty object. This code is likely used to dynamically adjust the styling of a modal
  component based on the value of "modalContent". */
  useEffect(() => {
    if (modalContent === "medical_detail") {
      setHideCross(true);
    }
  }, [modalContent]);
  useEffect(() => {
    if (medicationsShown === "true" && !showMedications)
      setShowMedications(true);
  }, [medicationsShown]);
  useEffect(() => {
    if (patientDetail?.data) {
      setActivePatientSummaryName(
        `${patientDetail.data.first_name} ${patientDetail.data.last_name}`
      );
    }
  }, [patientDetail]);

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
      <ProductOptionsProvider>
        <div className="row row-scroll overflow-hidden">
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
            {!showMedications ? (
              <>
                <PrescriberDetailAction
                  nurseApproved={nurseApproved}
                  details={details}
                  missed={missed}
                  patientDetail={patientDetail}
                  setTitle={setTitle}
                  setModalContent={setModalContent}
                  setShowMedications={(show) => {
                    setShowMedications(show);
                    searchParams.set("medications", "true");
                    setSearchParams(searchParams);
                  }}
                  showMedications={showMedications}
                />
                <div className="row pt-3">
                  <div className="col-12 mb-xs-3 mb-sm-3 mb-md-3">
                    <PersonalDetail
                      setTitle={setTitle}
                      setModalContent={setModalContent}
                      patientDetail={patientDetail}
                      editable={false}
                    />
                  </div>
                </div>
                <div className="row pt-3">
                  <div className="col-12 mb-md-3">
                    <MedicalDetail
                      setTitle={setTitle}
                      setModalContent={setModalContent}
                      patientDetail={patientDetail}
                      editable={false}
                    />
                  </div>

                  {details?.data?.consultation_status ===
                    prescriber_rejected_status && (
                    <div className="col-12 mb-md-3">
                      {details?.data?.consultation_status ===
                      prescriber_rejected_status ? (
                        <RejectionDetail details={details?.data} />
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>

                <div className="row pt-3">
                  <div className="col-12 mb-md-3">
                    <PatientTimeline
                      setTitle={setTitle}
                      timeline_events={timeline_events}
                    />
                  </div>
                </div>
              </>
            ) : (
              <Medications
                setTitle={setTitle}
                patientDetail={patientDetail}
                details={details}
                onCloseMedications={() => {
                  setShowMedications(!showMedications);
                  searchParams.delete("medications");
                  setSearchParams(searchParams);
                }}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
              />
            )}
          </div>
          <div
            className={`col-12 bg-white col-sm-12 col-md-4 col-xl-4 mb-md-3 aside card-header row-scroll`}
          >
            <div
              className={`patient_notes ${
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
          hideCross={hideCross}
          modalSize={"modal-lg"}
        >
          {contentName[modalContent]}
        </BasicModal>
        <ChildModal title={"Prescription Details"} modalSize="">
          {contentName[modalContent]}
        </ChildModal>
      </ProductOptionsProvider>
    </>
  );
}
