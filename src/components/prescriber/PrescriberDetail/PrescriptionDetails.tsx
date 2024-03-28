import { Eye, Pencil } from "@assets/index";
import CustomCard from "@components/Card";
import { INurseConsulationDetails, IPatientDetailsBYOid } from "./main";
import { consultation_prescribed_status_value } from "@utils/constants";
import { makespace } from "@utils/helper";
import BasicModal from "@components/Modal";

import CancelScriptModal from "@components/Nurse/NurseDetail/ModalContent/cancelScriptModal";
import { useSearchParams } from "react-router-dom";

type IProps = {
  setTitle: (title: string) => void;
  setModalContent: (content: string) => void;
  patientDetail: IPatientDetailsBYOid;
  editable?: boolean;
  details?: INurseConsulationDetails;
};

export default function PrescriptionDetails({
  setTitle,
  setModalContent,
  patientDetail,
  editable = true,
  details,
}: IProps) {
  const [params, setParams] = useSearchParams();
  const { data } = details as any;

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
  const onCancelClicked = () => {
    localStorage.setItem("canceled", "all");
    params.set("canceled", "all");
    setParams(params);
  };

  const onEachCancelClicked = (id: number) => {
    localStorage.setItem("canceled", id.toString());
    params.set("canceled", id.toString());
    setParams(params);
  };

  const openCloseViewModal = () => {
    setTitle("Medical Details");
    setModalContent("medical_detail_view");
  };

  /* The code is defining two variables `status` and `isPrescribed`. */
  const status = details?.data?.consultation_status;
  const isPrescribed = status === consultation_prescribed_status_value;

  /**
   * The function `Response` returns an array of question-answer pairs extracted from a data object.
   * @returns An array of objects with "question" and "answer" properties.
   */
  const Response = () => {
    if (data && data?.prescriptions?.prescribed_items) {
      return (
        data?.prescriptions?.prescribed_items?.map((item: any) => {
          return {
            item,
          };
        }) ?? []
      );
    } else {
      return [];
    }
  };
  const resp = Response();

  /* The line `const allCancelled = resp.every((item: any) => item.item.cancelled === true)` is
    checking if every item in the `resp` array has the `cancelled` property set to `true`. It
    returns `true` if all items have `cancelled` set to `true`, otherwise it returns `false`. */
  const allCancelled = resp.every((item: any) => item.item.cancelled === true);

  return (
    <>
      <div className="main-detail">
        <CustomCard
          title={"Prescription Details"}
          bodyStyle={{
            overflowY: "auto",
            overflowX: "hidden",
          }}
          onCancelClick={onCancelClicked}
          display={allCancelled ? "d-none" : "d-block"}
        >
          {resp &&
            resp.map((item: any, index: number) => {
              return (
                <div
                  className="w-full mb-2"
                  key={index}
                  style={
                    {
                      // border: item.item.cancelled ? "0.5px solid red" : "",
                    }
                  }
                >
                  <div className="card-body_like">
                    {/* <>
                      <div className="d-flex justify-content-end w-full">
                        <span
                          className="d-flex "
                          style={{
                            cursor: "pointer",
                            color: `${PRIMARY_COLOR}`,
                            fontSize: "16px",
                          }}
                          onClick={() => {
                            onEachCancelClicked(item.item.product_id);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#cancelScript"
                        >
                          {item.item.cancelled ? "" : "X"}
                        </span>
                      </div>
                    </> */}

                    <span className="d-flex">
                      <label className="text-gray-500  card_space">
                        Product Details:
                      </label>
                      <label className="text-gray-950 me-5">
                        {item.item.product_name}
                        {item.item.cancelled ? (
                          <label className="text-danger bg-danger-50 application_status_badge mx-md-3 text-center">
                            Cancelled
                          </label>
                        ) : null}
                      </label>
                    </span>
                    <span className=" ">
                      <label className="text-gray-500 card_space">
                        Repeat:
                      </label>
                      <label className="text-gray-950">
                        {item.item.repeat}
                      </label>
                    </span>
                    <span className="">
                      <label className="text-gray-500 card_space">
                        Dosage:
                      </label>
                      <label className="text-gray-950">
                        {makespace(item.item.dosage)}
                      </label>
                    </span>

                    <span className="">
                      <label className="text-gray-500 card_space">
                        Quantity:
                      </label>
                      <label className="text-gray-950">
                        {item.item.quantity}
                      </label>
                    </span>
                    <span className="">
                      <label className="text-gray-500 card_space">
                        Quantity Extended:
                      </label>
                      <label className="text-gray-950">
                        {item.item.quantity_extended || "-"}
                      </label>
                    </span>
                    <span className="">
                      <label className="text-gray-500 card_space">Cost:</label>
                      <label className="text-gray-950">
                        $ {item.item.product_pricing}
                      </label>
                    </span>
                    <span className="">
                      <label className="text-gray-500 card_space">
                        Dosage Instruction:
                      </label>
                      <label className="text-gray-950">
                        {item.item.patient_instruction}
                      </label>
                    </span>
                  </div>
                </div>
              );
            })}
          {/* {slicer.length > 0 ? (
                        slicer?.map((item: any, index: number) => {
                            return (
                                <div className="medical-detail-card mb-2" key={index}>
                                    <div className="card-question">{item.question}</div>
                                    <div className="card-answer">{item.answer || "N/A"}</div>
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <div className="row">
                                <div className="col-12 img-div">
                                    <img src={Null} alt="placeholder" />
                                    <p className="text-gray-500 text-center">No Medical Details</p>
                                </div>
                            </div>
                        </>
                    )} */}
        </CustomCard>
      </div>
      <BasicModal
        modalId="cancelScript"
        title={"Cancel Script?"}
        extraStyle={{}}
      >
        <CancelScriptModal />
      </BasicModal>
    </>
  );
}
