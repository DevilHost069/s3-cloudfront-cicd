import { Plus } from "@assets/index";
import CustomCard from "@components/Card";
import { INurseConsulationDetails } from "./main";
import moment from "moment";

type IProps = {
  setTitle?: (title: string) => void;
  setModalContent?: (content: string) => void;
  prescriberDetail?: INurseConsulationDetails | undefined;
};
export default function ConsulationDetails({
  setTitle,
  setModalContent,
  prescriberDetail,
}: IProps) {
  const { data } = prescriberDetail;

  /**
   * The function `formatDateTime` takes a date string as input and returns a formatted date in the
   * format "DD/MM/YYYY" using the moment library. If the input date is empty or undefined, it
   * returns a dash ("-").
   * @param {string} date - A string representing a date in any valid format.
   * @returns the formatted date in the format "DD/MM/YYYY" if the input date is not empty. If the
   * input date is empty, it returns a dash ("-").
   */
  function formatDateTime(date: string) {
    if (date) {
      return moment(date).format("DD MMM, h:mm A");
    }
    return "-";
  }

  return (
    <>
      <CustomCard title={"Prescriber Consultation Details"}>
        <div className="row w-full mb-2">
          <div
            className="col-6  text-gray-500"
            style={{
              width: "205px",
              maxWidth: "205px",
            }}
          >
            Prescriber Name:
          </div>
          <div className="col-6 card-value text-gray-950">
            {data?.prescriber_consultation?.prescriber_full_name || "-"}
          </div>
        </div>
        <div className="row w-full mb-2">
          <div
            className="col-6 text-gray-500"
            style={{
              width: "205px",
              maxWidth: "205px",
            }}
          >
            Appointment Date/Time:
          </div>
          <div className="col-6 card-value text-gray-950">
            {formatDateTime(data?.prescriber_consultation?.start_time)}
          </div>
        </div>
      </CustomCard>
    </>
  );
}
