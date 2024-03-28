import { toast } from "react-hot-toast";

type IToaster = {
  status: "success" | "error" | "warning";
  message: string;
};

export function Toaster({ status, message }: IToaster) {
  switch (status) {
    case "success":
      toast.dismiss();
      toast.success(message, {
        style: {
          border: "3px solid #4D6D68",
          padding: "16px",
          color: "black",
          zIndex: "1060",
        },
        iconTheme: {
          primary: "#4D6D68",
          secondary: "#FFFAEE",
        },
        duration: 5000,
      });
      break;
    case "error":
      toast.dismiss();
      toast.error(message, {
        style: {
          border: "2px solid #FF4B4B",
          padding: "16px",
          color: "black",
          zIndex: "1060",
        },
        iconTheme: {
          primary: "#FF4B4B",
          secondary: "#FFFAEE",
        },
        duration: 5000,
      });
      break;
    case "warning":
      toast.dismiss();
      toast(message, {
        style: {
          border: "2px solid #FFC107",
          padding: "16px",
          color: "black",
          zIndex: "1060",
        },
        iconTheme: {
          primary: "#FFC107",
          secondary: "#FFFAEE",
        },
        duration: 5000,
      });
      break;

    default:
      throw new Error("Invalid status");
  }
}
