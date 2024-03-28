import ReactQuill from "react-quill";

export const formats = [
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "link",
];

export const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};
