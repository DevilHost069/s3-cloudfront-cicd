import { IConsultationStatus, INavItem } from "@shared/types/Constant";

import {
  AccountSettingsIcon,
  AllConsultsIcon,
  BookConsultationIcon,
  CalendarIcon,
  DashboardIcon,
  DocAssignedPatientsIcon,
  PatientsIcon,
  PrescribedPatientsIcon,
  RejectedPatientsIcon,
} from "@assets/index";
import { INurseConsulationDetail } from "@server/Nurse/Nurse-Consulation/detail";
import { IPrescriberConsulationDetail } from "@server/prescriber/useGetSingleDetailResponseOfPrescriberConsulation";
import { IStaticField } from "@shared/types/product";
import moment from "moment";

type INurseOrPrescriberDetail =
  | IPrescriberConsulationDetail
  | INurseConsulationDetail;
export const ALERT_TIMEOUT_MILLISECONDS = 6000;
export const USER_ROLES = {
  patient: "patient",
  prescriber: "prescriber",
  nurse: "nurse",
  pharmacist: "pharmacist",
  tenantadmin: "tenant_admin",
};
export const PATIENT_NAVIGATION_ITEMS_TOP: INavItem[] = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Book a Consultation",
    to: "/book-consultation",
    icon: BookConsultationIcon,
  },

  // {
  //   title: "Product History",
  //   to: "/product-history",
  //   icon: BreifCase,
  // },
];
export const NURSE_NAVIGATION_ITEMS_TOP: INavItem[] = [
  {
    title: "All Consults",
    to: "/dashboard",
    icon: AllConsultsIcon,
  },
  // {
  //   title: "Unqualified Patients",
  //   to: "/unqualified-patients",
  //   icon: RejectedPatientsIcon,
  // },
  // {
  //   title: "Missed Consultations",
  //   to: "/missed-consultations",
  //   icon: MissedConsultsIcon,
  // },
];

export const ADMIN_NAVIGATION_ITEMS_TOP: INavItem[] = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "All Consultations",
    to: "/calendar",
    icon: CalendarIcon,
  },
];

export const PRESCRIBER_NAVIGATION_ITEMS_TOP: INavItem[] = [
  {
    title: "Doctor Assigned Patients",
    to: "/dashboard",
    icon: DocAssignedPatientsIcon,
  },
  {
    title: "Prescribed Patients",
    to: "/prescribed-patients",
    icon: PrescribedPatientsIcon,
  },
  {
    title: "Not qualified patients",
    to: "/rejected-patients",
    icon: RejectedPatientsIcon,
  },
];
export const PHARMACY_NAVIGATION_ITEMS_TOP: INavItem[] = [
  {
    title: "Current Orders",
    to: "/current-orders",
    icon: DashboardIcon,
  },
  {
    title: "Patients",
    to: "/patients",
    icon: PatientsIcon,
  },
];
export const NAVIGATION_ITEMS_BOTTOM: INavItem[] = [
  {
    title: "Account Settings",
    to: "/account-settings",
    icon: AccountSettingsIcon,
  },
  // {
  //   title: "Logout",
  //   to: "/logout",
  //   icon: LogoutIcon,
  // },
];
export const consultation_pending_status_value = "consultation_pending_status";
export const consultation_under_review_status_value =
  "consultation_under_review_status";
export const consultation_nurse_approved_status_value =
  "consultation_nurse_approved_status";
export const consultation_prescriber_booked_status_value =
  "consultation_prescriber_booked_status";
export const consultation_doctor_assigned_value =
  "consultation_doctor_assigned";
export const consultation_prescribed_status_value =
  "consultation_prescribed_status";
export const prescriber_pending_status_value =
  "prescriber_consultation_pending";
export const consultation_paid_status_value = "consultation_paid_status";
export const consultation_missed_value = "consultation_missed";

//New prescriber statuses
export const prescriber_rejected_status = "prescriber_rejected";
export const prescriber_prescribed_status = "prescriber_prescribed";
export const precriber_missed_status = "precriber_missed";
export const prescriber_under_review_status = "prescriber_under_review";
export const CONSULTATION_STATUSES: IConsultationStatus[] = [
  {
    value: consultation_pending_status_value,
    class: "warning",
    displayText: "Consultation Pending",
  },
  {
    value: prescriber_pending_status_value,
    class: "warning",
    displayText: "Prescriber Consultation Pending",
  },
  {
    value: consultation_under_review_status_value,
    class: "info",
    displayText: "Under Review",
  },
  {
    value: consultation_nurse_approved_status_value,
    class: "blue",
    displayText: "Nurse Approved",
  },
  {
    value: consultation_prescriber_booked_status_value,
    class: "success",
    displayText: "Consultation Booked",
  },
  {
    value: consultation_doctor_assigned_value,
    class: "success",
    displayText: "Doctor Assigned",
  },
  {
    value: consultation_prescribed_status_value,
    class: "blue",
    displayText: "Prescribed",
  },
  {
    value: consultation_paid_status_value,
    class: "success",
    displayText: "Paid",
  },
  {
    value: consultation_missed_value,
    class: "danger",
    displayText: "Missed Consultation",
  },
  {
    value: prescriber_rejected_status,
    class: "danger",
    displayText: "Rejected",
  },
  {
    value: prescriber_prescribed_status,
    class: "success",
    displayText: "Prescribed",
  },
  {
    value: precriber_missed_status,
    class: "danger",
    displayText: "Missed Consultation",
  },
  {
    value: prescriber_under_review_status,
    class: "blue",
    displayText: "Under Review",
  },
];

