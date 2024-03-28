export type IResponseMeta = {
  meta: {};
  success: boolean;
  status_code: number;
};

export type IPrescriberProfile = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone_number: string;
  oid: string;
  created_at: string;
  updated_at: string;
  booking_id: string;
  auth_user: number;
  address?: string;
  raw_address?: string;
};
