import { Plus } from "@assets/index";
import CustomCard from "@components/Card";

type IProps = {
  setTitle: (title: string) => void;
  setModalContent: (content: string) => void;
};
export default function PatientDocument({ setTitle, setModalContent }: IProps) {
  const openCloseModal = () => {
    setTitle("Patient Documents");
    setModalContent("patient_document");
  };
  return (
    <>
      <CustomCard
        title={"Patient Documents"}
        src={Plus}
        onClick={openCloseModal}
      >
        <p className="text-gray-500">Hello Nurse</p>
      </CustomCard>
    </>
  );
}