export const getConsultationStatus = (item: any) => {
  const nurse_consultation_status = item.consultation_status;
  if (nurse_consultation_status === consultation_doctor_assigned_value) {
    if (item.prescriber_consultation) {
      // if (
      //   item.prescriber_consultation.consultation_status ===
      //   prescriber_pending_status_value
      // )
      //   return CONSULTATION_STATUSES.find(
      //     (i) => i.value === nurse_consultation_status
      //   );
      // else
      return CONSULTATION_STATUSES.find(
        (i) => i.value === item.prescriber_consultation.consultation_status
      );
    }
    return CONSULTATION_STATUSES.find(
      (i) => i.value === nurse_consultation_status
    );
  }
  return CONSULTATION_STATUSES.find(
    (i) => i.value === nurse_consultation_status
  );
};
export const ALERT_MESSAGES = {
  welcome: (role: string) => `Welcome to ${role} portal.`,
};

export const convertDate = (date: string) => {
  // this format 26 December 2023
  const day = moment(date).format("DD MMMM YYYY");
  const time = moment(date).format("h:mm A");
  return {
    date: day,
    time: time,
  };
};

export const ONBOARDING_STATUS = {
  PATIENT_ONBOARDING_NOT_STARTED: "not_started",
  PATIENT_ONBOARDING_QUESTIONARIES_SKIPPED: "questionaries_skipped",
  PATIENT_ONBOARDING_QUESTIONARIES_FILLED: "questionaries_filled",
  PATIENT_ONBOARDING_BOOKING_DONE: "booking_done",
};

const PRESCRIBER_TYPES = {
  D: "Dentist",
  E: "Optometrist",
  F: "Midwife",
  M: "Medical Practitioner",
  T: "Podiatrist",
  U: "Nurse",
  V: "Vetinarian",
  C: "Pharmacist",
};

export const findPrescriberTYpe = (type: string) => {
  return PRESCRIBER_TYPES[type];
};
export const PATH_TITLES = {
  "/dashboard": "Dashboard",
  "/prescribed-patients": "Dashboard",
  "/rejected-patients": "Dashboard",
  "/prescriber/consultation/": "Patient summary page",
  "/nurse/consultation/": "Patient summary page",
};

