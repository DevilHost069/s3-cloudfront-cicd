import CustomCard from "@components/Card";
import { IPrescriberConsulationDetail } from "@server/prescriber/useGetSingleDetailResponseOfPrescriberConsulation";

type IDetailAction = {
  details: IPrescriberConsulationDetail;
};

export default function RejectionDetail({ details }: IDetailAction) {
  const { reject_reason } = details;
  return (
    <>
      <CustomCard title={"Rejection Details"}>
        <div className="row w-full">
          <div className="col-12 w-full">
            <div className="d-flex mb-2 flex-column">
              <div className="card-item-titled text-gray-500 me-2">
                Rejection Reson:
              </div>
              <div className="card-item-value text-gray-950">
                {reject_reason}
              </div>
            </div>
          </div>
        </div>
        {/* END OF DETAIL AND SECTION */}
      </CustomCard>
    </>
  );
}
