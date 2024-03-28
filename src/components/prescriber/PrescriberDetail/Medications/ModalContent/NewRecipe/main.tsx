import { useProductOptions } from "@contexts/ProductOptionsContext";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import RecipeField from "./RecipeField";
import { INGREDIENTS_ADD_FIELDS, RECIPE_FIELDS } from "@utils/constants";
import * as Yup from "yup";
import { IIngredientsRes } from "@shared/types/product";
import { usePostIngredient } from "@server/prescriber/usePostIngredient";
import { usePostProduct } from "@server/prescriber/usePostProduct";
import moment from "moment";
const productSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  product_form: Yup.string().required("Form is required"),
  strength: Yup.string().required("Strength is required"),
  quantity: Yup.string().required("Quantity is required"),
  units: Yup.string().required("Units is required"),
  route_adminstration: Yup.string().required("Route is required"),
  restriction: Yup.string().required("Restriction is required"),
  expiry_date: Yup.date()
    .required("Expiry date is required")
    .min(moment().format("YYYY-MM-DD"), "Date cannot be in the past"),
});
const NewRecipe = () => {
  const { ingredients: savedIngredients } = useProductOptions();
  const [ingredients, setIngredients] = useState<IIngredientsRes[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const cancelBtnRef = useRef(null);
  const initialValues = {
    name: "",
    product_form: "",
    strength: "",
    quantity: "",
    units: "",
    repeats: 0,
    route_adminstration: "",
    restriction: "",
    share: "",
    batch: "",
    expiry_date: moment().add(12, "months").format("YYYY-MM-DD"),
    comments: "",
    base_rate: 0.0,
    ingredients: [],
  };
  const submitIngredient = usePostIngredient();
  const submitProduct = usePostProduct();
  const formik = useFormik({
    initialValues,
    validationSchema: productSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      const body = {
        ...values,
        ingredients: ingredients.map((i) => i.id),
      };
      await submitProduct.mutateAsync(body, {
        onSuccess: () => {
          cancelBtnRef.current?.click();
          formik.resetForm({ values: initialValues });
          ingFormik.resetForm();
          setIngredients([]);
          setSubmitting(false);
        },
        onError: (error) => {
          setSubmitting(false);
        },
      });
    },
  });
  const ingFormik = useFormik({
    initialValues: {
      name: "",
      strength: "",
      unit: "",
    },
    onSubmit: async (values) => {
      const newIngredient = await submitIngredient.mutateAsync(values);
      setIngredients((ingredients) => {
        return [
          ...ingredients,
          {
            ...newIngredient,
          },
        ];
      });
      ingFormik.resetForm();
    },
  });
  const handleIngredientAdd = () => {
    const added = savedIngredients.find(
      (i) =>
        i.id === parseInt(ingFormik.values.name) &&
        i.strength === ingFormik.values.strength &&
        i.unit === ingFormik.values.unit
    );
    if (added) {
      {
        setIngredients((ingredients) => {
          return [
            ...ingredients,
            {
              ...added,
            },
          ];
        });
        ingFormik.resetForm();
      }
    } else {
      const diffStrengthUnitAdded = savedIngredients.find(
        (i) => i.id === parseInt(ingFormik.values.name)
      );
      if (diffStrengthUnitAdded) {
        ingFormik.setFieldValue("name", diffStrengthUnitAdded.name);
        ingFormik.submitForm();
      } else ingFormik.submitForm();
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-md-5">
          <div className="row">
            {RECIPE_FIELDS.map((field, index) => (
              <RecipeField field={field} key={index} formik={formik} />
            ))}
          </div>
        </div>
        <div className="col-md-7">
          <div className="row align-items-end">
            {INGREDIENTS_ADD_FIELDS.map((field, index) => (
              <RecipeField field={field} key={index} formik={ingFormik} />
            ))}
            <div className="col-md-1">
              <button
                className="btn btn-primary mb-3"
                type="button"
                onClick={handleIngredientAdd}
                disabled={!ingFormik.values["name"]}
              >
                Add
              </button>
            </div>
          </div>
          <div className="col-12">
            <table className="table table-striped table-bordered border-slate-400 rounded-2 overflow-hidden">
              <thead>
                <tr>
                  <th className="bg-primary-900 text-white th-font">
                    Ingredient
                  </th>
                  <th className="bg-primary-900 text-white th-font">
                    Strength
                  </th>
                  <th className="bg-primary-900 text-white th-font">Unit</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.length > 0 ? (
                  ingredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td>{ingredient.name}</td>
                      <td>{ingredient.strength}</td>
                      <td>{ingredient.unit}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 pt-3 d-flex justify-content-end">
          <button
            className="btn btn-outline-primary me-3 px-4"
            data-bs-toggle="modal"
            data-bs-target="#newRx"
            data-dismiss="modal"
            type="button"
            ref={cancelBtnRef}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary px-4"
            type="submit"
            disabled={submitting}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewRecipe;
