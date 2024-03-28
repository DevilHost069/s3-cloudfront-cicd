import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IState {
  initialState: any;
  setScreeningState: (state: any) => void;
  getScreeningState: () => any;
  resetInitialValues: () => void;
  isQualified: boolean;
  setIsQualified: (isQualified: boolean) => void;
  getIsQualified: () => boolean;
}

const screeningQuestion = persist<IState>(
  (set, get) => ({
    initialState: {
      response_type: "patient_onboarding_response",
      patient_id: "",
      nurse: "",
      response_json: [
        {
          slug: "age",
          options: [],
          question: "Are you over 18 ?",
          placeholder: "",
          required: false,
          answer: "",
          data_type: "string",
          input_type: "radio",
        },
        {
          slug: "medical-conditions",
          options: [],
          question: "Have you been diagnosed with a medical condition ?",
          placeholder: "",
          required: false,
          answer: "",
          data_type: "string",
          input_type: "radio",
        },
        {
          slug: "medical-condition-duration",
          options: [],
          question: "Have you had this condition for more than three months? ?",
          placeholder: "",
          required: false,
          answer: "",
          data_type: "string",
          input_type: "radio",
        },
        {
          slug: "medical_condition",
          options: [],
          question: "Have you tried standard medication without benefit ?",
          placeholder: "",
          required: false,
          answer: "",
          data_type: "string",
          input_type: "radio",
        },
        {
          slug: "medical_condition",
          options: [],
          question: "Do you have a history of psychosis ?",
          placeholder: "",
          required: false,
          answer: "",
          data_type: "string",
          input_type: "radio",
        },
        {
          slug: "medical_condition",
          options: [],
          question: "Are you pregnant ?",
          placeholder: "",
          required: false,
          answer: "",
          data_type: "string",
          input_type: "radio",
        },
      ],
    },
    setScreeningState: (initialState) => set({ initialState }),
    getScreeningState: () => get().initialState,
    resetInitialValues: () => set({ initialState: {} }),
    isQualified: null,
    setIsQualified: (isQualified) => set({ isQualified }),
    getIsQualified: () => get().isQualified,
  }),
  {
    name: "screeningState",
    storage: createJSONStorage(() => localStorage),
  },
);

const useScreenQuestion = create(screeningQuestion);
export default useScreenQuestion;