// notification labels
export const APPLICATION_STATUS = "application_status";
export const PASSWORD_RESET = "password_reset";
export const WELCOME_TO_PATIENT_PORTAL = "welcome_to_patient_portal";
export const WELCOME_TO_NURSE_PORTAL = "welcome_to_nurse_portal";
export const WELCOME_TO_PRESCRIBER_PORTAL = "welcome_to_prescriber_portal";
export const WELCOME_TO_PHARMACIST_PORTAL = "welcome_to_pharmacist_portal";
export const WELCOME_TO_ADMIN_PORTAL = "welcome_to_admin_portal";
export const NOT_DEFINED_LABEL = "not_defined";
export const WELCOME_LABEL = [
  WELCOME_TO_PATIENT_PORTAL,
  WELCOME_TO_NURSE_PORTAL,
  WELCOME_TO_PRESCRIBER_PORTAL,
  WELCOME_TO_PHARMACIST_PORTAL,
  WELCOME_TO_ADMIN_PORTAL,
];
export const RECIPE_FIELDS: IStaticField[] = [
  {
    label: "Name",
    key: "name",
    type: "text",
    placeholder: "Enter Name",
    required: true,
  },
  {
    label: "Strength",
    key: "strength",
    type: "text",
    placeholder: "Enter Strength",
    required: true,
  },
  {
    label: "Quantity",
    key: "quantity",
    type: "text",
    placeholder: "Enter Quantity",
    required: true,
  },
  {
    label: "Units",
    key: "units",
    type: "text",
    placeholder: "Enter Units",
    required: true,
  },
  {
    label: "Form",
    key: "product_form",
    type: "select",
    placeholder: "Select Form",
    required: true,
    datalist: "product_form_options",
  },
  {
    label: "Repeats",
    key: "repeats",
    type: "number",
    placeholder: "Enter Repeats",
    // maxValue: 6,
  },
  {
    label: "Route",
    key: "route_adminstration",
    type: "select",
    placeholder: "Select Route",
    required: true,
    datalist: "product_route_options",
  },
  {
    label: "Restriction",
    key: "restriction",
    type: "select",
    placeholder: "Select Restriction",
    required: true,
    datalist: "product_restriction_options",
  },
  // {
  //   label: "Share",
  //   key: "share",
  //   type: "select",
  //   placeholder: "Select Share",
  //   datalist: "product_share_options",
  // },
  {
    label: "Batch",
    key: "batch",
    type: "text",
    placeholder: "Enter Batch",
  },
  {
    label: "Expiry Date",
    key: "expiry_date",
    type: "date",
    placeholder: "dd/mm/yyyy",
    required: true,
  },
  {
    label: "Comments",
    key: "comments",
    type: "textarea",
    placeholder: "Enter Comments",
    containerClass: "col-12",
  },
];
export const PRODUCT_SELECTED_FIELDS: IStaticField[] = [
  {
    label: "Script Date ",
    key: "script_date",
    type: "date",
    placeholder: "",
  },

  {
    label: "Private",
    key: "private",
    type: "select",
    placeholder: "",
    datalist: "private",
  },

  {
    label: "Start Date ",
    key: "start_date",
    type: "date",
    placeholder: "",
  },

  {
    label: "Print Script",
    key: "print_script",
    type: "select",
    placeholder: "",
    datalist: "print_script_options",
  },

  {
    label: "Quantity",
    key: "quantity",
    type: "number",
    placeholder: "",
    defaultValue: "quantity",
  },

  {
    label: "Repeats",
    key: "repeats",
    type: "number",
    placeholder: "",
    defaultValue: "repeats",
    // maxValue: 6,
    hideDefault: true,
  },

  {
    label: "Repeat Interval ",
    key: "days_btw_repeats",
    type: "number",
    placeholder: "",
    required: true,
  },

  {
    label: "End Date (est.) ",
    key: "end_date",
    type: "date",
    placeholder: "",
  },

  {
    label: "Purpose ",
    key: "purpose",
    type: "select",
    placeholder: "",
    datalist: "purpose_options",
  },

  // {
  //   label: "Regulation 24",
  //   key: "regulation_24",
  //   type: "switch",
  //   defaultChecked: false,
  //   placeholder: "",
  //   containerClass: "col-md-12",
  // },

  // {
  //   label: "My Health Record Consent",
  //   key: "my_health_record_consent",
  //   type: "switch",
  //   defaultChecked: false,
  //   placeholder: "",
  // },

  {
    label: "",
    key: "spacer",
    type: "spacer",
    placeholder: "",
  },

  {
    label: "Brand Substitution",
    key: "brand_substitution",
    type: "switch",
    defaultChecked: true,
    placeholder: "",
    // containerClass: "col-md-12",
  },

  {
    label: "Include Brand Name",
    key: "include_your_brand_name",
    type: "switch",
    defaultChecked: false,
    placeholder: "",
  },

  // {
  //   label: "CTG/PBS Co Payment",
  //   key: "ctg_pbs_co_payment",
  //   type: "switch",
  //   defaultChecked: false,
  //   placeholder: "",
  // },

  // {
  //   label: "No Compliance Checking",
  //   key: "no_compliance_checking",
  //   type: "switch",
  //   defaultChecked: false,
  //   placeholder: "",
  // },

  {
    label: "Urgent Supply",
    key: "urgent_supply",
    type: "switch",
    defaultChecked: false,
    placeholder: "",
  },

  // {
  //   label: "Inpatient Service",
  //   key: "inpatient_service",
  //   type: "switch",
  //   defaultChecked: false,
  //   placeholder: "",
  // },
  // {
  //   label: "Unlisted Item Repat Authority",
  //   key: "is_unlisted_repeat_item",
  //   type: "switch",
  //   defaultChecked: false,
  //   placeholder: "",
  // },

  {
    label: "Confidential",
    key: "confidential",
    type: "switch",
    defaultChecked: false,
    placeholder: "",
  },
];
export const INGREDIENTS_ADD_FIELDS: IStaticField[] = [
  {
    label: "Ingredient",
    key: "name",
    type: "ingredientSelect",
    placeholder: "Enter/Search",
    containerClass: "col-md-5",
    datalist: "ingredients",
  },
  {
    label: "Strength",
    key: "strength",
    type: "text",
    placeholder: "Enter Strength",
    containerClass: "col-md-3",
    textNumberValidation: true,
  },
  {
    label: "Unit",
    key: "unit",
    type: "text",
    placeholder: "Enter Unit",
    containerClass: "col-md-3",
    textNumberValidation: true,
  },
];
