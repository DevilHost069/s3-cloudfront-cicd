import { PRIMARY_COLOR } from "@utils/color";
import React, { useState } from "react";

import Select from "react-select";
import { useColors } from "@utils/tenant_configuration";


// generic data[] type
type Data = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  product_code: string;
  base_rate: number;
};
type ISelector = {
  data: Data[];
  onChange?: (e: any) => void;
  isLoading?: boolean;
};

export default function Selector({ data, onChange, isLoading }: ISelector) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const [isRtl, setIsRtl] = useState(false);
  function getData() {
    if (data.length > 0) {
      return data?.map((group: any) => ({
        label: group.name,
        value: group.base_rate,
        id: group.id,
        product_code: group.product_code,
        created_at: group.created_at,
        updated_at: group.updated_at,
      }));
    }
    return [];
  }
  const opts = getData();

  const groupedOptions = opts ?? [];
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <Select
        className="basic-single w-full"
        classNamePrefix="select"
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={groupedOptions}
        placeholder="Search the Product"
        onChange={onChange}
        styles={{
          control: (base, state) => ({
            ...base,
            border: "none",
            borderColor: "none",
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
              backgroundColor: "var(--bs-primary-500)",
              color: "#fff",
            },
          }),
        }}
      />
    </>
  );
}
