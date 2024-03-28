import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  ISignUpFormValues,
  signUpSchema,
  validateFirstStep,
  validateSecondStep,
} from "@shared/types/Auth";
import SwitchComponent from "../../components/GetStartedForm/SwitchComponent";
import ButtonSwitcher from "@components/GetStartedForm/ButtonSwitcher";
import { ArrowLeft } from "@assets/index";
import { Header } from "@components/GetStartedForm";
import {
  isObjectContainsRequired,
  scrollToTop,
  setStorage,
} from "@utils/helper";
import { IConsentData, useGetConsent } from "@server/auth/Consent";
import register from "@server/auth/Register";
import Loader from "@components/shared/Loader";
import { ONBOARDING_STATUS } from "@utils/constants";
import useScreenQuestion from "../../store/onboardingScreening";
import { usepostQuestionnaire } from "@server/auth/Questionnaire";

export type IvalidateOne = {
  first_name: string;
  last_name: string;
  phone_number: string;
};

export type IvalidateTwo = {
  email: string;
  password: string;
  confirm_password: string;
};

type IConsentsProps = {
  data: IConsentData;
  isLoading: boolean;
};

export default function Register() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accept, setAccept] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);
  const [onLoading, setOnLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const screen = useScreenQuestion();
  const sceenVal = screen.getScreeningState();
  const qualifiedState = screen.getIsQualified();
  const postQuestionnaire = usepostQuestionnaire();

  const { data, isLoading } = useGetConsent() as IConsentsProps;


  const initialValues = {
    signed_consent_form_id: data?.id,
    first_name: "",
    last_name: "",
    phone_number: "",
    medicare_number: "",
    dob: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    confirm_password: "",
    onboarding_status: ONBOARDING_STATUS.PATIENT_ONBOARDING_NOT_STARTED,
    health_identifier: "",
    is_qualified: qualifiedState,
    auto_location: false,
  } as ISignUpFormValues;

  // let now = performance.now();
  // while (performance.now() - now < 1000) {
  //   // do nothing
  // }

  /* The line `const q = searchParams.get("name");` is retrieving the value of the "name" parameter from
the search parameters. It uses the `get` method of the `searchParams` object to retrieve the value
associated with the "name" parameter in the URL query string. The retrieved value is then stored in
the variable `q`. */
  const q = searchParams.get("name");

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
effect is triggered when the `searchParams` value changes. */
  useEffect(() => {
    const urlName = searchParams.get("name");
    if (!urlName) {
      setSearchParams({ name: "Consent" });
    }
  }, [searchParams]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, reset) => {
      localStorage.setItem("alert", "true");

      /* The code block is iterating over an array of property names (`medicare_number`, `dob`, and
      `address`) and checking if the corresponding values in the `values` object are empty strings.
      If a value is empty, it deletes the property from the `values` object. This is done to remove
      any empty properties before submitting the form data. */
      const propertiesToDelete = [
        "medicare_number",
        "dob",
        "address",
        "health_identifier",
      ];
      for (const property of propertiesToDelete) {
        if (values[property] === "") {
          delete values[property];
        }
      }
      /* The `register` function is being called with four arguments: `values`, `setLoading`,
      `setOnLoading`, and `navigate`. */
      register(values, setLoading, setOnLoading, navigate)
        .then((res: any) => {
          if (res?.id !== undefined) {
            const vall = {
              response_type: "patient_onboarding_response",
              patient_id: res?.oid,
              nurse: "",
              response_json: sceenVal.response_json,
            };
            postQuestionnaire.mutate(vall, {
              onSuccess: (data) => {
                screen.resetInitialValues();
              },
              onError: (error) => { },
            });
          }
        })
        .catch((error) => { });
    },
  });

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  effect is triggered when the values of `accept`, `q`, or `onLoading` change. */

  useEffect(() => {
    if (accept && !onLoading && q !== "Consent") {
      window.onbeforeunload = function () {
        return true;
      };
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [accept, q, onLoading]);

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  effect is triggered when the values of `accept` or `q` change. */
  useEffect(() => {
    // if (!accept && q !== "Consent") {
    //   navigate("/register/?name=Consent");
    // }
    if (!accept && q !== "PersonalInformation") {
      navigate("/register/?name=PersonalInformation");
    }
  }, [accept, q]);

  const validateOne = validateFirstStep(formik.values) as IvalidateOne | any;
  const validateTwo = validateSecondStep(formik.values) as IvalidateTwo | any;

  /**
   * The function `handleLinkChange` updates the search parameters and component name based on the
   * value of `q`.
   * @returns In the case where `q` is equal to "booking", nothing is being returned.
   */
  const handleLinkChange = () => {
    switch (q) {
      // case "Consent":
      //   setSearchParams({ name: "PersonalInformation" });
      //   break;
      case "PersonalInformation":
        const check = isObjectContainsRequired(validateOne);
        if (!check) {
          setDisabled(false);
          // setSearchParams({ name: "Credentials" });
          return;
        } else {
          setDisabled(true);
        }
        break;
      // case "Credentials":
      //   return;
      default:
        setSearchParams({ name: "Consent" });
    }

    scrollToTop();
  };

  if (isLoading || Loading) {
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="auth">
        <Header />
        {q === "Credentials" && (
          <div className="auth-child">
            <Link
              to="?name=PersonalInformation"
              className="link-back"
              style={{}}
            >
              <img className="auth-child-img me-1" src={ArrowLeft} alt="" />
              BACK TO PERSONAL INFORMATION PAGE
            </Link>
          </div>
        )}
        {q === "Questionnaire" && (
          <div className="questions">Questionnaire</div>
        )}
        {q === "Booking" && <div className="questions">Book Consultation</div>}
        <form className="form" onSubmit={formik.handleSubmit}>
          <SwitchComponent
            componentName={q}
            formik={formik}
            accept={accept}
            setAccept={setAccept}
            validateOne={validateOne}
            validateTwo={validateTwo}
            disabled={disabled}
            data={data}
            isLoading={isLoading}
          />

          <ButtonSwitcher
            q={q}
            formik={formik}
            accept={accept}
            handleLinkChange={handleLinkChange}
            setOnLoading={setOnLoading}
            validateOne={validateOne}
          />
        </form>
      </div>
    </>
  );
}
