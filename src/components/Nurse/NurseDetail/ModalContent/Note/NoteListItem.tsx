import { ThreeDotsVertical } from "@assets/index";
import { INoteData } from "@server/Nurse/Nurse-Consulation/Note/List";
import { extractContent, extractDateTimeToTime } from "@utils/helper";
import parse from "html-react-parser";
import { MouseEventHandler, useEffect, useState } from "react";
import clip from "text-clipper";

type IProps = {
  item: INoteData;
  onClickThreeDots: (oid: string) => void;
  onEditClick: (oid: string) => void;
  onDeleteClick: MouseEventHandler<HTMLAnchorElement>;
  noteOwnerShip?: string;
  updatesAllowed: boolean;
};
const NoteListItem = ({
  item,
  onClickThreeDots,
  onEditClick,
  onDeleteClick,
  noteOwnerShip = "Self",
  updatesAllowed = true,
}: IProps) => {
  const [expanded, setExpanded] = useState(false);
  const [expandable, setExpandable] = useState(false);
  const [titleExpandable, setTitleExpandable] = useState(false);
  const [note_body, setNote_body] = useState("");
  const [note_title, setNote_title] = useState("");
  useEffect(() => {
    if (item.note_body) {
      if (extractContent(item.note_body).length > 200) {
        setExpandable(true);
        setNote_body(clip(item.note_body, 200, { html: true, maxLines: 5 }));
      }
    }
    if (item.note_title) {
      if (item.note_title.length > 100) {
        setTitleExpandable(true);
        setNote_title(
          clip(
            `<span
            style='
              font-size: 14px;
              font-weight: 600;
              color: #030712;
              overflow-wrap: break-word;
            '
          >${item.note_title}
          </span>`,
            50,
            { html: true, maxLines: 2 },
          ),
        );
      }
    }
  }, [item.note_body, item.note_title]);

  return (
    <li
      className={`list-group-item mx-4${noteOwnerShip !== "Self" ? " bg-warning-50" : ""
        }`}
      key={item.oid}
      style={{
        // padding: 10px 16px;
        padding: "10px 16px",
        border: "none",
        borderRadius: "3px",
        background: "var(--Neutal-White, #FFF)",
        boxShadow:
          "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="row">
        <div className="col-10">
          <div>
            <span
              className="text-gray-950 "
              style={{
                fontSize: "16px",
                fontWeight: "900",
                color: "#030712",
                overflowWrap: "break-word",
              }}
              dangerouslySetInnerHTML={{
                __html: titleExpandable
                  ? expanded
                    ? item.note_title
                    : note_title
                  : item.note_title,
              }}
            ></span>
            {/* {item.note_title} */}
          </div>
          <span
            className="note-body"
            style={{
              color: "#374151",
              fontSize: "14px",
              fontWeight: "400",
              overflowWrap: "break-word",
            }}
            dangerouslySetInnerHTML={{
              __html: expandable
                ? expanded
                  ? item.note_body
                  : note_body
                : item.note_body,
            }}
          ></span>
          {expandable || titleExpandable ? (
            <span
              className="text-decoration-underline cursor-pointer ms-2"
              onClick={() => {
                setExpanded((expanded) => !expanded);
              }}
            >
              View {expanded ? "less" : "more"}
            </span>
          ) : (
            ""
          )}
        </div>

        {noteOwnerShip === "Self" && updatesAllowed ? (
          <div
            className="col-2"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <img
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              src={ThreeDotsVertical}
              alt="placeholder"
              style={{
                height: "18px",
                width: "18px",
                cursor: "pointer",
              }}
              onClick={() => onClickThreeDots(item.oid)}
            />
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                  onClick={() => onEditClick(item.oid)}
                  className="dropdown-item"
                  href="#"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  onClick={onDeleteClick}
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                  className="dropdown-item"
                  href="#"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="row mt-2">
        <div className="col-12 d-flex justify-content-between">
          <span
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "#6B7280",
            }}
          >
            {extractDateTimeToTime(item?.created_at)}
          </span>
          {noteOwnerShip !== "Self" ? (
            <span
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#6B7280",
              }}
            >
              Added by {noteOwnerShip}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </li>
  );
};

export default NoteListItem;
