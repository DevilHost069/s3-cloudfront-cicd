import { useProfile } from "@contexts/ProfileContext";
import NurseGeneral from "./NurseGeneral";
import General from "./General";
import PrescriberGeneral from "./PrescriberGeneral";
import { useUpdatePatientProfile } from "@server/patient/patch";
import { useGetSinglePatientDetailByOid } from "@server/patient/getSinglePatientDetail";
import { IPatientDetailsBYOid } from "@components/Nurse/NurseDetail/main";
import Loader from "@components/shared/Loader";
import AdminGeneral from "./AdminGeneral";

export default function SettingPersonalInformation() {
  const ctx = useProfile();
  const patientOid = ctx.profile?.profile_id;
  const upd = useUpdatePatientProfile(ctx.profile?.profile_id);
  const patientDetail = useGetSinglePatientDetailByOid(
    patientOid,
  ) as IPatientDetailsBYOid;

  const SwitchComponents = {
    nurse: <NurseGeneral />,
    patient: (
      <General
        title="Personal Information"
        patientDetail={patientDetail}
        upd={upd}
      />
    ),
    prescriber: <PrescriberGeneral />,
    tenant_admin: <AdminGeneral />,

  };

  const component = SwitchComponents[ctx.profile.user_role];
  if (patientDetail.isLoading) {
    <Loader />;
  }
  return <>{component}</>;
}
