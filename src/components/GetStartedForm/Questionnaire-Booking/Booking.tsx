// import "@assets/css/GetStarted/Booking.css";
// import React, {
//   FunctionComponent,
//   useCallback,
//   useEffect,
//   useState,
// } from "react";
// import Cal, { getCalApi } from "@calcom/embed-react";
// import { useGetgetNursesWithRespectToTenant } from "@server/Nurse/Nurse";
// import { IListPrescriber } from "@components/Nurse/NurseDetail/ModalContent/AssignDoctor";
// import { IPrescriberData } from "@server/prescriber/useGetAllPrescriberOfSameConsulation";
// import { useProfile } from "@contexts/ProfileContext";
// import { useGetPAtientDtailByOID } from "@server/patient/getPatientDetailByOID";
// import { IPatientDetailsBYOid } from "@components/Nurse/NurseDetail/main";
// import { useLocation, useSearchParams } from "react-router-dom";
// import { getStorage } from "@utils/helper";
// import { useGetSinglePatientDetailByOid } from "@server/patient/getSinglePatientDetail";

// type IBookingProps = {
//   selectedvalue: string;
//   setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
//   hasSelected: boolean;
//   setHasSelected: React.Dispatch<React.SetStateAction<boolean>>;
//   activeButton: boolean;
//   setActiveButton: React.Dispatch<React.SetStateAction<boolean>>;
//   title: string;
//   label?: string;
//   listPrescriber?: IListPrescriber;
//   setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
//   handleSubmit?: () => void;
// };

// const Booking: FunctionComponent<IBookingProps> = ({
//   selectedvalue,
//   setSelectedValue,
//   hasSelected,
//   setHasSelected,
//   activeButton,
//   setActiveButton,
//   title = "Book a Nurse",
//   label = "Available Nurses",
//   listPrescriber,
//   setLoading,
//   handleSubmit
// }: IBookingProps) => {

//   const location = useLocation();
//   const { data } = useGetgetNursesWithRespectToTenant();
//   const [CalApi, setCalApi] = useState<Awaited<ReturnType<typeof getCalApi>>>();
//   const [counter, setCounter] = useState(0);
//   const [linkReadyStatus, setLinkReadyStatus] = useState(null);

//   const path = location.pathname;

//   const [searchParams, setSearchParams] = useSearchParams();
//   const patientOid = searchParams.get("patient_oid");
//   const profileContext = useProfile();

//   /* The line `const patientDetail = useGetPAtientDtailByOID(patientOid) as IPatientDetailsBYOid;` is
//   calling a custom hook `useGetPAtientDtailByOID` and assigning the returned value to the
//   `patientDetail` variable. */
//   const patientDetail = useGetSinglePatientDetailByOid(
//     patientOid,
//   ) as IPatientDetailsBYOid;

//   const switchByPath = () => {
//     switch (path) {
//       case '/book-consultation':
//         break;
//       case '/survey':
//         handleSubmit();
//         break;
//       default:
//         break;
//     }
//   }

//   useEffect(() => {
//     if (activeButton) {
//       switchByPath();
//     }
//   }, [path, activeButton])

//   /* These lines of code are retrieving the user data from the local storage and parsing it into a
//   JavaScript object. The `localStorage.getItem("user")` retrieves the user data from the local
//   storage, and `JSON.parse(localData)` parses the retrieved data into a JavaScript object. The object
//   is then destructured to extract the `fullName` and `email` properties. If the parsing fails or the
//   `parsed` variable is null, the destructuring will assign empty values to `fullName` and `email`. */

//   const parsed = getStorage("user");
//   const { fullName, email } = parsed || {};

//   /**
//    * The function `switchToGetNameAndEmail` returns an object containing the name and email based on
//    * different conditions.
//    * @returns The function `switchToGetNameAndEmail` returns an object with the properties `name` and
//    * `email`. The values of these properties depend on the conditions in the if-else statements.
//    */
//   function switchToGetNameAndEmail() {
//     const paths = ['/dashboard', '/book-consultation']
//     if (paths.includes(path)) {
//       return {
//         name: profileContext?.profile?.first_name + " " + profileContext?.profile?.last_name,
//         email: profileContext?.profile?.email,
//       };
//     } else if (path === '/nurse/consultation/') {
//       return {
//         name: patientDetail?.data?.first_name + " " + patientDetail?.data?.last_name,
//         email: patientDetail?.data?.email,
//       }
//     }

//     else {
//       return {
//         name: `${patientDetail?.data?.first_name} ${patientDetail?.data?.last_name}`,
//         email: patientDetail?.data?.email,
//       };
//     }
//   }
//   const getNameAndEmail = switchToGetNameAndEmail();

