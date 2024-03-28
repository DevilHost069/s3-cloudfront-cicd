import { Header } from "@components/GetStartedForm";
import QualifiedScreeningQuestions from "@components/GetStartedForm/Qualification/QualifiedScreeningQuestions";
import useScreenQuestion from "../../store/onboardingScreening";

export default function Onboarding() {
  return (
    <>
      <div className="auth">
        <Header />
        <QualifiedScreeningQuestions />
      </div>
    </>
  );
}
