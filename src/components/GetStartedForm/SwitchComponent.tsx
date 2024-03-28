import {
  Consent,
  Credentials,
  PersonalInformation,
} from "@components/GetStartedForm";
import { IvalidateOne, IvalidateTwo } from "@pages/Auth/Register";
import { IConsentData } from "@server/auth/Consent";

type Props = {
  componentName: string;
  formik: any;
  accept: boolean;
  setAccept: (value: boolean) => void;
  validateOne: IvalidateOne | any;
  validateTwo: IvalidateTwo | any;
  disabled?: boolean;
  data: IConsentData;
  isLoading: boolean;
};

export default function SwitchComponent({
  componentName,
  formik,
  accept,
  setAccept,
  validateOne,
  validateTwo,
  disabled,
  data,
  isLoading,
}: Props) {
  const components = {
    PersonalInformation: (
      <PersonalInformation
        formik={formik}
        validateOne={validateOne}
        disabled={disabled}
      />
    ),
    // Credentials: <Credentials formik={formik} />,
    // Consent: (
    //   <Consent
    //     accept={accept}
    //     setAccept={setAccept}
    //     formik={formik}
    //     validateTwo={validateTwo}
    //     data={data}
    //     isLoading={isLoading}
    //   />
    // ),
  };

  return components[componentName] || <div>Component not found</div>;
}
