import { Null, Plus, Times } from "@assets/index";
import { INoteList } from "./main";
import NoteListItem from "./ModalContent/Note/NoteListItem";
import { reverseArr } from "@utils/helper";
import SVG from "react-inlinesvg";

type IProps = {
  setTitle: (title: string) => void;
  setModalContent: (content: string) => void;
  notes: INoteList;
  getNote: any;
  setNoteOid: (oid: string) => void;
  updatesAllowed?: boolean;
  setShowMobileNotes: (value: boolean) => void;
};

export default function NotesAndReminder({
  setTitle,
  setModalContent,
  notes,
  getNote,
  setNoteOid,
  updatesAllowed = true,
  setShowMobileNotes,
}: IProps) {
  const { data } = notes;

  /**
   * The function "openCloseModal" sets the title to "Add Notes" and the modal content to
   * "notes_and_reminder".
   */
  const openCloseModal = () => {
    setTitle("Add Notes");
    setModalContent("notes_and_reminder");
  };

  /* The `onClickThreeDots` function is triggered when the user clicks on the three dots icon next to
  a note. It sets the title of the modal to "Edit Notes", sets the modal content to
  "notes_and_reminder", and sets the note OID (identifier) to the `oid` parameter passed to the
  function. This function is used to handle the action of editing a note when the user selects the
  "Edit" option from the dropdown menu. */
  const onClickThreeDots = (oid: string) => {
    setTitle("Edit Notes");
    setModalContent("notes_and_reminder");
    setNoteOid(oid);
  };

  /**
   * The function `onEditClick` sets the title and modal content, and then calls the `getNote` function
   * with the provided `oid` parameter.
   * @param {string} oid - The parameter "oid" is a string that represents the identifier of a note.
   */
  const onEditClick = (oid: string) => {
    setTitle("Edit Notes");
    setModalContent("notes_and_reminder");
    getNote.mutate(oid);
  };

  /**
   * The function `onDeleteClick` sets the title and modal content for deleting notes.
   */
  const onDeleteClick = () => {
    setTitle("Delete Notes?");
    setModalContent("notes_and_reminder_delete");
  };
  return (
    <>
      <div
        className="bg-white text-primary-500 mb-4"
        style={{
          display: "flex",
          padding: "10px 20px",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <div className=" w-100 d-flex justify-content-between align-items-center">
          <span className="card-title"> {"Notes & Reminders"}</span>
          <div className="d-flex justify-content-end align-items-center">
            {(data?.nurse_notes?.length > 0 ||
              data?.prescriber_notes?.length > 0) &&
              updatesAllowed && (
                <>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={openCloseModal}
                    className="detail-button primary-button flex-grow-1"
                    style={{
                      width: "45%",
                      lineHeight: "1",
                    }}
                  >
                    <img src={Plus} alt="placeholder" />
                    Add Notes
                  </button>
                </>
              )}
            <SVG
              className="text-gray-800 ms-2 d-block d-md-none"
              height={32}
              width={32}
              src={Times}
              onClick={() => setShowMobileNotes(false)}
            />
          </div>
        </div>
      </div>

      <div className="card-body">
        {data?.nurse_notes?.length > 0 || data?.prescriber_notes?.length > 0 ? (
          <>
            <div className="row">
              <div className="col-12">
                <ul className="list-group gap-3">
                  {reverseArr(data?.nurse_notes)?.map((item, index) => (
                    <NoteListItem
                      item={item}
                      onDeleteClick={onDeleteClick}
                      onClickThreeDots={onClickThreeDots}
                      onEditClick={onEditClick}
                      key={index}
                      noteOwnerShip={item.note_ownership == "Nurse"?"Self": "Prescriber"}
                      updatesAllowed={updatesAllowed}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="row">
              <div className="col-12 img-div">
                <img src={Null} alt="placeholder" />
                <p className="text-gray-500 text-center">No Notes Added</p>
                {updatesAllowed ? (
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={openCloseModal}
                    className="detail-button primary-button"
                  >
                    <img src={Plus} alt="placeholder" />
                    Add Notes
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
