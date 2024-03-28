import { Toaster } from "@components/shared/Toaster";
import logout from "@server/auth/Logout";
import { useCancelPrescriptions } from "@server/prescriber/useCancelPrescriptionByOID";
import { queryKeys } from "@shared/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export type ICancelScriptModal = {
  p_oid?: string;
  resetP_oid?: any;
};

export default function CancelScriptModal({
  p_oid,
  resetP_oid,
}: ICancelScriptModal) {
  const [params, setParams] = useSearchParams();
  const [stored, setStored] = useState(null);
  const navigate = useNavigate();
  const client = useQueryClient();
  const oid = params.get("prescription_oid");
  const store = localStorage.getItem("prescription_id");

  const id = p_oid ? p_oid : store !== null ? store : oid;
  const cancel = useCancelPrescriptions(id);

  const cancelParam = params.get("canceled");

  const btnStyles = {
    borderRadius: "4px",
    border: "1px solid var(--gray-500, #6B7280)",
    background: "var(--gray-50, #F9FAFB)",
    height: "48px",
  };

  const btnStyles2 = {
    borderRadius: "4px",
    border: "none",
    background: "#EF4444",
    height: "48px",
    width: "100%",
    color: "#fff",
  };

  //   const onConfirmClick = () => {
  //     if (
  //       cancelParam !== null ||
  //       cancelParam !== undefined ||
  //       cancelParam !== ""
  //     ) {
  //       if (cancelParam === "all") {
  //         cancel.mutate(
  //           {
  //             all_products: "all",
  //           },
  //           {
  //             onSuccess: () => {
  //               Toaster({
  //                 status: "success",
  //                 message: "Prescriptions cancelled successfully.",
  //               });
  //             },
  //           }
  //         );
  //       } else {
  //         cancel.mutate(
  //           {
  //             product_id: Number(cancelParam),
  //           },
  //           {
  //             onSuccess: () => {
  //               Toaster({
  //                 status: "success",
  //                 message: "Prescription cancelled successfully.",
  //               });
  //             },
  //           }
  //         );
  //       }
  //     }
  //   };
  const onConfirmClick = () => {
    cancel.mutate(
      {
        prescription_status: "canceled",
      },
      {
        onSuccess: () => {
          Toaster({
            status: "success",
            message: "Prescription cancelled successfully.",
          });
        },
      }
    );
  };
  return (
    <>
      <span
        style={{
          fontSize: "20px",
          lineHeight: "24px",
          color: "#374151",
          fontWeight: 600,
          marginBottom: ".5rem",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        Are you sure you want to cancel this
        <br />
        prescription?
      </span>
      <div className="d-flex justify-content-end">
        <button
          className="btn  me-2 w-full"
          style={btnStyles}
          data-bs-dismiss="modal"
          onClick={() => {
            localStorage.removeItem("canceled");
            if (resetP_oid) resetP_oid();
          }}
        >
          Cancel
        </button>
        <button
          onClick={onConfirmClick}
          className="btn w-full "
          style={btnStyles2}
          data-bs-dismiss="modal"
        >
          Yes
        </button>
      </div>
    </>
  );
}