//   /* The line `const pescribers = listPrescriber?.data as IPrescriberData[] || []` is declaring a
//   variable `pescribers` and assigning it a value. */
//   const pescribers = listPrescriber?.data as IPrescriberData[] || []

//   const docs = document.getElementsByClassName("border-emphasis");
//   /* The `onLinkReady` function is a callback function that is used to handle the "linkReady" event. It
//  is created using the `useCallback` hook, which ensures that the function is only created once and
//  not recreated on every render. */
//   const onLinkReady = useCallback((e) => {
//     setLinkReadyStatus(true);
//   }, []);

//   /* The `onLinkReady` function is a callback function that is used to handle the "linkReady" event. It
// is created using the `useCallback` hook, which ensures that the function is only created once and
// not recreated on every render. */
//   /* The first `useEffect` hook is responsible for initializing the Cal API and setting up an event
// listener for the "linkReady" action. It is triggered when the component mounts and whenever the
// `onLinkReady` function changes. */
//   useEffect(() => {
//     (async function () {
//       const CalApi = await getCalApi();
//       setCalApi(() => CalApi);
//       CalApi("on", {
//         action: "linkReady",
//         callback: onLinkReady,
//       });
//     })();
//   }, [onLinkReady]);

//   /* The `useEffect` hook is used to perform side effects in a React component. In this case, the
//   `useEffect` hook is used to initialize the Cal API and set up event listeners. */
//   useEffect(() => {
//     (async function () {
//       const cal = await getCalApi();
//       cal("ui", {
//         theme: "light",
//         cssVarsPerTheme: {
//           light: {
//             // "cal-border": `${PRIMARY_COLOR}`,
//             // "cal-border-default": "#fff",
//             // "cal-border-subtle": "#fff",
//             // "cal-border-booker": "#fff",
//             // "cal-border-booker-hover": "#fff",
//             // More CSS variables are defined here
//             // https://github.com/calcom/cal.com/blob/b0ca7dae1a17f897e34b83c990f30ab65f615ee0/packages/config/tailwind-preset.js#L69
//             "cal-brand": `${PRIMARY_COLOR}`,
//             "cal-brand-text": "#fff",
//             "cal-text-emphasis": `${PRIMARY_COLOR}`,
//             "cal-bg-info": `${PRIMARY_COLOR}`,
//             "cal-brand-emphasis": `${PRIMARY_COLOR}`,
//             "cal-text-attention": `${PRIMARY_COLOR}`,

//           },
//         },
//         hideEventTypeDetails: false,
//         layout: "month_view",
//       });

//       // cal("on", {
//       //   action: "linkFailed",
//       //   callback: (e) => {
//       //     console.log("linkFailed", e.detail);
//       //   }
//       // })

//       cal("on", {
//         action: "bookingSuccessful",
//         callback: (e) => {
//           // `data` is properties for the event.
//           // `type` is the name of the action
//           // `namespace` is the Cal namespace for which the event is fired
//           console.log("well, i am here");
//           console.log(e.detail);

//           const { data, type, namespace } = e.detail;
//           if (data.confirmed) {
//             setActiveButton(true);
//             setLoading(true);
//           }
//         },
//       });
//     })();
//   }, []);

//   /**
//    * The function `handleSelectChange` updates the selected value, checks if a valid option is selected,
//    * increments a counter, and sets the link ready status to false.
//    * @param e - The parameter "e" is an event object that represents the event that triggered the
//    * function. In this case, it is likely an event object from a select element's onChange event.
//    */
//   const handleSelectChange = async (e) => {
//     setSelectedValue(e.target.value);
//     switch (e.target.value) {
//       case "Select one...":
//         setHasSelected(false);
//         break;
//       case null:
//         setHasSelected(false);
//         break;
//       default:
//         setHasSelected(true);
//         break;
//     }
//     setCounter((c) => c + 1);
//     setLinkReadyStatus(false);
//   };

//   const styyler = {
//     width: "50%",
//     marginLeft: "auto",
//     marginRight: "auto",
//     marginBottom: "3rem",
//   }

//   return (
//     <>
//       <div className={
//         path === '/book-consultation' ?
//           "book-a-nurse mb-5" : "book-a-nurse"
//       }>{title}</div>
//       <div className="input" style={
//         path === '/book-consultation' ? styyler : {}
//       }>
//         <div className="available-nurse text-start">{label}</div>
//         <select
//           id="booking_select"
//           className="select form-select"
//           onChange={handleSelectChange}
//           value={selectedvalue}

