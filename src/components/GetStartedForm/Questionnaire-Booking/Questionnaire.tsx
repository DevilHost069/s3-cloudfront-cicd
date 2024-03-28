import React, { FunctionComponent, useEffect } from "react";
import { Booking, Header } from "@components/GetStartedForm";
import Button from "@components/widgets/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { usepostQuestionnaire } from "@server/auth/Questionnaire";
import QuestionnaireArrayField from "./QuestionnaireArrayField";
import { ArrowLeft } from "@assets/index";
import Alert from "@components/Alert";
import { useLocalStorageAlert } from "@hooks/useAlert";
import { alertStyler } from "@pages/Auth/login";
import useAlertStoreMessage from "../../../store/alert";
import Loader from "@components/shared/Loader";
import { useGetPrescriberWithRespectToTenant } from "@server/prescriber/useGetAllPrescriberOfSameConsulation";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { IListPrescriber } from "@components/Nurse/NurseDetail/ModalContent/AssignDoctor";
import { useProfile } from "@contexts/ProfileContext";
import { useColors } from "@utils/tenant_configuration";



type IProps = {
  selectedvalue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  hasSelected: boolean;
  setHasSelected: React.Dispatch<React.SetStateAction<boolean>>;
  activeButton: boolean;
  setActiveButton: React.Dispatch<React.SetStateAction<boolean>>;
};

export type IQuestionnaireProps = {
  response_type: string;
  patient_id: string;
  nurse?: string;
  created_at?: string;
  updated_at?: string;
  response_json: {
    slug: string;
    options: [];
    question: string;
    placeholder: string;
    required: boolean;
    answer: string;
    data_type: string;
    input_type: string;
  }[];
};

const QuestionnaireBooking: FunctionComponent = () => {
  const { primaryColor, primaryLightColor } = useColors();

  const navigate = useNavigate();
  const ctx = useProfile();
  const { alerted, crossClick } = useLocalStorageAlert();
  const alertStore = useAlertStoreMessage();
  const [loading, setLoading] = React.useState(false);
  const [hasSelected, setHasSelected] = React.useState(false);
  const [selectedvalue, setSelectedValue] = React.useState(null);
  const [activeButton, setActiveButton] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [disabled, setDisabled] = React.useState(true);
  const q = searchParams.get("name");

  const listPrescriber =
    useGetPrescriberWithRespectToTenant() as IListPrescriber;

  const postQuestionnaire = usepostQuestionnaire();

  /* The `inititalValues` constant is an object that represents the initial values for the form fields in
  the QuestionnaireBooking component. It is used as the initial values for the Formik form. */
  const inititalValues = {
    response_type: "patient_onboarding_response",
    patient_id: ctx?.profile?.profile_id || "",
    nurse: "",
    response_json: [
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
    ],
  } as IQuestionnaireProps;

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it
  is used to update the URL query parameter `name` if it is not present. */
  useEffect(() => {
    const urlName = searchParams.get("name");
    if (!urlName) {
      setSearchParams({ name: "questionnaire" });
    }
  }, [searchParams]);

  /* The `switchComponents` object is a mapping of different components based on the value of the `q`
  variable. */
  const switchComponents = {
    questionnaire: <QuestionnaireArrayField inititalValues={inititalValues} />,
    booking: (
      <Booking
        hasSelected={hasSelected}
        setHasSelected={setHasSelected}
        selectedvalue={selectedvalue}
        setSelectedValue={setSelectedValue}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        title="Book a Nurse"
      />
    ),
  };

  const component = switchComponents[q];

  const compSwitcher = (handleSubmit?: () => void) => {
    switch (q) {
      case "questionnaire":
        return <QuestionnaireArrayField inititalValues={inititalValues} />;
      case "booking":
        return (
          <Booking
            hasSelected={hasSelected}
            setHasSelected={setHasSelected}
            selectedvalue={selectedvalue}
            setSelectedValue={setSelectedValue}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            title="Book a Nurse"
            handleSubmit={handleSubmit}
            listPrescriber={listPrescriber}
          />
        );
      default:
        null;
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className="auth"
        style={{
          height: q === "booking" && !hasSelected ? "100vh" : "auto",
        }}
      >
        <Header />

        {alerted === "true" && q === "questionnaire" ? (
          <>
            <div
              className=" w-full"
              style={{
                width: "100%",
                margin: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "-2rem",
                marginTop: "5rem",
                color: "#006C3C",
              }}
            >
              <Alert
                msg={"Your account has been created successfully."}
                style={alertStyler}
                crossClick={crossClick}
              />
            </div>
          </>
        ) : null}
        {q === "booking" && (
          <div
            className="auth-child"
            style={{
              paddingBottom: "2rem",
              marginBottom: "1rem",
            }}
          >
            <Link
              to="?name=questionnaire"
              className="link-back"
              style={{
                marginTop: "1rem",
              }}
            >
              <img className="auth-child-img me-1" src={ArrowLeft} alt="" />
              BACK TO QUESTIONNAIRE PAGE
            </Link>
          </div>
        )}
        <Formik
          enableReinitialize
          initialValues={inititalValues}
          onSubmit={(values) => {
            alertStore.setMessage(
              "Your booking has been successfully placed. You can Login to track your status. 🎉🎉🎊🎊",
            );
            localStorage.setItem("alert", "true");

            postQuestionnaire.mutate(values);
            setLoading(false);
          }}
        >
          {({ values, handleSubmit }) => (
            <>
              <Form className="form" onSubmit={handleSubmit}>
                <div className="let-us-know">Let us get to know you better</div>

                {/* {component} */}
                {/* {compSwitcher(handleSubmit)} */}
                <QuestionnaireArrayField
                  inititalValues={inititalValues}
                  values={values}
                  setDisabled={setDisabled}
                />

                <div
                  className="d-flex w-full d-flex-btn"
                  style={{
                    gap: "1rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    id="get-started-btn"
                    button="Skip"
                    type="button"
                    onClick={() => {
                      handleSubmit();
                    }}
                    style={{
                      height: "48px",
                      backgroundColor: "#fff",
                      color: "var(--color-gray)",
                      border: "1px solid var(--primary-500)",
                    }}
                  />
                  <Button
                    disabled={disabled}
                    id="get-started-btn"
                    onClick={() => handleSubmit()}
                    button="Continue"
                    type="submit"
                    style={{
                      height: "48px",
                      outline: "none",
                      border: "none",
                      backgroundColor: !disabled
                        ? `${primaryColor}`
                        : `${primaryLightColor}`,
                    }}
                  />
                </div>

                {/* {q === "booking" && (
                  <Button
                    id="get-started-btn"
                    button="Continue"
                    type="submit"
                    disabled={!activeButton}
                    style={{
                      display: !activeButton ? "none" : "block",
                      backgroundColor: activeButton ? `${PRIMARY_COLOR}` : `${PRIMARY_LIGHT_COLOR}`,
                      border: `1px solid ${PRIMARY_LIGHT_COLOR}`,
                    }}
                    onClick={() => {
                      const authUser = getStorage("user");
                      if (authUser) {
                        const { email, password } = authUser;
                        const body = {
                          username: email,
                          password: password,
                        }
                        login(body, setLoading, navigate);
                      }

                    }}
                  />
                )} */}
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default QuestionnaireBooking;
