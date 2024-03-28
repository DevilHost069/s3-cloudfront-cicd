import React from "react";
import CommonForm from "./commonForm";
import Button from "@components/widgets/Button";
import { useProfile } from "@contexts/ProfileContext";
import {
  IPrescriberProfileResponse,
  useGetProfileDetail,
} from "@server/prescriber/useGetPrescriberProfileData";

type IPrescriberGeneral = {
  data: IPrescriberProfileResponse;
  isError?: boolean;
  isLoading?: boolean;
  refetch?: any;
};

export default function PrescriberGeneral() {
  const ctx = useProfile();
  const prescriberDetails = useGetProfileDetail(
    ctx?.profile?.profile_id,
  ) as IPrescriberGeneral;
  const data = prescriberDetails.data.data;

  if (prescriberDetails.isLoading) {
    return null;
  }
  return (
    <>
      <CommonForm data={data} />
    </>
  );
}
