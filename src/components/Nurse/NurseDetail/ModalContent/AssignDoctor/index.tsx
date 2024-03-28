import { Booking } from "@components/GetStartedForm";
import Button from "@components/widgets/Button";
import {
  IPrescriberData,
  useGetPrescriberWithRespectToTenant,
} from "@server/prescriber/useGetAllPrescriberOfSameConsulation";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";

import { useColors } from "@utils/tenant_configuration";



type IAssignDoctor = {
  doctorAssigned: any;
};

export type IListPrescriber = {
  data: IPrescriberData[] | undefined;
  isError: boolean | undefined;
  isLoading: boolean | undefined;
  refetch?: () => Promise<any>;
};

export default function AssignDoctor({ doctorAssigned }: IAssignDoctor) {
  const [hasSelected, setHasSelected] = React.useState(false);
  const [selectedvalue, setSelectedValue] = React.useState(null);
  const [activeButton, setActiveButton] = React.useState(false);
  const [search, setSearch] = useSearchParams();

  /* The line `const listPrescriber = useGetPrescriberWithRespectToTenant() as IListPrescriber` is
    calling the `useGetPrescriberWithRespectToTenant` hook and assigning its return value to the
    `listPrescriber` variable. The `as IListPrescriber` part is a type assertion, which tells
    TypeScript to treat the return value of the hook as an `IListPrescriber` type. */
  const listPrescriber =
    useGetPrescriberWithRespectToTenant() as IListPrescriber;
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <Booking
        hasSelected={hasSelected}
        setHasSelected={setHasSelected}
        selectedvalue={selectedvalue}
        setSelectedValue={setSelectedValue}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        title=""
        label="Available Doctor"
        listPrescriber={listPrescriber}
      />
      <Button
        id="get-started-btn"
        button="Assign Doctor"
        type="button"
        dataBsDismiss={"modal"}
        onClick={() => {
          doctorAssigned.mutate(search.get("consultation_oid"));
        }}
        disabled={!activeButton}
        style={{
          display: !activeButton ? "none" : "block",
          backgroundColor: activeButton
            ? `${primaryColor}`
            : `${primaryLightColor}`,
          border: `1px solid ${primaryLightColor}`,
        }}
      />
    </>
  );
}
