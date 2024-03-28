import React from "react";
import { Link } from "react-router-dom";

export default function SessionExpired() {
  const onLinkClick = () => {
    localStorage.clear();
  };
  return (
    <>
      <div className="loading bg-primary-500">
        <div className="row">
          <div className="col-md-12">
            <div className="card text-center p-5">
              <div
                className="card-header bg-white"
                style={{
                  border: "none",
                }}
              >
                <h3>Session has expired</h3>
              </div>
              <small className="">Please login again to continue.</small>
              <div className="card-body">
                <Link className="w-full pt-5" onClick={onLinkClick} to="/login">
                  <span className="btn btn-primary w-full">Login</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
