import "@assets/css/widgets/modals.css";
import { X } from "@assets/index";
import useBackListener from "@hooks/useBackListener";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type IModal = {
  title: string;
  children: React.ReactNode;
  extraStyle?: {};
  modalSize?: string;
  hideCross?: boolean;
  setHideCross?: (hide: boolean) => void;
  modalId?: string;
  fullScreen?: boolean;
  refresh?: boolean;
  extraCloseProps?: any;
  onClose?: any;
};

const BasicModal = ({
  title,
  children,
  extraStyle,
  modalSize,
  hideCross,
  setHideCross,
  modalId = "myModal",
  fullScreen = false,
  refresh = true,
  extraCloseProps,
  onClose,
}: IModal) => {
  const closeRef = useRef(null);
  const modalRef = useRef(null);
  // on click of the cross icon, refetch data from the server using react-query

  const queryClient = useQueryClient();
  const refreshModal = () => {
    if (refresh) {
      localStorage.removeItem("canceled");
    }
    if (onClose) onClose();
  };

  useBackListener(
    document.querySelector(".modal-backdrop")?.classList.contains("show"),
    () => {
      closeRef.current?.click();
      document.querySelector(".modal-backdrop")?.remove();
      document.querySelector(".modal.show")?.removeAttribute("style");
      document.querySelector(".modal.show")?.removeAttribute("aria-modal");
      document
        .querySelector(".modal.show")
        ?.setAttribute("aria-hidden", "true");
      document.querySelector(".modal.show")?.removeAttribute("style");
      document.querySelector(".modal.show")?.classList.remove("show");
    },
  );
  // useEffect(() => {
  //   if (
  //     fullScreen &&
  //     document.querySelector(".modal-backdrop")?.classList.contains("show")
  //   ) {
  //     window.onbeforeunload = function () {
  //       return "Are you sure? Changes made might not have been saved";
  //     };
  //   }
  // }, [fullScreen]);

  return (
    <>
      <div
        // className="modal modal-md fade"
        className={`modal ${modalSize ? modalSize : ""}`}
        tabIndex={-1}
        id={modalId}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
        ref={modalRef}
      >
        <div
          className={`modal-dialog modal-dialog-centered ${fullScreen ? "modal-fullscreen" : ""}`}
        >
          <div
            className={`modal-content custom-scrollbar ${fullScreen ? "gap-2" : ""}`}
            style={extraStyle}
          >
            {hideCross ? null : (
              <img
                src={X}
                ref={closeRef}
                alt="Group-1"
                className="modal-icon"
                data-bs-dismiss="modal"
                onClick={refreshModal}
                {...extraCloseProps}
              />
            )}
            <div
              className={`modal-title text-${fullScreen ? "left" : "center"}`}
            >
              {title}
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicModal;