//         >
//           <option className="" value='Select one...'>
//             Select one...
//           </option>
//           {path === "/dashboard" || path === "/book-consultation" ? (
//             Array.isArray(data) &&
//             data.map((item) => (
//               <option key={item.id} value={item.booking_id}>
//                 {item.first_name} {item.last_name}
//               </option>
//             ))
//           ) : Array.isArray(pescribers) && !listPrescriber.isLoading &&
//           listPrescriber.data.map((item) => (
//             <option key={item.id} value={item.booking_id}>
//               {item.first_name} {item.last_name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {hasSelected && (
//         <Cal
//           key={counter}
//           calLink={selectedvalue}
//           style={{
//             width: "100%",
//             height: "100%",
//             overflow: "scroll",
//             fontFamily: "Nunito Sans",
//           }}
//           // config={{ layout: "month_view",

//           // }}
//           config={{
//             name: getNameAndEmail.name,
//             email: getNameAndEmail.email,
//             // location: JSON.stringify({
//             //   // In case of Attendee phone use "phone" here
//             //   value: "attendeeInPerson",
//             //   // In case of Attendee phone add phone number here.
//             //   optionValue: "http://myvideotool.com/mycustomlink",
//             // }),
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default Booking;

import "@assets/css/GetStarted/Booking.css";
import { getCalApi } from "@calcom/embed-react";
import { IListPrescriber } from "@components/Nurse/NurseDetail/ModalContent/AssignDoctor";
import { IPatientDetailsBYOid } from "@components/Nurse/NurseDetail/main";
import { useProfile } from "@contexts/ProfileContext";
import { useGetgetNursesWithRespectToTenant } from "@server/Nurse/Nurse";
import { IPrescriberData } from "@server/prescriber/useGetAllPrescriberOfSameConsulation";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import logout from "@server/auth/Logout";
import { useGetSinglePatientDetailByOid } from "@server/patient/getSinglePatientDetail";
import { PRIMARY_COLOR } from "@utils/color";
import Select from "react-select";
import { useQueryClient } from "@tanstack/react-query";

import { useColors } from "@utils/tenant_configuration";



type Data = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  product_code: string;
  base_rate: number;
};
type ISelector = {
  data: Data[];
  onChange?: (e: any) => void;
  isLoading?: boolean;
};

type IBookingProps = {
  selectedvalue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  hasSelected: boolean;
  setHasSelected: React.Dispatch<React.SetStateAction<boolean>>;
  activeButton: boolean;
  setActiveButton: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  label?: string;
  listPrescriber?: IListPrescriber;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: () => void;
};

