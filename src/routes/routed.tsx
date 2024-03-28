import { Navigate, createBrowserRouter } from "react-router-dom";
import { Public, Private } from "../routes";
import { lazy as Lazy } from "react";
import Calendar from "@components/Calendar";
import AdminDashboard from "@components/Admin";

const Onboarding = Lazy(() => import("../pages/Auth/Onboarding"));
const UnQualifiedForm = Lazy(() => import("../pages/Auth/UnQualifiedForm"));
const Success = Lazy(() => import("../pages/Auth/Success"));
const HomePage = Lazy(() => import("../pages/Home"));
const Register = Lazy(() => import("../pages/Auth/Register"));
const DashboardPage = Lazy(() => import("../pages/Dashboard"));
const ResetPassword = Lazy(() => import("../pages/Auth/ResetPassword"));
const ErrorPage = Lazy(() => import("../pages/ErrorPage"));
const Logout = Lazy(() => import("../pages/Logout"));
const ForgotPAssword = Lazy(() => import("../pages/Auth/ForgotPassword"));
const QuestionnaireBooking = Lazy(
  () =>
    import("../components/GetStartedForm/Questionnaire-Booking/Questionnaire")
);
const NurseDetail = Lazy(() => import("../components/Nurse/NurseDetail/main"));
const Logger = Lazy(() => import("../pages/Auth/login"));
const MissedConsultsIcon = Lazy(
  () => import("../components/Nurse/missedConsulation")
);
const Prescribers = Lazy(() => import("../components/prescriber/prescibers"));
const PrescriberDetail = Lazy(
  () => import("../components/prescriber/PrescriberDetail/main")
);
const BookConsulation = Lazy(
  () => import("../components/Patient/BookConsulation")
);
const BookPatientSuccess = Lazy(
  () => import("../components/Patient/BookPatientSuccess")
);

const UnQualifiedPatient = Lazy(
  () => import("../components/Nurse/UnQualifiedPatient")
);
const AccountSetting = Lazy(() => import("../pages/AccountSettings"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Navigate to="/screening" replace /> },
      {
        path: "screening",
        index: true,
        element: <Onboarding />,
      },
      {
        path: "screening/information",
        element: <UnQualifiedForm />,
      },
      {
        path: "screening/success",
        element: <Success />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Logger />,
      },
      {
        path: "forgot-password",
        element: <ForgotPAssword />,
      },
      {
        path: "accounts/reset/:token",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <Private />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "missed-consultations",
        index: true,
        element: <MissedConsultsIcon />,
      },
      {
        path: "nurse/consultation",
        index: true,
        element: <NurseDetail />,
      },
      {
        path: "prescriber/consultation",
        index: true,
        element: <PrescriberDetail />,
      },
      {
        path: "assigned-patients",
        index: true,
        element: <Prescribers />,
      },
      {
        path: "rejected-patients",
        index: true,
        element: <Prescribers />,
      },
      {
        path: "prescribed-patients",
        index: true,
        element: <Prescribers />,
      },
      {
        path: "unqualified-patients",
        index: true,
        element: <UnQualifiedPatient />,
      },
      {
        path: "book-consultation",
        index: true,
        element: <BookConsulation />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "boooking-success",
        element: <BookPatientSuccess />,
      },
      {
        path: "account-settings",
        element: <AccountSetting />,
      },
      {
        path: "survey",
        element: <QuestionnaireBooking />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "admin",
        index: true,
        element: <AdminDashboard />,
      },
    ],
  },
]);

export default router;
