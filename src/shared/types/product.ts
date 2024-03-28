import { IResponseMeta } from "./common";

export type IIngredientsRes = {
  id: number;
  name: string;
  strength: string;
  unit: string;
};
export type IProducts = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  product_code: string;
  base_rate: number;
  generic_name: string;
  internal_product_code: string;
  is_extemp_item: boolean;
  is_unlisted_repeat_item: boolean;
  max_pbs_quantity: string;
  pbs_manufacturer_code: string;
  pbscode: string;
  product_form: string;
  route_adminstration: string;
  trade_name: string;
  // new fields
  strength: string;
  quantity: number;
  units: string;
  repeats: number;
  restriction: string;
  share: string;
  batch: string;
  expiry_date: string;
  comments: string;
  ingredients: IIngredientsRes[];
};

export type IProductOptionsRes = {
  dosage_options: string[];
  frequency_options: string[];
  food_options: string[];
  instructions_options: string[];
  product_form_options: string[];
  product_route_options: string[];
  product_share_options: string[];
  product_restriction_options: string[];
  purpose_options: string[];
  print_script_options: string[];
};

export type IProductRes = {
  response: IResponseMeta;
  data: IProducts[];
};

export type IStaticField = {
  label: string;
  key: string | number;
  type:
    | "select"
    | "text"
    | "number"
    | "date"
    | "switch"
    | "ingredientSelect"
    | "spacer"
    | "textarea";
  placeholder: string;
  required?: boolean;
  datalist?: string;
  containerClass?: string;
  defaultChecked?: boolean;
  defaultValue?: string;
  maxValue?: number;
  textNumberValidation?: boolean;
  hideDefault?: boolean;
};