const Booking: FunctionComponent<IBookingProps> = ({
  selectedvalue,
  setSelectedValue,
  hasSelected,
  setHasSelected,
  activeButton,
  title = "Book a Nurse",
  label = "Available Nurses",
  listPrescriber,
  handleSubmit,
}: IBookingProps) => {
  const { primaryColor, primaryLightColor } = useColors();

  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useGetgetNursesWithRespectToTenant();
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const path = location.pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const patientOid = searchParams.get("patient_oid");
  const profileContext = useProfile();

  /* The line `const patientDetail = useGetPAtientDtailByOID(patientOid) as IPatientDetailsBYOid;` is
  calling a custom hook `useGetPAtientDtailByOID` and assigning the returned value to the
  `patientDetail` variable. */
  const patientDetail = useGetSinglePatientDetailByOid(
    patientOid
  ) as IPatientDetailsBYOid;
  /* The line `const pescribers = listPrescriber?.data as IPrescriberData[] || []` is declaring a
variable `pescribers` and assigning it a value. */
  const pescribers = (listPrescriber?.data as IPrescriberData[]) || [];

  const switchByPath = () => {
    switch (path) {
      case "/book-consultation":
        break;
      case "/survey":
        handleSubmit();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (activeButton) {
      switchByPath();
    }
  }, [path, activeButton]);

  function getData(data: any) {
    if (data.length > 0) {
      return data?.map((group: any) => ({
        label: group.first_name + " " + group.last_name,
        value: group.booking_id,
        id: group.id,
      }));
    }
    return [];
  }

  function chooseDataToRender() {
    if (path === "/dashboard" || path === "/book-consultation") {
      return getData(data);
    } else if (path === "/logout") {
      logout({ navigate }).finally(() => {
        queryClient.clear();
      });
      return [];
    } else {
      return getData(pescribers);
    }
  }

  const opts = chooseDataToRender();

  const groupedOptions = opts ?? [];

  /**
   * The function `switchToGetNameAndEmail` returns an object containing the name and email based on
   * different conditions.
   * @returns The function `switchToGetNameAndEmail` returns an object with the properties `name` and
   * `email`. The values of these properties depend on the conditions in the if-else statements.
   */
  function switchToGetNameAndEmail() {
    const paths = ["/dashboard", "/book-consultation"];
    if (paths.includes(path)) {
      return {
        name:
          profileContext?.profile?.first_name +
          " " +
          profileContext?.profile?.last_name,
        email: profileContext?.profile?.email,
      };
    } else if (path === "/nurse/consultation/") {
      return {
        name:
          patientDetail?.data?.first_name +
          " " +
          patientDetail?.data?.last_name,
        email: patientDetail?.data?.email,
      };
    } else {
      return {
        name: `${patientDetail?.data?.first_name} ${patientDetail?.data?.last_name}`,
        email: patientDetail?.data?.email,
      };
    }
  }
  const getNameAndEmail = switchToGetNameAndEmail();

  /**
   * The function `handleSelectChange` updates the selected value, checks if a valid option is selected,
   * increments a counter, and sets the link ready status to false.
   * @param e - The parameter "e" is an event object that represents the event that triggered the
   * function. In this case, it is likely an event object from a select element's onChange event.
   */

  const styyler = {
    width: "50%",
    // marginLeft: "auto",
    // marginRight: "auto",
    marginBottom: "3rem",
  };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          // `data` is properties for the event.
          // `type` is the name of the action
          // `namespace` is the Cal namespace for which the event is fired

          const { data, type, namespace } = e.detail;
          // if (data.confirmed) {
          //   setActiveButton(true);
          //   setLoading(true);
          // }
        },
      });
    })();
  }, []);

  return (
    <>
      <div
        className={
          path === "/book-consultation" ? "book-a-nurse mb-5" : "book-a-nurse"
        }
      >
        {title}
      </div>
      <div
        className={`input ${path === "/book-consultation" ? "book-consultation-nurse" : ""}`}
      >
        <div className="available-nurse text-start">{label}</div>
        {/* <select
          id="booking_select"
          className="select form-select"
          onChange={
            (e) => handleSelectChange(e)
          }
          data-cal-config={`{ "name": "${getNameAndEmail.name}", "email": "${getNameAndEmail.email}" }`}
          data-cal-link={hasSelected ? selectedvalue : ""}
        >
          <option className="" value='Select one...'>
            Select one...
          </option>
          {path === "/dashboard" || path === "/book-consultation" ? (
            Array.isArray(data) &&
            data.map((item) => (
              <option
                key={item.id}
                value={item.booking_id}
              >
                {item.first_name} {item.last_name}
              </option>
            ))
          ) : Array.isArray(pescribers) && !listPrescriber.isLoading &&
          listPrescriber.data.map((item) => (
            <option key={item.id} value={item.booking_id}
            >
              {item.first_name} {item.last_name}
            </option>
          ))}
        </select> */}
        <Select
          className="basic-single w-full"
          classNamePrefix="select"
          isDisabled={isDisabled}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={groupedOptions}
          placeholder="Select one..."
          onChange={(e: any) => {
            switch (e?.value) {
              case "Select one...":
                setHasSelected(false);
                break;
              case null:
                setHasSelected(false);
                break;
              case undefined:
                setHasSelected(false);
                break;
              case "":
                setHasSelected(false);
                break;
              default:
                setHasSelected(true);
                break;
            }
            setSelectedValue(e?.value);
          }}
          styles={{
            control: (base, state) => ({
              ...base,

              height: "60px",
              borderColor: primaryColor,
              boxShadow: "none",
              backgroundColor: "#fff",
              svg: {
                fill: primaryColor,
                height: "15px",
              },

              "&:hover": {
                borderColor: "none",
                boxShadow: "none",
              },
            }),
            option: (base, state) => ({
              ...base,
              color: "#000",
              backgroundColor: "#fff",
              width: "100%",
              "&:hover": {
                backgroundColor: "var(--bs-primary-500)",
                color: "#fff",
              },
            }),
          }}
        />

        {hasSelected && (
          <div className="w-full">
            <button
              style={{
                height: "48px",
                width: "100%",
                marginTop: "1rem",
                backgroundColor: `${primaryColor}`,

                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "Nunito Sans",
                cursor: "pointer",
              }}
              className="btn btn-primary w-full"
              data-cal-config={`{ "name": "${getNameAndEmail.name}", "email": "${getNameAndEmail.email}" }`}
              data-cal-link={selectedvalue}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Booking;
