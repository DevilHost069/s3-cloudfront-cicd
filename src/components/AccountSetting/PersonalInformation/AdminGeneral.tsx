import CommonForm from "./commonForm";
import { useProfile } from "@contexts/ProfileContext";
import { useGetNurseProfileDetail } from "@server/Nurse/useGetNurseProfileData";
import { IPrescriberProfileResponse } from "@server/prescriber/useGetPrescriberProfileData";
import { useGetConsultationAdminProfile } from "@server/admin/useGetAdminProfile";

type IPrescriberGeneral = {
    data: IPrescriberProfileResponse;
    isError?: boolean;
    isLoading?: boolean;
    refetch?: any;
};

export default function AdminGeneral() {
    /* `const ctx = useProfile()` is assigning the return value of the `useProfile()` hook to the
      variable `ctx`. The `useProfile()` hook is likely a custom hook that is used to access the user's
      profile data from a context provider. By calling `useProfile()`, the component can access the
      profile data and perform any necessary operations with it. */
    const ctx = useProfile();
    const getAdminProfile = useGetConsultationAdminProfile()
    /* The code `const nurseProfileDetail = useGetNurseProfileDetail(ctx?.profile?.profile_id) as
      IPrescriberGeneral` is calling the `useGetNurseProfileDetail` hook and assigning its return
      value to the variable `nurseProfileDetail`. The `useGetNurseProfileDetail` hook is likely a
      custom hook that fetches the nurse's profile detail from the server based on the provided
      `profile_id`. The `ctx?.profile?.profile_id` is accessing the `profile_id` property from the
      `profile` object in the `ctx` variable. */
    const nurseProfileDetail = useGetNurseProfileDetail(
        ctx?.profile?.profile_id,
    ) as IPrescriberGeneral;
    const data = nurseProfileDetail.data.data;

    if (getAdminProfile.isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <CommonForm data={getAdminProfile.data} />
        </>
    );
}
