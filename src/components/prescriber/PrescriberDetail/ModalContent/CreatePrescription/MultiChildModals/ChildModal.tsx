import { X } from "@assets/index";
import React from "react";
import PharmacyModal from "./ExtraModal";
import ExtraModal from "./ExtraModal";
type IModal = {
  title: string;
  children: React.ReactNode;
  extraStyle?: {};
  modalSize?: string;
  hideCross?: boolean;
  setHideCross?: (hide: boolean) => void;
  modalId?: string;
};
export default function ChildModal({
  title,
  children,
  modalSize,
  hideCross,
  setHideCross,
  extraStyle,
}: IModal) {
  return (
    <>
      <ExtraModal />
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-scrollbar" style={extraStyle}>
            <img
              src={X}
              alt="Group-1"
              className="modal-icon"
              data-bs-dismiss="modal"
              // onClick={refreshModal}
            />
            <div className="modal-title text-center">{title}</div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
