import { Search, X } from "@assets/index";
import Selector from "@components/widgets/Selector";
import { useGetProducts } from "@server/prescriber/useGetProducts";
import { IProducts } from "@shared/types/product";
import { Field, FieldArray, getIn } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { PRIMARY_COLOR } from "@utils/color";
import { useColors } from "@utils/tenant_configuration";


type IProps = {
  inititalValues: any;
  setFieldValue?: any;
  handleSubmit?: any;
  values?: any;
  setDisabled?: any;
  setTitle?: (title: string) => void;
  setModalContent?: (content: string) => void;
  errors?: any;
  isValid?: boolean;
  isSubmitting?: boolean;
};

export type IProduct = {
  data: IProducts[];
  isError: boolean;
  isLoading: boolean;
};

const ErrorMessage = ({ name }: { name: string }) => {
  return (
    <>
      <p className="small mb-0 pb-lg-2 text-danger text-start">
        <Field
          name={name}
          render={({ form }: any) => {
            const error = getIn(form.errors, name);
            const touch = getIn(form.touched, name);
            return touch && error ? error : null;
          }}
        />
      </p>
    </>
  );
};

export default function ProductArrayField({
  inititalValues,
  setFieldValue,
  handleSubmit,
  setTitle,
  setModalContent,
  errors,
  isSubmitting,
  isValid,
}: IProps) {
  const { primaryColor, primaryLightColor } = useColors();

  const products = useGetProducts() as IProduct;
  const { data, isLoading } = products as any;

  const chekRadio = () => {
    let isFilled = true;
    if (inititalValues.send_script === "") {
      isFilled = false;
    }
    return isFilled;
  };
  const checkprescribeditemsarefilled = () => {
    let isFilled = true;
    inititalValues.prescribed_items.forEach((item) => {
      if (
        item.product_name === "" ||
        item.dosage_value === "" ||
        item.product_pricing === 0 ||
        item.patient_instruction === "" ||
        item.quantity === 0 ||
        item.unit === "" ||
        // item.quantity_extended === ""
        // ||
        item.repeat < 0 ||
        item.repeat > 6
      ) {
        isFilled = false;
      }
    });
    return isFilled;
  };
  const isFilled = checkprescribeditemsarefilled();

  const checkErroronRepeats = (index, value) => {
    let isFilled = true;
    if (value < 0 || value > 6) {
      isFilled = false;
    }
    return isFilled;
  };

  const onFocused = (e: any) => {
    const { target } = e;
    setTimeout(() => target.select(), 0);
  };

  const handleDosageChange = (e, index) => {
    const value = e.target.value;
    // must be a number
    if (isNaN(value)) {
      return;
    }
    setFieldValue(`prescribed_items[${index}].dosage_value`, value);
  };

  const handleUnitChange = (e, index) => {
    const value = e.target.value;
    setFieldValue(`prescribed_items[${index}].unit`, value);
  };

  const queryClient = useQueryClient();
  const refreshModal = () => {
    queryClient.resetQueries();
  };

  return (
    <>
      <FieldArray name="prescribed_items">
        {(arrayHelpers) => (
          <div
            style={{
              width: "100%",
            }}
          >
            {inititalValues.prescribed_items.map((item, index) => (
              <div
                key={index}
                className="layout card mb-4 "
                style={{ borderWidth: "2px" }}
              >
                {inititalValues.prescribed_items.length > 1 && (
                  <div className="mb-1">
                    <button
                      className="btn  btn-sm"
                      onClick={() => arrayHelpers.remove(index)}
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "0",
                        zIndex: 1,
                        marginTop: "5px",
                        marginRight: "5px",
                        outline: "none",
                        border: "none",
                      }}
                    >
                      <img src={X} alt="" className="" />
                    </button>
                  </div>
                )}
                <input
                  type="hidden"
                  name={`prescribed_items[${index}].product_id`}
                  value={item.product_id}
                />
                <div className="wrapper_bar">
                  <label htmlFor="search_label" className="search_label">
                    Product Details <strong className="asteriek">*</strong>
                  </label>
                  <span className="w-full d-flex search-box">
                    <img src={Search} alt="" className="search_img" />
                    <Selector
                      data={data}
                      isLoading={isLoading}
                      onChange={(e) => {
                        setFieldValue(
                          `prescribed_items[${index}].product_name`,
                          e?.label
                        );
                        setFieldValue(
                          `prescribed_items[${index}].product_pricing`,
                          Number(e?.value)
                        );
                        setFieldValue(
                          `prescribed_items[${index}].product_id`,
                          e?.id
                        );
                      }}
                    />
                  </span>
                  <ErrorMessage
                    name={`prescribed_items[${index}].product_name`}
                  />
                </div>
                <div className="wrapper_bar">
                  <label htmlFor="search_label" className="search_label">
                    Repeats{" "}
                  </label>
                  <span className="w-full d-flex search-box">
                    <Field
                      autoComplete="off"
                      type="text"
                      className="w-full search_input"
                      value={item.repeat}
                      name={`prescribed_items[${index}].repeat`}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (isNaN(value)) {
                          return;
                        }

                        setFieldValue(
                          `prescribed_items[${index}].repeat`,
                          Number(value)
                        );
                      }}
                      onFocus={(e) => onFocused(e)}
                    />
                  </span>
                  {checkErroronRepeats(index, item.repeat) ? null : (
                    <>
                      <p className="small mb-0 pb-lg-2 text-danger text-start">
                        Repeats must be between 0 and 6
                      </p>
                    </>
                  )}
                  {/* <ErrorMessage name={`prescribed_items[${index}].repeat`} /> */}
                </div>
                <div className="wrapper_bar">
                  <label htmlFor="search_label" className="search_label">
                    Dosage unit <strong className="asteriek">*</strong>
                  </label>
                  <span className="w-full d-flex search-box">
                    <Field
                      autoComplete="off"
                      type="text"
                      className="w-full search_input"
                      placeholder="Enter the dosage amounts with unit"
                      value={item.dosage_value}
                      name={`prescribed_items[${index}].dosage_value`}
                      onChange={(e) => handleDosageChange(e, index)}
                      onFocus={(e) => onFocused(e)}
                    />

                    <Field
                      as="select"
                      className="opt"
                      style={{
                        border: "none",
                        borderColor: "none",
                        boxShadow: "none",
                        borderLeft: "1px solid",
                        color: primaryColor,
                        backgroundColor: "#fff",
                      }}
                      name={`prescribed_items[${index}].unit`}
                      value={item.unit}
                      onChange={(e) => {
                        handleUnitChange(e, index);
                      }}
                      onFocus={(e) => onFocused(e)}
                    >
                      <option className="opt" value="mg">
                        mg
                      </option>
                      <option className="opt" value="gm">
                        gm
                      </option>
                      <option className="opt" value="ml">
                        ml
                      </option>
                      <option className="opt" value="% weight by volume">
                        %
                      </option>
                      <option className="opt" value="weight by weight">
                        w/w
                      </option>
                    </Field>
                  </span>

                  <ErrorMessage
                    name={
                      `prescribed_items[${index}].dosage_value` ||
                      `prescribed_items[${index}].unit`
                    }
                  />
                </div>
                <div className="wrapper_bar">
                  <label htmlFor="search_label" className="search_label">
                    Quantity <strong className="asteriek">*</strong>
                  </label>
                  <span className="w-full d-flex search-box">
                    <Field
                      autoComplete="off"
                      type="text"
                      className="w-full search_input"
                      prescribed_items
                      value={item.quantity}
                      name={`prescribed_items[${index}].quantity`}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (isNaN(value)) {
                          return;
                        }
                        setFieldValue(
                          `prescribed_items[${index}].quantity`,
                          Number(value)
                        );
                      }}
                      onFocus={(e) => onFocused(e)}
                    />
                  </span>
                  <ErrorMessage name={`prescribed_items[${index}].quantity`} />
                </div>

                {item.quantity > 0 && (
                  <div className="wrapper_bar">
                    <label htmlFor="search_label" className="search_label">
                      Extended Quantity
                    </label>
                    <span className="w-full d-flex search-box">
                      <input
                        autoComplete="off"
                        type="text"
                        value={item.quantity_extended}
                        name={`prescribed_items[${index}].quantity_extended`}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue(
                            `prescribed_items[${index}].quantity_extended`,
                            value
                          );
                        }}
                        className="w-full search_input"
                        onFocus={(e) => onFocused(e)}
                      />
                    </span>
                    {/* <ErrorMessage name={`prescribed_items[${index}].quantity_extended`} /> */}
                  </div>
                )}

                <div className="wrapper_bar">
                  <label htmlFor="search_label" className="search_label">
                    Dosage Instruction <strong className="asteriek">*</strong>
                  </label>
                  <span className="w-full d-flex search-box">
                    <Field
                      autoComplete="off"
                      as="textarea"
                      rows="3"
                      className="w-full search_input"
                      placeholder="Enter the dosage instruction"
                      value={item.patient_instruction}
                      name={`prescribed_items[${index}].patient_instruction`}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue(
                          `prescribed_items[${index}].patient_instruction`,
                          value
                        );
                      }}
                      onFocus={(e) => onFocused(e)}
                      style={{
                        height: "100px",
                      }}
                    />
                  </span>
                  <ErrorMessage
                    name={`prescribed_items[${index}].patient_instruction`}
                  />
                </div>
                <div className="wrapper_bar">
                  <label htmlFor="search_label" className="search_label">
                    Product pricing
                  </label>
                  <span className="w-full d-flex search-box">
                    <input
                      type="text"
                      disabled
                      className="w-full search_input"
                      value={item.product_pricing}
                      name={`prescribed_items[${index}].product_pricing`}
                      onChange={(e) => {
                        const value = e.target.value;
                        // allow only numbers, decimal, and one dot , positive val only
                        if (/^[0-9]*\.?[0-9]*$/.test(value)) {
                          setFieldValue(
                            `prescribed_items[${index}].product_pricing`,
                            Number(value)
                          );
                        }
                      }}
                      onFocus={(e) => onFocused(e)}
                    />
                  </span>
                </div>
              </div>
            ))}

            <div
              className="w-full"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                type="button"
                className="btn bg-white"
                style={{
                  // position center
                  textAlign: "center",
                  color: "var(--bs-primary-500)",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                onClick={() =>
                  arrayHelpers.push({
                    product_id: 0,
                    product_name: "",
                    repeat: 0,
                    dosage_value: "",
                    unit: "mg",
                    dosage: "",
                    patient_instruction: "",
                    quantity: 0,
                    quantity_extended: "",
                    product_pricing: 0,
                    cancelled: false,
                  })
                }
              >
                Add More
              </button>
            </div>
            <div className=" p-4" />
            <div className="wrapper_bar">
              <label htmlFor="search_label" className="search_label">
                Do you want send the script to recommended pharmacy?{" "}
                <strong className="asteriek">*</strong>
              </label>
              <span className="w-full d-flex ">
                <div
                  role="group"
                  aria-labelledby="my-radio-group"
                  className="radio_prescription"
                >
                  <label className="radio_label me-3">
                    <Field
                      type="radio"
                      name={`send_script`}
                      value={"yes"}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue(`send_script`, value);
                        localStorage.setItem("send_script", "yes");
                      }}
                      checked={
                        inititalValues.send_script === "yes" ? true : false
                      }
                      className="me-1"
                      style={{
                        height: "15px",
                        width: "15px",
                        accentColor: "var(--bs-primary-500)",
                      }}
                    />
                    Yes
                  </label>
                  <label className="radio_label">
                    <Field
                      type="radio"
                      name={`send_script`}
                      value={"no"}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue(`send_script`, value);
                        localStorage.setItem("send_script", "no");
                      }}
                      checked={
                        inititalValues.send_script === "no" ? true : false
                      }
                      className="me-1"
                      style={{
                        height: "15px",
                        width: "15px",
                        accentColor: "var(--bs-primary-500)",
                      }}
                    />
                    No
                  </label>
                </div>
              </span>
              <ErrorMessage name={`send_script`} />
            </div>
            <div className=" p-4" />
            <div>
              <button
                className="btn"
                type="submit"
                disabled={!isValid || isSubmitting}
                style={{
                  width: "100%",
                  height: "48px",
                  backgroundColor: isValid
                    ? "var(--bs-primary-500)"
                    : "var(--bs-primary-400)",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                // data-bs-dismiss="modal"
                // data-bs-toggle="modal"
                // data-bs-target="#exampleModalToggle2"
              >
                Prescribe
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </>
  );
}
