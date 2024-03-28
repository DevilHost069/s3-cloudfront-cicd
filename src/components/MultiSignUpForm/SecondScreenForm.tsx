/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

type FirstScreenFormProps = {
  getFieldProps: any;
  touched: any;
  errors: any;
  agree: boolean;
  setAgree: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SecondScreenForm(formik: FirstScreenFormProps) {
  return (
    <>
      {/* Email Field */}
      <div className="d-flex flex-row align-items-center mb-4">
        <div className="form-outline flex-fill mb-0">
          <label className="form-label" htmlFor="email">
            Email *
          </label>
          <input
            type="email"
            id="email"
            onFocus={(event) => {
              const { target } = event;
              setTimeout(() => target.select(), 0);
            }}
            {...formik.getFieldProps("email")}
            className="form-control"
          />
          {formik.touched.email && formik.errors.email && (
            <small className="text-danger">{formik.errors.email}</small>
          )}
        </div>
      </div>
      {/* End Email Field */}
      {/* Password Field */}
      <div className="d-flex flex-row align-items-center mb-4">
        <div className="form-outline flex-fill mb-0">
          <label className="form-label" htmlFor="password">
            Password *
          </label>
          <input
            type="password"
            id="password"
            onFocus={(event) => {
              const { target } = event;
              setTimeout(() => target.select(), 0);
            }}
            {...formik.getFieldProps("password")}
            className="form-control"
          />
          {formik.touched.password && formik.errors.password && (
            <small className="text-danger">{formik.errors.password}</small>
          )}
        </div>
      </div>
      {/* End Password Field */}
      {/* Confirm Password Field */}
      <div className="d-flex flex-row align-items-center mb-4">
        <div className="form-outline flex-fill mb-0">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            onFocus={(event) => {
              const { target } = event;
              setTimeout(() => target.select(), 0);
            }}
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <small className="text-danger">
              {formik.errors.confirmPassword}
            </small>
          )}
        </div>
      </div>
      {/* End Confirm Password Field */}
      {/* Checkbox */}
      <div className="form-check d-flex justify-content-center mb-5">
        <input
          className="form-check-input me-2"
          type="checkbox"
          value=""
          id="form2Example3c"
          onClick={() => formik.setAgree(!formik.agree)}
        />
        <label className="form-check-label" htmlFor="form2Example3">
          I agree all statements in <a href="#!">Terms of service</a>
        </label>
      </div>
      {/* End Checkbox */}
    </>
  );
}
