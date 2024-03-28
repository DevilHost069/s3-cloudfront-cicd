import { X } from "@assets/index";
import { useProfiles } from "@server/auth/ProfileDetails";
import { useGetPharmacy } from "@server/pharmacy/useGetAllPharmacy";
import { usePostSentPrescriptionToPharmacy } from "@server/prescriber/useSentPrescriptionToPharmacy";
import { useQueryClient } from "@tanstack/react-query";
import React, { use, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { useColors } from "@utils/tenant_configuration";


export default function PharmacyContent() {
  const [params, setParams] = useSearchParams();
  const [pharmacyOID, setPharmacyOID] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const ctx = useProfiles() as any;
  const { data: profile } = ctx;
  const queryClient = useQueryClient();
  const allPharmacy = useGetPharmacy() as any;
  const { data, isLoading } = allPharmacy;

  const p_id = params.get("prescription_oid");

  useEffect(() => {
    if (pharmacyOID === "") {
      setDisable(true);
    }
    return () => {
      setDisable(false);
    };
  }, [pharmacyOID]);

  const sendPrescriptions = usePostSentPrescriptionToPharmacy() as any;
  const sendToPharmacy = () => {
    sendPrescriptions.mutate(
      {
        body: {
          pharmacy_profile_oid: pharmacyOID,
        },
        oid: p_id,
      },
      // {
      //     onSuccess: () => {
      //         alert("Prescription Sent Successfully")
      //         queryClient.resetQueries();
      //     },
      //     onError: (error) => {
      //         alert(error?.response?.data?.message)
      //     }
      // }
    );
    localStorage.removeItem("prescription_id");
    queryClient.resetQueries();
  };
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <div className="modal-content custom-scrollbar" style={{}}>
        <img
          src={X}
          alt="Group-1"
          className="modal-icon"
          data-bs-dismiss="modal"
          // onClick={refreshModal}
        />
        <div className="modal-title text-center">{"Pharmacy"}</div>
        <div className="modal-body">
          <div className="row w-full">
            <div className="col-md-12">
              {/* select field */}
              <div className="mb-3 w-full">
                <label
                  className="form-label"
                  style={{
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#4B5563",
                  }}
                >
                  Select Your Pharmacy
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{
                    border: "solid 1px #D1D5DB",
                    borderColor: "none",
                    boxShadow: "none",
                    height: "48px",
                    backgroundColor: "#fff",
                  }}
                  onChange={(e) => setPharmacyOID(e.target.value)}
                >
                  <option value="">Select Pharmacy</option>
                  {data?.length > 0 &&
                    data?.map((item: any) => (
                      <option key={item.oid} value={item.oid}>
                        {item.pharmacy_name}
                      </option>
                    ))}
                </select>
              </div>
              <button
                onClick={() => sendToPharmacy()}
                style={{
                  height: "48px",
                  backgroundColor: disable
                    ? `${primaryLightColor}`
                    : `${primaryColor}`,
                  outline: "none",
                  border: "none",
                  fontWeight: "600",
                }}
                disabled={disable}
                className="btn btn-primary w-full"
                data-bs-dismiss="modal"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
