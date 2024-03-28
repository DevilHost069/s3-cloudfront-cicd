import { Toaster } from "@components/shared/Toaster";
import Button from "@components/widgets/Button";
import { usePostDebit } from "@server/Nurse/Nurse-Consulation/useDebit";
import { PRIMARY_COLOR } from "@utils/color";
import { useSearchParams } from "react-router-dom";
import useRedirectURL from "../../../../../store/redirectUrl";
import React from "react";
import { useColors } from "@utils/tenant_configuration";



export default function CardInformation() {
  const [loading, setLoading] = React.useState(false);
  const getURL = useRedirectURL();
  // const [params, setParams] = useSearchParams();
  // const consulationOid = params.get("consultation_oid");
  // const url = window.location.host;
  // const successURL = `http://${url}/dashboard`;

  // const debit = usePostDebit();

  // const onSkippedClicked = () => { }

  // const onProceedClicked = () => {
  //   debit.mutate(
  //     {
  //       success_url: successURL,
  //       consulation_id: consulationOid
  //     },
  //     {
  //       onSuccess: (data: any) => {
  //         window.location.href = data.redirectUrl;
  //       },
  //       onError: (error: any) => {
  //         Toaster({
  //           status: "error",
  //           message: "Error in payment. Please try again."
  //         })
  //       }
  //     }

  //   );

  // }

  if (loading) {
    return (
      <div className="text-center">
        <span className="text-center">Redirecting to payment gateway...</span>
      </div>
    );
  }

  const onOpenLink = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = getURL.getUrl();
    }, 1000);
  };
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <form>
        <div className="d-flex justify-content-end">
          {/* <Button
            id=""
            button="Skip"
            // disabled={validate}
            dataBsDismiss={"modal"}
            type="button"
            className="me-2 "
            style={{
              height: "48px",
              width: "100%",
              color: "#111827",
              borderRadius: "4px",
              border: "1px solid var(--gray-500, #6B7280)",
              marginTop: "40px",
              backgroundColor: "#F9FAFB",
            }}
            onClick={onSkippedClicked}
          /> */}
          <Button
            id=""
            button="Proceed"
            type="button"
            className=""
            style={{
              height: "48px",
              width: "100%",
              color: "#fff",
              borderRadius: "4px",
              border: "none",
              marginTop: "40px",
              backgroundColor: `${primaryColor}`,
              // backgroundColor: validate ? `${PRIMARY_LIGHT_COLOR}` : `${PRIMARY_COLOR}`,
            }}
            onClick={onOpenLink}
          />
        </div>
      </form>
    </>
  );
}
