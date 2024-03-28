/* eslint-disable @typescript-eslint/no-explicit-any */
// getFieldProps={getFieldProps} touched={touched} error={error}

type FirstScreenFormProps = {
  getFieldProps: any;
  touched: any;
  errors: any;
};
export default function FirstScreenForm(formik: FirstScreenFormProps) {
  return (
    <>
      <div className="input-text">
        <div className="input-div">
          <span>First Name</span>
          <input
            type="text"
            required
            id="user_name"
            onFocus={(event) => {
              const { target } = event;
              setTimeout(() => target.select(), 0);
            }}
            placeholder="i.e. John"
            {...formik.getFieldProps("firstName")}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="error">{formik.errors.firstName}</p>
          )}
        </div>
        <div className="input-div">
          <span>Last Name</span>
          <input
            onFocus={(event) => {
              const { target } = event;
              setTimeout(() => target.select(), 0);
            }}
            type="text"
            required
            placeholder="i.e. Doe"
            {...formik.getFieldProps("lastName")}
          />
        </div>
      </div>
      <div className="input-text">
        <div className="input-div">
          <span>Phone number</span>
          <input type="text" required placeholder="i.e. +1 123456789" />
        </div>
        <div className="input-div">
          <span>Medicare Number</span>
          <input type="text" required placeholder="i.e. 123456789" />
        </div>
      </div>
      <div className="input-text">
        <div className="input-div">
          <input type="date" required />
        </div>
        <div className="input-div">
          <select>
            <option>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="input-text">
        <div className="input-div">
          <span>Address</span>
          <input type="text" required placeholder="i.e. 123 Main St" />
        </div>
      </div>
    </>
  );
}
