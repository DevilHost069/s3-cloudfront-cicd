// {
//     "id": 163,
//     "patient_internal_id": "P0163",
//     "first_name": "Britanni",
//     "last_name": "Dodson",
//     "email": "bicox@mailinator.com",
//     "phone_number": "+1 (193) 911-8142",
//     "username": "bicox@mailinator.com",
//     "signed_consent_form": {
//         "id": 1,
//         "version": "1.0.0",
//         "consent_type": "patient_onboarding_consent_form",
//         "consent_form": "<h4 style=\"text-align: center;\">Cannabiz Elite Treatment Consent Form</h4>\r\n<p>&nbsp;</p>\r\n<h6>Purpose of Consent Form:</h6>\r\n<p>This consent form aims to provide comprehensive information enabling patients to make informed decisions and consent to medicinal cannabis treatment. Additionally, it outlines patient responsibilities, establishes a patient registration scheme, and clarifies the duty of care of treating clinicians.</p>\r\n<h6>Benefits, Risks, and Possible Complications of Medicinal Cannabis:</h6>\r\n<p>I acknowledge:</p>\r\n<p>The Cannabizelite system connects patients with medical professionals, pharmacies, and medicinal cannabis products. It is not a medical practice or pharmacy.</p>\r\n<ul>\r\n<li>Medicinal cannabis is an experimental drug with limited data for specific recommendations.</li>\r\n<li>Medicinal cannabis is generally not registered for use by the Therapeutic Goods Administration (TGA), and access is often through a Special Access Scheme (SAS).</li>\r\n<li>Benefits and risks in children, pregnancy, and breastfeeding are not extensively studied, and the system is not liable for related damages.</li>\r\n<li>Possible known side effects may include nausea, euphoria, dry mouth, and others.</li>\r\n<li>I waive rights to claim against Cannabizelite and medical professionals for any side effects.</li>\r\n</ul>\r\n<h6>Patient Responsibilities:</h6>\r\n<p>I am obligated to attentively heed the guidance provided by the doctor, clinician, and pharmacist during consultations. I have already had, or will have, ample chances to discuss and delve into the potential treatment of medicinal cannabis for my personal well-being, and I consent to the following:</p>\r\n<ul>\r\n<li>Declare absence of conditions contra-indicated with medicinal cannabis treatment.</li>\r\n<li>Regularly consult with cannabis doctors or clinicians.</li>\r\n<li>Follow prescribed dosage and frequency.</li>\r\n<li>Maintain a healthy lifestyle.</li>\r\n<li>Avoid substances that may interact with medicinal cannabis.</li>\r\n<li>Provide information on concurrent medications.</li>\r\n<li>Report ineffectiveness or adverse events.</li>\r\n</ul>\r\n<h6>Patient Registration Scheme:</h6>\r\n<p>I consent to participate in Cannabizelite&rsquo;s patient registration and monitoring program. This includes using the monitoring program to track my symptoms and progress.</p>\r\n<h6>CannabizElite and Prescribing Doctor's Duty of Care:</h6>\r\n<p>They can provide additional information, referrals, and ensure legal procedures for information security and privacy are followed.</p>\r\n<h6>Consent to Gathering of Personal and Medical Information:</h6>\r\n<p style=\"text-align: left;\">I consent to the collection, use, and disclosure of personal and medical information for administrative, billing, and healthcare purposes.</p>\r\n<h6>Final Declaration:</h6>\r\n<p style=\"text-align: left;\">I declare understanding, agreement to medicinal cannabis treatment, acknowledgment of responsibilities, and consent to information collection, use, and disclosure.</p>",
//         "is_active": true
//     },
//     "patient_responses": [
//         {
//             "id": 88,
//             "patient_oid": "f261efdf-31d6-477f-9917-eff249a5ebd3",
//             "created_at": "2024-02-01T20:38:03.299065Z",
//             "updated_at": "2024-02-01T20:38:03.299363Z",
//             "response_json": [
//                 {
//                     "slug": "age",
//                     "answer": "yes",
//                     "options": [],
//                     "question": "Are you over 18 ?",
//                     "required": false,
//                     "data_type": "string",
//                     "input_type": "radio",
//                     "placeholder": ""
//                 },
//                 {
//                     "slug": "medical-conditions",
//                     "answer": "no",
//                     "options": [],
//                     "question": "Have you been diagnosed with a medical condition ?",
//                     "required": false,
//                     "data_type": "string",
//                     "input_type": "radio",
//                     "placeholder": ""
//                 },
//                 {
//                     "slug": "medical-condition-duration",
//                     "answer": "yes",
//                     "options": [],
//                     "question": "Have you had this condition for more than three months? ?",
//                     "required": false,
//                     "data_type": "string",
//                     "input_type": "radio",
//                     "placeholder": ""
//                 },
//                 {
//                     "slug": "medical_condition",
//                     "answer": "no",
//                     "options": [],
//                     "question": "Have you tried standard medication without benefit ?",
//                     "required": false,
//                     "data_type": "string",
//                     "input_type": "radio",
//                     "placeholder": ""
//                 },
//                 {
//                     "slug": "medical_condition",
//                     "answer": "yes",
//                     "options": [],
//                     "question": "Do you have a history of psychosis ?",
//                     "required": false,
//                     "data_type": "string",
//                     "input_type": "radio",
//                     "placeholder": ""
//                 },
//                 {
//                     "slug": "medical_condition",
//                     "answer": "no",
//                     "options": [],
//                     "question": "Are you pregnant ?",
//                     "required": false,
//                     "data_type": "string",
//                     "input_type": "radio",
//                     "placeholder": ""
//                 }
//             ],
//             "response_type": "patient_onboarding_response",
//             "patient": 163
//         }
//     ],
//     "oid": "f261efdf-31d6-477f-9917-eff249a5ebd3",
//     "created_at": "2024-02-01T20:38:03.260397Z",
//     "updated_at": "2024-02-01T20:38:03.302939Z",
//     "medicare_number": null,
//     "medicare_expiry_date": null,
//     "medicare_reference_number": null,
//     "dob": null,
//     "address": null,
//     "gender": null,
//     "consent_signed_at": "2024-02-01T20:38:03.260464Z",
//     "onboarding_status": "questionaries_filled",
//     "is_qualified": false,
//     "health_identifier": null,
//     "auth_user": 217,
//     "last_updated_by": null
// },

import { IResponseMeta } from "./common";

type UnQualifiedPatient = {
  id: number;
  patient_internal_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  username: string;
  signed_consent_form: {
    id: number;
    version: string;
    consent_type: string;
    consent_form: string;
    is_active: boolean;
  };
  patient_responses: {
    id: number;
    patient_oid: string;
    created_at: string;
    updated_at: string;
    response_json: {
      slug: string;
      answer: string;
      options: string[];
      question: string;
      required: boolean;
      data_type: string;
      input_type: string;
      placeholder: string;
    }[];
    response_type: string;
    patient: number;
  }[];
  oid: string;
  created_at: string;
  updated_at: string;
  medicare_number: string;
  medicare_expiry_date: string;
  medicare_reference_number: string;
  dob: string;
  address: string;
  gender: string;
  consent_signed_at: string;
  onboarding_status: string;
  is_qualified: boolean;
  health_identifier: string;
  auth_user: number;
  last_updated_by: string;
  previous_gp: string;
};

export type IUnQualifiedPatient = {
  response: IResponseMeta;
  data: UnQualifiedPatient;
};
