export type IUserRole =
  | ""
  | "patient"
  | "prescriber"
  | "nurse"
  | "pharmacist"
  | "tenant_admin";

export type IProfileDetails = {
  username: string;
  user_role: IUserRole;
  first_name: string;
  last_name: string;
  email: string;
  profile_id?: string;
};
