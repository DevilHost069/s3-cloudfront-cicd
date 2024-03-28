import {
  getConsultationStatus,
  precriber_missed_status,
  prescriber_prescribed_status,
  prescriber_rejected_status,
} from "@utils/constants";
import React, { Dispatch, SetStateAction, useState } from "react";
import PrescriptionDetails from "../PrescriptionDetails";
import { INurseConsulationDetails, IPatientDetailsBYOid } from "../main";
import MedicationsHeader from "./MedicationsHeader";
import BasicModal from "@components/Modal";
import CreateNewRx from "./ModalContent/CreateNewRx/main";
import NewRecipe from "./ModalContent/NewRecipe/main";
import PrescriptionList from "./PrescriptionList";
import { useSearchParams } from "react-router-dom";

type IMedications = {
  setTitle: (title: string) => void;
  patientDetail: IPatientDetailsBYOid;
  details?: any;
  onCloseMedications: () => void;
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
};
const Medications = ({
  details,
  setTitle,
  patientDetail,
  onCloseMedications,
  setActiveTab,
  activeTab,
}: IMedications) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalTitle, setModalTitle] = useState("Create new");
  const [modalContent, setModalContent] = useState("");
  const contentName = {
    newRx: <CreateNewRx patientDetail={patientDetail} />,
  };
  const newAllowed = () => {
    return (
      getConsultationStatus(details.data).value !==
        prescriber_rejected_status &&
      getConsultationStatus(details.data).value !== precriber_missed_status
    );
  };
  return (
    <>
      <MedicationsHeader
        setTitle={setModalTitle}
        title={"Medications"}
        onCloseMedications={onCloseMedications}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setModalContent={setModalContent}
        newAllowed={newAllowed()}
      />
      <PrescriptionList activeTab={activeTab} />
      {/* {details?.data?.consultation_status === prescriber_prescribed_status && (
        <div className="col-12 mb-md-3">
          {details?.data?.prescriptions?.id !== undefined &&
          !details.isLoading ? (
            <>
              <PrescriptionDetails
                setTitle={setTitle}
                setModalContent={setModalContent}
                patientDetail={patientDetail}
                editable={false}
                details={details}
              />
            </>
          ) : null}
        </div>
      )} */}
      <BasicModal
        title={modalTitle}
        hideCross={false}
        fullScreen
        refresh={false}
        modalId={"newRx"}
        onClose={() => {
          searchParams.delete("newRx");
          setSearchParams(searchParams);
        }}
      >
        {contentName[modalContent]}
      </BasicModal>
      <BasicModal
        title={"New recipe"}
        hideCross={false}
        refresh={false}
        modalId={"newRecipe"}
        fullScreen
        extraCloseProps={{
          "data-bs-toggle": "modal",
          "data-bs-target": "#myModal",
          "data-dismiss": "modal",
        }}
      >
        <NewRecipe />
      </BasicModal>
    </>
  );
};

export default Medications;
