import React, { useMemo } from "react";
import ErrorText from "@components/widgets/Error";
import TextInput from "@components/widgets/TextInput";
import Select from "react-select";
import CreateableSelect from "react-select/creatable";
import { useProductOptions } from "@contexts/ProductOptionsContext";
import { IStaticField } from "@shared/types/product";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { Field } from "formik";
import { useColors } from "@utils/tenant_configuration";


type IStaticFieldComponent = {
  field: IStaticField;
  formik: any;
};
export const getFieldContent = (
  field: IStaticField,
  formik,
  fieldOptions,
  selectedData = {}
) => {
  function minDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  }
  const { primaryColor, primaryLightColor } = useColors();

  switch (field.type) {
    case "text":
    case "number":
      return (
        <div className="inputs mb-3">
          <div className="input">
            <div className="label_name">
              {field.label}{" "}
              {field.required ? <strong className="asteriek">*</strong> : ""}
            </div>
            <div className="d-flex align-items-center w-full">
              <div
                className={`input-sm w-full ${formik.touched[field.key] && formik.errors[field.key]
                  ? "123 input_wrapper-outline-error"
                  : "input_wrapper"
                  }`}
              >
                <TextInput
                  placeholder={field.placeholder}
                  type={field.type}
                  className="input_wrapper-outline"
                  formik={formik.getFieldProps(field.key)}
                  value={
                    field.type === "number"
                      ? formik.values[field.key] || 0
                      : formik.values[field.key]
                  }
                  id={field.key as string}
                  onChange={(e) => {
                    if (field.type == "number") {
                      if (parseInt(e.target.value) > -1)
                        if (field.maxValue) {
                          if (parseInt(e.target.value) > field.maxValue) {
                            formik.setFieldValue(field.key, field.maxValue);
                          } else
                            formik.setFieldValue(field.key, e.target.value);
                        } else formik.setFieldValue(field.key, e.target.value);
                      else formik.setFieldValue(field.key, 0);
                    } else if (field.textNumberValidation) {
                      if (e.target.value.startsWith("-")) {
                        formik.setFieldValue(
                          field.key,
                          e.target.value.replace("-", "")
                        );
                      } else {
                        formik.setFieldValue(field.key, e.target.value);
                      }
                    } else formik.setFieldValue(field.key, e.target.value);
                  }}

                />
              </div>
              {field.defaultValue && selectedData && !field.hideDefault ? (
                <span className=" ms-2 w-50">
                  {/* default={selectedData[field.defaultValue]} */}
                </span>
              ) : (
                ""
              )}
            </div>
            {formik.touched[field.key] && formik.errors[field.key] ? (
              <ErrorText message={formik.errors[field.key]} />
            ) : (
              ""
            )}
          </div>
        </div>
      );
    case "date":
      return (
        <div className="input dir mb-3">
          <div className="label_name">
            {field.label}{" "}
            {field.required ? <strong className="asteriek">*</strong> : ""}
          </div>
          <div
            className={`input-sm ${formik.touched[field.key] && formik.errors[field.key]
              ? "123 input_wrapper-outline-error"
              : "input_wrapper"
              }`}
          >
            <input
              className="input_wrapper-outline"
              placeholder="Select Date"
              type="text"
              onFocus={(e) => (e.currentTarget.type = "date")}
              min={minDate()}
              id="date"
              style={{
                width: "100%",
                cursor: "text",
              }}
              {...formik.getFieldProps(field.key)}
              value={formik.values[field.key]}
              onChange={(e) => {
                // check if date is in future then set it to default
                // const date = new Date(e.target.value);
                // const currentDate = new Date();
                // if (date < currentDate) {
                //   formik.setFieldError(
                //     field.key,
                //     "Please select a future date"
                //   )
                //   return;
                // } else {
                //   formik.setFieldValue(field.key, e.target.value);
                // }

                // formik.setFieldValue(field.key, e.target.value);
                formik.setFieldValue(field.key, e.target.value);
              }}
            />
          </div>
          {formik.touched[field.key] && formik.errors[field.key] ? (
            <ErrorText message={formik.errors[field.key] as string} />
          ) : (
            ""
          )}
        </div>
      );
    case "select":
      return (
        <div className="input mb-3 bg-red">
          <div className="label_name">
            {field.label}{" "}
            {field.required ? <strong className="asteriek">*</strong> : ""}
          </div>
          <Select
            className="basic-single w-full"
            classNamePrefix="select"
            isClearable={true}
            value={
              fieldOptions?.find((i) => i.value === formik.values[field.key]) ||
              ""
            }
            //   isRtl={isRtl}
            isSearchable={true}
            name="color"
            options={fieldOptions}
            placeholder={field.placeholder}
            onChange={(e: any) => {
              formik.setFieldValue(field.key, e?.value);
            }}
            styles={{
              control: (base, state) => ({
                ...base,
                height: "42px",
                borderColor:
                  formik.touched[field.key] && formik.errors[field.key]
                    ? "var(--red-500, #ef4444)"
                    : primaryColor,
                boxShadow: "none",
                backgroundColor: "#fff",
                svg: {
                  fill: primaryColor,
                  height: "15px",
                },

                "&:hover": {
                  borderColor: "none",
                  boxShadow: "none",
                },
              }),
              option: (base, state) => ({
                ...base,
                color: "#000",
                backgroundColor: "#fff",
                width: "100%",
                "&:hover": {
                  backgroundColor: `${primaryColor}`,
                  color: "#fff",
                },
              }),
            }}
          />
          {formik.touched[field.key] && formik.errors[field.key] ? (
            <ErrorText message={formik.errors[field.key] as string} />
          ) : (
            ""
          )}
        </div>
      );
    case "ingredientSelect":
      return (
        <div className="input mb-3">
          <div className="label_name">
            {field.label}{" "}
            {field.required ? <strong className="asteriek">*</strong> : ""}
          </div>
          <CreateableSelect
            className="basic-single w-full"
            classNamePrefix="select"
            isClearable={true}
            //   isRtl={isRtl}
            isSearchable={true}
            name="color"
            options={fieldOptions}
            // value={
            //   fieldOptions.find((i) => i.value === formik.values[field.key]) ||
            //   ""
            // }
            placeholder={field.placeholder}
            onChange={(e: any) => {
              if (!e.__isNew__) {
                formik.setFieldValue("strength", e?.strength);
                formik.setFieldValue("unit", e?.unit);
              }
              formik.setFieldValue(field.key, e?.value);
            }}
            styles={{
              control: (base, state) => ({
                ...base,

                height: "42px",
                borderColor: primaryColor,
                boxShadow: "none",
                backgroundColor: "#fff",
                svg: {
                  fill: primaryColor,
                  height: "15px",
                },

                "&:hover": {
                  borderColor: "none",
                  boxShadow: "none",
                },
              }),
              option: (base, state) => ({
                ...base,
                color: "#000",
                backgroundColor: "#fff",
                width: "100%",
                "&:hover": {
                  backgroundColor: `${primaryColor}`,
                  color: "#fff",
                },
              }),
            }}
          />
        </div>
      );
    case "switch":
      return (
        <>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              name={field.key}
              defaultChecked={field.defaultChecked}
              onChange={formik.handleChange}
              {...formik.getFieldProps(field.key)}
              checked={formik.values[field.key]}
            />
            <label className="form-check-label" htmlFor={field.key as string}>
              {field.label}
            </label>
          </div>
        </>
      );
    case "textarea":
      return (
        <div className="inputs mb-3">
          <div className="input">
            <div className="label_name">
              {field.label}{" "}
              {field.required ? <strong className="asteriek">*</strong> : ""}
            </div>
            <textarea
              placeholder={field.placeholder}
              className="form-control"
              name={field.key as string}
              onChange={formik.handleChange}
              value={formik.values[field.key]}
              rows={5}
            ></textarea>
          </div>
        </div>
      );
    default:
      return <></>;
      break;
  }
};
const RecipeField = ({ field, formik }: IStaticFieldComponent) => {
  const { productOptions, ingredients } = useProductOptions();
  const fieldOptions = useMemo(() => {
    if (!field.datalist) return [];
    if (field.datalist === "ingredients")
      return ingredients?.map((item) => {
        return {
          value: item.id,
          label: item.name,
          strength: item.strength,
          unit: item.unit,
        };
      });
    else
      return productOptions[field.datalist]?.map((item) => {
        return {
          value: item,
          label: item,
        };
      });
  }, [field.datalist, productOptions, ingredients]);
  const fieldContent = useMemo(() => {
    return getFieldContent(field, formik, fieldOptions);
  }, [field, fieldOptions, ingredients, formik]);
  return (
    <>
      <div
        className={`${field.containerClass ? field.containerClass : "col-lg-6"}`}
      >
        {fieldContent}
      </div>
    </>
  );
};

export default RecipeField;
