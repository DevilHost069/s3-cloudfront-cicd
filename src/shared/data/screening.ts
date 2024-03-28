import { IQuestionnaireProps } from "@components/GetStartedForm/Questionnaire-Booking/Questionnaire";
import * as Yup from "yup";
const inititalValues = {
  response_type: "patient_onboarding_response",
  patient_id: localStorage.getItem("pid") || "",
  nurse: "",
  response_json: [
    {
      slug: "reasoning",
      options: [],
      question: "Reasoning for seeking medical cannabis ?",
      placeholder:
        "i.e. I have chronic pain in my back and I am looking for a natural alternative to opioids.",
      answer: "",
      input_type: "textfield",
    },
    {
      slug: "current-treatment",
      options: [],
      question: "Current Treatment tried ?",
      placeholder:
        "i.e. I have tried physiotherapy, acupuncture, and massage therapy.",
      answer: "",
      input_type: "textfield",
    },
    {
      slug: "current-medication",
      options: [],
      question: "Current Medications ?",
      placeholder:
        "i.e. I am currently taking 1000mg of Tylenol and 400mg of Advil daily.",
      answer: "",
      input_type: "textfield",
    },
    {
      slug: "medical_condition",
      options: [],
      question: "Any past or current major medical conditions ?",
      placeholder: "i.e. I have had 2 back surgeries in the past.",
      answer: "",
      input_type: "textfield",
    },
  ],
} as IQuestionnaireProps;

