import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../../axiosInstance";
import * as bootstrap from "bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "@components/shared/Loader";
import { Toaster } from "@components/shared/Toaster";
import { pdfjs } from "react-pdf";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { setIn } from "formik";
import { useSearchParams } from "react-router-dom";
import { useColors } from "@utils/tenant_configuration";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type IProps = {
  setModalContent: (content: string) => void;
  oid?: string;
  refresh?: boolean;
  onClose?: any;
};
const PrescriptionDetail = ({
  setModalContent,
  oid,
  refresh,
  onClose,
}: IProps) => {
  const isSendScript =
    localStorage.getItem("send_script") === "yes" ? true : false;
  const [params, setParams] = useSearchParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(screen.width > 576 ? 1.0 : 0.425);
  const [numPages, setNumPages] = useState(null);
  const [oldOid, setOldOid] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  console.log(screen.width);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    setLoading(true);
    const id = oid || params.get("prescription_oid");
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
            setPdfUrl(data.data.file_url);
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

    // if pdfUrl is not set then fetch pdf from server until data.data.file_url is not null with certain interval
    if (id && id !== "undefined" && oldOid !== id) {
      const interval = setInterval(() => {
        setOldOid(id);
        fetchPdf();
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [oid, pdfUrl]);

  const queryClient = useQueryClient();
  const refreshModal = () => {
    if (onClose) onClose();
    if (refresh) queryClient.resetQueries();
  };
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <div className="main_layout">
        {loading ? (
          <h5 className="text-center w-full animate_bounce">
            {" "}
            Please wait initializing PDF...
          </h5>
        ) : (
          <>
            <div className="w-full">
              {pdfUrl && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={pdfUrl}
                    plugins={[defaultLayoutPluginInstance]}
                    defaultScale={scale}
                  />
                </Worker>
              )}
            </div>
          </>
        )}
      </div>
      <div>
        {isSendScript ? (
          <>
            <button
              disabled={loading}
              type="button"
              style={{
                padding: "12px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "4px",
                outline: "none",
                border: "none",
                backgroundColor: loading
                  ? `${primaryLightColor}`
                  : `${primaryColor}`,
              }}
              className="btn btn-primary w-full"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              Send to pharmacy
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                padding: "12px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "4px",
                backgroundColor: `${primaryColor}`,
                color: "#fff",
                outline: "none",
                border: "none",
              }}
              className="btn w-full"
              data-bs-dismiss="modal"
              onClick={refreshModal}
            >
              Close
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default PrescriptionDetail;

const MiniLoader = () => {
  return (
    <div
      className=""
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
};
