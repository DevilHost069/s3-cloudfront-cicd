import { useGetIngredients } from "@server/prescriber/useGetIngredients";
import { useGetProductOptions } from "@server/prescriber/useGetProductOptions";
import { IIngredientsRes, IProductOptionsRes } from "@shared/types/product";
import React, { useContext } from "react";
export type IProductOptionsContext = {
  productOptions: IProductOptionsRes;
  ingredients: IIngredientsRes[];
};
const ProductOptionsContext = React.createContext<IProductOptionsContext>({
  productOptions: {
    dosage_options: [],
    frequency_options: [],
    food_options: [],
    instructions_options: [],
    product_form_options: [],
    product_route_options: [],
    product_share_options: [],
    product_restriction_options: [],
    purpose_options: [],
    print_script_options: [],
  },
  ingredients: [],
});

export function useProductOptions() {
  return useContext(ProductOptionsContext);
}

function ProductOptionsProvider({ children }: any) {
  const { data, isLoading } = useGetProductOptions();
  const { data: ingredients } = useGetIngredients();
  const productOptions: IProductOptionsRes = {
    ...data,
    purpose_options: [
      "Medication Prescribed",
      "Medication Started in Hospital",
      "Medication started by specialist",
      "Medication started by patient",
      "Medication started elsewhere",
      "For dental treatment only",
      "For midwifery use only",
      "For optometry use only",
      "For podiatric treatment only",
      "For treatment of foot conditions only",
      "For ocular treatment only",
    ],
    print_script_options: ["Print Script", "Script Label"],
  };
  const value = {
    productOptions,
    ingredients: ingredients as IIngredientsRes[],
  };
  return (
    <ProductOptionsContext.Provider value={value}>
      {children}
    </ProductOptionsContext.Provider>
  );
}

export default ProductOptionsProvider;