export const additionalQuestionsandAnswers = [
  {
    slug: "reasoning",
    options: [],
    question: "Reasoning for seeking medical cannabis ?",
    placeholder:
      "i.e. I have chronic pain in my back and I am looking for a natural alternative to opioids.",
    required: false,
    answer: "",
    data_type: "string",
    input_type: "textfield",
  },
  {
    slug: "current-treatment",
    options: [],
    question: "Current Treatment tried ?",
    placeholder:
      "i.e. I have tried physiotherapy, acupuncture, and massage therapy.",
    required: false,
    answer: "",
    data_type: "string",
    input_type: "textfield",
  },
  {
    slug: "current-medication",
    options: [],
    question: "Current Medications ?",
    placeholder:
      "i.e. I am currently taking 1000mg of Tylenol and 400mg of Advil daily.",
    required: false,
    answer: "",
    data_type: "string",
    input_type: "textfield",
  },
  {
    slug: "medical_condition",
    options: [],
    question: "Any past or current major medical conditions ?",
    placeholder: "i.e. I have had 2 back surgeries in the past.",
    required: false,
    answer: "",
    data_type: "string",
    input_type: "textfield",
  },
  {
    slug: "liver_function",
    options: [],
    placeholder: "i.e. I have had 2 back surgeries in the past.",
    input_type: "textfield",
    question:
      "Have you ever had any need for your liver function to be tested ?",
    answer: "",
  },
  {
    slug: "blood_test",
    options: [],
    placeholder: "i.e. bone density, blood pressure, blood sugar, etc.",
    input_type: "textfield",
    question: "Blood test required ?",
    answer: "",
  },
  {
    slug: "opioid_substitution_treatment",
    options: [],
    placeholder: "i.e. yes/no, treatment name, etc.",
    input_type: "checkbox",
    question:
      "Are you part of an Opioid Substitution Treatment Program ? (the Methadone Program)",
    answer: "",
  },
  {
    slug: "major_surgery",
    options: [],
    placeholder: "i.e. i had a knee replacement 2 years ago.",
    input_type: "textfield",
    question: "Any major surgery in the past ?",
    answer: "",
  },
  {
    slug: "major_injuries",
    options: [],
    placeholder: "i.e. i had internal bleeding 2 years ago.",
    input_type: "textfield",
    question: "Any major injuries in the past ?",
    answer: "",
  },
  {
    slug: "allergies",
    options: [],
    placeholder: "i.e. i have a peanut allergy.",
    input_type: "textfield",
    question: "Any allergies or reactions ?",
    answer: "",
  },
  {
    slug: "drug_dependence",
    options: [],
    placeholder: "i.e. i have been addicted to cocaine in the past.",
    input_type: "textfield",
    question: "Any personal history of drug dependency ?",
    answer: "",
  },
  {
    slug: "hypersensitivity_cannabinoids",
    options: [],
    placeholder: "i.e. i hypersensitive to THC.",
    input_type: "textfield",
    question: "Any hypersensitivity to cannabinoids ?",
    answer: "",
  },
  {
    slug: "family_history_mental_illness",
    options: [],
    placeholder: "i.e. i have been diagnosed with schizophrenia.",
    input_type: "textfield",
    question:
      "Do you have history of psychosis, schizophrenia or family history of psychosis and/or schizophrenia?",
    answer: "",
  },
  {
    slug: "blood_pressure",
    options: [],
    placeholder: "i.e. yes/no, blood pressure medication name, etc.",
    input_type: "checkbox",
    question: "Do you have low BP ?",
    answer: "",
  },
  {
    slug: "dispensing",
    options: [],
    placeholder: "i.e. yes/no, explanation, etc.",
    input_type: "checkbox",
    question:
      "Are you happy to use our partner pharmacy, X (Pharmacy name) for dispensing ?",
    answer: "",
  },
  {
    slug: "heart_arrhythmia",
    options: [],
    placeholder: "i.e. yes/no, explanation, etc.",
    input_type: "checkbox",
    question: "Any heart arrhythmia ?",
    answer: "",
  },
  {
    slug: "pregnant_breastfeeding",
    options: [],
    placeholder: "i.e. yes/no, explanation, etc.",
    input_type: "checkbox",
    question: "Patient pregnant or breastfeeding ?",
    answer: "",
  },
  {
    slug: "off_street_use",
    options: [],
    placeholder: "i.e. yes/no, explanation, etc.",
    input_type: "checkbox",
    question: "Previous 'black-market/off-street' cannabis use ?",
    answer: "",
  },

  {
    slug: "alcohol_consumption",
    options: [
      {
        value: ">10 SD/week",
        label: ">10 SD/week",
      },
      {
        value: "<10 SD/week",
        label: "<10 SD/week",
      },
    ],
    question:
      "Do you drink alcohol? If yes, how many standard drinks do you have per week ?",
    placeholder: "Enter approximate alcohol consumption daily/weekly",
    required: false,
    answer: "",
    data_type: "string",
    input_type: "select",
  },
  {
    slug: "statements",
    options: [
      {
        value:
          "i am currently self-medicating using cannabis for a medical condition.",
        label:
          "i am currently self-medicating using cannabis for a medical condition.",
      },
      {
        value:
          "I have self-medicated in the past using cannabis for a medical condition.",
        label:
          "I have self-medicated in the past using cannabis for a medical condition.",
      },
      {
        value:
          "I am using medical cannabis from another clinic but want to change clinic.",
        label:
          "I am using medical cannabis from another clinic but want to change clinic.",
      },
      {
        value:
          "I have used medical cannabis before but stopped using and would like to use it again to treat a medical condition.",
        label:
          "I have used medical cannabis before but stopped using and would like to use it again to treat a medical condition.",
      },
      {
        value: "I use cannabis recreationally.",
        label: "I use cannabis recreationally.",
      },
      {
        value: "I have never used cannabis.",
        label: "I have never used cannabis.",
      },
    ],
    question:
      "Which one of the following statements better describes your condition?",
    placeholder: "Enter approximate alcohol consumption daily/weekly",
    required: false,
    answer: "",
    data_type: "string",
    input_type: "select",
  },
  {
    slug: "smoke_vape_nicotine",
    options: [],
    placeholder: "",
    input_type: "textfield",
    question:
      "Do you smoke/vape nicotine ? If yes, how many cigarettes (or cigarettes equivalent) do you have per day ?",
    answer: "",
  },
  {
    slug: "height",
    options: [],
    placeholder: "",
    input_type: "textfield",
    question: "Height ?",
    answer: "",
  },
  {
    slug: "weight",
    options: [],
    placeholder: "Weight ?",
    input_type: "textfield",
    question: "Weight ?",
    answer: "",
  },
  {
    slug: "previous_current_use",
    options: [],
    placeholder: "i.e. yes/no, explanation, etc.",
    input_type: "checkbox",
    question: "Previous/current medicinal cannabis use ?",
    answer: "",
  },
  // {
  //   slug: "previous_prescriber_name",
  //   options: [],
  //   question: "If yes, previous clinic or prescriber's name?",
  //   placeholder: "Enter Clinic or prescriber's name",
  //   required: false,
  //   answer: "N/A",
  //   data_type: "string",
  //   input_type: "textfield",
  // },
];

export const screeningQuestionsValidationSchema = Yup.object().shape({
  response_json: Yup.array().of(
    Yup.object().shape({
      answer: Yup.string()
        .required("Required")
        .test("answer", "Required", (value) => {
          if (value === "") {
            return false;
          }
          return true;
        }),
    })
  ),
});
