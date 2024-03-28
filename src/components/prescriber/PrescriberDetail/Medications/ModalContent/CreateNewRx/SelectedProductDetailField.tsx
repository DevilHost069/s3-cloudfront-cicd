import { useProductOptions } from "@contexts/ProductOptionsContext";
import { IProductRes, IProducts, IStaticField } from "@shared/types/product";
import { useMemo } from "react";
import { getFieldContent } from "../NewRecipe/RecipeField";

type ISelectedProductDetailFieldComponent = {
  field: IStaticField;
  formik: any;
  selectedData: IProducts;
};
const SelectedProductDetailField = ({
  field,
  formik,
  selectedData,
}: ISelectedProductDetailFieldComponent) => {
  const { productOptions } = useProductOptions();
  const fieldOptions = useMemo(() => {
    if (!field.datalist) return [];
    else if (field.datalist === "private") {
      return productOptions.product_share_options
        .filter((i) => i === selectedData?.share)
        .map((item) => {
          return {
            value: item,
            label: item,
          };
        });
    }
    return productOptions[field.datalist].map((item) => {
      return {
        value: item,
        label: item,
      };
    });
  }, [field.datalist, productOptions, selectedData]);
  const fieldContent = useMemo(() => {
    return getFieldContent(field, formik, fieldOptions, selectedData);
  }, [field, fieldOptions, selectedData, formik]);
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

export default SelectedProductDetailField;
