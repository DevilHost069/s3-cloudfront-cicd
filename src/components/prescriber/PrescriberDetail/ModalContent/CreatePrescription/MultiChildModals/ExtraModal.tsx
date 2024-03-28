import React from "react";
import PharmacyContent from "../../pharmacy";

export default function ExtraModal() {
  return (
    <div
      className="modal fade"
      id="exampleModalToggle"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <PharmacyContent />
      </div>
    </div>
  );
}
