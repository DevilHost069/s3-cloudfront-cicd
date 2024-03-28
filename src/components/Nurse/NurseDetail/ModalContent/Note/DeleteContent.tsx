type IProps = {
  noteOid: string;
  deleteNote: any;
  setNoteOid: any;
};

export default function DeleteContent({
  noteOid,
  deleteNote,
  setNoteOid,
}: IProps) {
  const btnStyles = {
    borderRadius: "4px",
    border: "1px solid var(--gray-500, #6B7280)",
    background: "var(--gray-50, #F9FAFB)",
    height: "48px",
  };

  const btnStyles2 = {
    borderRadius: "4px",
    border: "none",
    background: "#EF4444",
    height: "48px",
    width: "100%",
    color: "#fff",
  };

  const onDeleteClick = () => {
    deleteNote.mutate({
      oid: noteOid,
    });
    setNoteOid("");
  };
  return (
    <>
      <span className="text-center">
        <span
          className="me-2 me-md-0"
          style={{
            fontSize: "20px",
            lineHeight: "24px",
            color: "#374151",
            fontWeight: 600,
            marginBottom: ".5rem",
            textAlign: "center",
            alignContent: "center",
          }}
        >
          Are you sure you want to delete the
        </span>
        <br className="d-none d-md-block" />
        <span
          style={{
            fontSize: "20px",
            lineHeight: "24px",
            color: "#374151",
            fontWeight: 600,
            marginBottom: ".5rem",
            textAlign: "center",
            alignContent: "center",
          }}
        >
          existing note?
        </span>
      </span>
      <div className="d-flex justify-content-end">
        <button
          className="btn  me-2 w-full"
          style={btnStyles}
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
          onClick={onDeleteClick}
          className="btn w-full "
          style={btnStyles2}
          data-bs-dismiss="modal"
        >
          Yes
        </button>
      </div>
    </>
  );
}
