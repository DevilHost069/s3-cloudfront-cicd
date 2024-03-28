import { ISignUpFormValues } from "@shared/types/Auth";
import { axiosInstance } from "../../axiosInstance";

import { Toaster } from "@components/shared/Toaster";
import { IQuestionnaire } from "@shared/types/Questionnaire";
import { getStorage, scrollToTop } from "@utils/helper";
import login from "./Login";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IQuestionnaireProps } from "@components/GetStartedForm/Questionnaire-Booking/Questionnaire";
import { queryKeys } from "@shared/queryKeys";

export default async function postQuestionnaire(
  body: any,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  navigate?: any,
): Promise<void> {
  try {
    // const { data, status } = await axiosInstance({
    //   method: "POST",
    //   url: "/api/patient/response/",
    //   data: body,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    const { data, status } = await axiosInstance.post(
      `/api/patient/response/`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (status === 200) {
      localStorage.setItem("alert", "true");
      localStorage.removeItem("pid");
      localStorage.removeItem("user");
    }
  } catch (error: any) {
    Toaster({
      status: "error",
      message: "Something went wrong, please try again",
    });
    throw error;
  }
}

// export function usepostQuestionnaire() {
//   const queryClient = useQueryClient();
//   const { isError, isPending, isSuccess, mutate, error } = useMutation({
//     onMutate: async (body: any) => postQuestionnaire(body),
//     onSettled: () => {
//       queryClient.clear();
//       window.location.href = "/dashboard";
//     },
//   });
//   return {
//     isError,
//     isPending,
//     isSuccess,
//     mutate,
//     error,
//   };
// }

export function usepostQuestionnaire() {
  const fallback: any = undefined;
  const {
    data = fallback,
    isError,
    mutate,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: [queryKeys.screeningQuestions],
    mutationFn: (body: any) => postQuestionnaire(body),
    onSettled: () => {},
  });
  return { data, isError, mutate, isPending, isSuccess };
}
