import { useProductOptions } from "@contexts/ProductOptionsContext";
import { PRODUCT_SELECTED_FIELDS } from "@utils/constants";
import SelectedProductDetailField from "./SelectedProductDetailField";
import { useEffect, useState } from "react";
import { useGetPharmacy } from "@server/pharmacy/useGetAllPharmacy";
import TextInput from "@components/widgets/TextInput";
import CustomCard from "@components/Card";
import ErrorText from "@components/widgets/Error";

const SelectedProductDetails = ({
  data,
  selectedData,
  setSelectedData,
  isLoading,
  searchquery,
  setSearchquery,
  formik,
  setPharmacyOID,
  sendToPharmacy,
  setSendToPharmacy,
}) => {
  const { productOptions, ingredients } = useProductOptions();
  const { data: pharmacies } = useGetPharmacy() as any;
  const tabs = [
    { value: "once_only", label: "Once Only" },
    { value: "long_term", label: "Long Term" },
  ];

  useEffect(() => {
    const { food, instruction, frequency, dose } = formik.values;
    const appendedInstructions = `${dose} - ${frequency} - ${food} - ${instruction}`;
    formik.setFieldValue("extra_instruction", appendedInstructions);
  }, [formik.values.food, formik.values.instruction, formik.values.frequency, formik.values.dose]);

  const textAreaValue = () => {
    const food = formik.values["food"];
    const instruction = formik.values["instruction"];
    const frequency = formik.values["frequency"];
    const dose = formik.values["dose"];

    // Retrieve the existing value of extra_instruction or use an empty string if it's not set yet
    const existingInstructions = formik.values["extra_instruction"] || '';

    // Append the new values to the existing instructions
    const appendedInstructions = `${existingInstructions} ${dose} ${food} ${instruction} ${frequency}`;

    return appendedInstructions;
  }
  return (
    <>
      <div className="col-12">
        <div
          className="row custom-scrollbar"
          style={{ maxHeight: "60vh", overflowY: "scroll" }}
        >
          <div className="col-md-7">
            <div className="row pb-3">
              <div className="col-sm-6 col-md-4 col-xl-3 mb-2">
                <div className="label_name mb-2">Dose</div>
                <div
                  className={`input-sm ${formik.touched["dose"] && formik.errors["dose"]
                    ? "123 input_wrapper-outline-error"
                    : "input_wrapper"
                    }`}
                >
                  {/* <TextInput
                    type={"text"}
                    placeholder="Enter Dose"
                    className="input_wrapper-outline"
                    formik={formik.getFieldProps("dose")}
                    value={formik.values["dose"]}
                    id={"dose"}
                    onChange={(e) => {
                      if (e.target.value.startsWith("-")) {
                        formik.setFieldValue(
                          "dose",
                          e.target.value.replace("-", "")
                        );
                      } else {
                        formik.setFieldValue("dose", e.target.value);
                      }
                    }}
                  /> */}
                  <textarea
                    style={{
                      outline: "none",
                      border: "none",
                      boxShadow: "none",
                      height: "auto",
                      minHeight: "258px",
                    }}
                    placeholder="Enter Dose"
                    className="input_wrapper-outline w-full"
                    value={formik.values["dose"]}
                    id={"dose"}
                    onChange={(e) => {
                      if (e.target.value.startsWith("-")) {
                        formik.setFieldValue(
                          "dose",
                          e.target.value.replace("-", "")
                        );
                      } else {
                        formik.setFieldValue("dose", e.target.value);
                      }
                    }}
                  />
                </div>
                {/* <select
                  className="form-select custom-scrollbar"
                  size={8}
                  name="dose"
                  value={formik.values["dose"]}
                  onChange={formik.handleChange}
                >
                  {!isLoading && data.length
                    ? productOptions.dosage_options?.map((option, index) => (
                      <option value={option} key={index}>
                        {option}
                      </option>
                    ))
                    : ""}
                </select> */}
              </div>
              <div className="col-sm-6 col-md-4 col-xl-3 mb-2">
                <div className="label_name mb-2">Frequency</div>
                <select
                  className="form-select custom-scrollbar"
                  size={10}
                  name="frequency"
                  value={formik.values["frequency"]}
                  onChange={formik.handleChange}
                >
                  {!isLoading && data.length
                    ? productOptions.frequency_options?.map((option, index) => (
                      <option value={option} key={index}>
                        {option}
                      </option>
                    ))
                    : ""}
                </select>
              </div>
              <div className="col-sm-6 col-md-4 col-xl-3 mb-2">
                <div className="labename mb-2">Food</div>
                <select
                  className="form-select custom-scrollbar"
                  size={10}
                  name="food"
                  value={formik.values["food"]}
                  onChange={formik.handleChange}
                >
                  {!isLoading && data.length
                    ? productOptions.food_options?.map((option, index) => (
                      <option value={option} key={index}>
                        {option}
                      </option>
                    ))
                    : ""}
                </select>
              </div>
              <div className="col-sm-6 col-md-4 col-xl-3 mb-2">
                <div className="label_name mb-2">Instructions</div>
                <select
                  className="form-select custom-scrollbar"
                  size={10}
                  name="instruction"
                  value={formik.values["instruction"]}
                  onChange={formik.handleChange}
                >
                  {!isLoading && data.length
                    ? productOptions.instructions_options?.map(
                      (option, index) => (
                        <option value={option} key={index}>
                          {option}
                        </option>
                      ),
                    )
                    : ""}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 pb-3">
                <CustomCard title={"Recipe"}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    height: "auto",
                    minHeight: "60px",

                  }}>
                    <p>
                      {selectedData?.name}, {selectedData?.restriction}
                    </p>
                    <p>
                      {selectedData?.ingredients?.length ? (
                        <>
                          <p>Ingredients</p>
                          <ul>
                            {selectedData.ingredients.map(
                              (ingredientId, index) => {
                                const ingredient = ingredients.find(
                                  (i) => i.id === ingredientId,
                                );
                                return (
                                  <li key={index}>
                                    {ingredient.name}
                                    {ingredient.strength || ingredient.unit
                                      ? ", "
                                      : ""}
                                    {ingredient.strength
                                      ? `${ingredient.strength}, `
                                      : ""}
                                    {ingredient.unit ? `${ingredient.unit}` : ""}
                                  </li>
                                );
                              },
                            )}
                          </ul>
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                </CustomCard>
              </div>
              <div className="col-md-6 pb-3">
                <CustomCard title={"Dosage guide"}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    height: "auto",
                    minHeight: "40px",
                  }}>
                    <textarea
                      style={{
                        outline: "none",
                        border: "none",
                        boxShadow: "none",
                        height: "auto",
                        minHeight: "40px",

                      }}
                      placeholder="Enter dosage instructions"
                      className="form-control"
                      id="exampleFormControlTextarea1"


                      name="extra_instruction"
                      value={formik.values.extra_instruction}
                      onChange={formik.handleChange}
                    />

                  </div>
                  <ErrorText message={formik.errors['extra_instruction']} />
                </CustomCard>

              </div>
              <div className="col-md-6">
                <>
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      name="sendTopharmacy"
                      value={formik.values["sendTopharmacy"]}
                      onChange={(e) => setSendToPharmacy(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={"sendTopharmacy"}
                    >
                      Send to Pharmacy
                    </label>
                  </div>
                </>
                {sendToPharmacy ? (
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
                      {pharmacies?.length > 0 &&
                        pharmacies?.map((item: any) => (
                          <option key={item.oid} value={item.oid}>
                            {item.pharmacy_name}
                          </option>
                        ))}
                    </select>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="row">
              <div className="col-12 text-center">
                <div
                  className="btn-group mb-3"
                  role="group"
                  aria-label="Basic example"
                >
                  {tabs.map((tab, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`btn btn-sm px-4 btn${formik.values["prescription_duration"] === tab.value ? "" : "outline"}-primary text-capitalize`}
                      onClick={() =>
                        formik.setFieldValue("prescription_duration", tab.value)
                      }
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
              {PRODUCT_SELECTED_FIELDS.map((field, index) => (
                <SelectedProductDetailField
                  field={field}
                  key={index}
                  formik={formik}
                  selectedData={selectedData}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedProductDetails;
