import { ERX } from "@assets/index";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";
import { Toaster } from "@components/shared/Toaster";
import { useGetPrescriptionDetailByOID } from "@server/prescriber/useGetPrescriptionByOID";
import Loader from "@components/shared/Loader";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../..../../../../../../axiosInstance";

type QRAndBArCodeGenerateProps = {
  oid: string;
};

export default function QRAndBArCodeGenerate({
  oid,
}: QRAndBArCodeGenerateProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const id = oid;
    const fetchPdf = async () => {
      if (id) {
        try {
          const { data, status } = await axiosInstance.get(
            `/api/prescription/${id}/`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (status === 200) {
            // const pdfBlob = new Blob([data], { type: "application/pdf" });
            // const pdfUrl = URL.createObjectURL(pdfBlob);
            setData(data.data);
          }
        } catch (error) {
          console.error("Error fetching PDF:", error);
          Toaster({
            status: "error",
            message: "Error fetching PDF: Network Error",
          });
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchPdf();
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
  }, [oid]);

  const copyToClipboard = () => {
    const copyText = (
      document.getElementById("clipboard_copy") as HTMLInputElement
    ).innerHTML;
    if (copyText) {
      navigator.clipboard.writeText(copyText);
      Toaster({
        status: "success",
        message: "Copied to clipboard",
      });
    } else {
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          width: "100%",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <>
      {data?.external_scid ? (
        <>
          {" "}
          <div className="flex justify-center items-center">
            <h5 className="text-2xl font-bold text-center">
              Electronic Prescription for {data?.patient_profile}
            </h5>
            <h3 className="text-xl font-bold text-center">
              {/* Albendzole 400mg Tablet (2x1) - 30 Days */}
              {data?.prescribed_recipe?.name} &nbsp;
              {data?.prescribed_recipe?.strength} &nbsp;
              {data?.prescribed_recipe?.product_form} &nbsp;
            </h3>
            <h6 className="text-xl font-bold text-center">
              {/* convert to 04 feb 2024 */} Prescription Date &nbsp;
              {moment(data?.script_date).format("DD MMM YYYY")}
            </h6>
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="flex justify-center items-center">
                <QRCode
                  size={100}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "300px",
                    width: "100%",
                  }}
                  value={data?.external_scid || ""}
                  viewBox={`0 0 100 100`}
                />
                <p
                  id="clipboard_copy"
                  className=" text-center mt-4"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {data?.external_scid}
                </p>
                {/* center align button */}
                <div className="flex justify-center items-center w-full text-center">
                  <button
                    className="bg-primary-900 text-white py-2 px-4 rounded-lg"
                    style={{
                      fontSize: "16px",
                      fontWeight: "bolder",
                      outline: "none",
                      border: "none",
                    }}
                    onClick={copyToClipboard}
                  >
                    Copy Token
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full mb-4">
              <p className="text-2xl font-bold text-center w-full">
                Delivered by:{" "}
                <img
                  src={ERX}
                  alt=""
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                />
              </p>
              <p className="text-2xl font-bold text-left w-full">
                privacy notice: This prescription is intended for the named
                recipient only and may contain confidential information. If you
                are not the named recipient, you are prohibited from copying,
                distributing, or using it. Please notify the sender and delete
                the original message. Thank you.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <p className="text-center justify-center items-center w-full barcode-container">
                <Barcode
                  value={data?.external_scid || ""}
                  width={2}
                  height={100}
                  fontSize={20}
                  margin={10}
                  background="#f5f5f5"
                  lineColor="#000000"
                  displayValue={false}
                  textAlign="center"
                />
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <h5 className="text-2xl font-bold text-center text-danger">
              Invalid token, could not retrieve prescription details
            </h5>
          </div>
        </>
      )}
    </>
  );
}

// http://scss.localhost:8000/api/preview/?oid=275c4a42-2845-4786-ad55-0485861cadf6
