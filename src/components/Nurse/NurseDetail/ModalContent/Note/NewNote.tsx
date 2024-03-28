import Button from "@components/widgets/Button";
import ErrorText from "@components/widgets/Error";
import TextInput from "@components/widgets/TextInput";
import { usePostNote } from "@server/Nurse/Nurse-Consulation/Note/create";
import { formats, modules } from "@shared/data/quillConfig";
import { useFormik } from "formik";
import { useState } from "react";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";
import { useColors } from "@utils/tenant_configuration";


import "react-quill/dist/quill.snow.css";
import "@assets/css/notes.css";

type IProps = {
  state?: string;
  getNote: any;
  update: any;
};

const initialValue = {
  note_title: "",
  note_body: "<p><br></p>",
  consultation_id: "",
};
export default function NewNote({ state, getNote, update }: IProps) {
  const [dismiss, setDismiss] = useState("");
  const params = new URLSearchParams(window.location.search);
  const cId = params.get("c_id");

  /* `const create = usePostNote();` is creating a variable `create` that is assigned the result of
  calling the `usePostNote` hook. The `usePostNote` hook is likely a custom hook that handles the
  logic for making a POST request to create a new note. The `create` variable can then be used to
  call the `mutate` function to initiate the POST request. */
  const create = usePostNote();

  /* The code `const validateNotesSchema = Yup.object().shape({ note_title:
  Yup.string().required("Title is required"), });` is defining a validation schema using Yup. */
  const validateNotesSchema = Yup.object().shape({
    note_title: Yup.string().required("Title is required"),
  });

  const updateInititalValue = {
    note_title: getNote.data?.note_title,
    note_body: getNote.data?.note_body,
    consultation_id: getNote.data?.consultation_id,
  };

  /**
   * The function `validatenoteTitle` checks if a given value is empty or not.
   * @param {string} value - The "value" parameter is a string that represents the title of a note.
   * @returns true if the value is falsy (empty string, null, undefined, etc.), and false otherwise.
   */
  const validatenoteTitle = (value: string) => {
    if (!value) {
      return true;
    }
    return false;
  };

  /* The code `const formik = useFormik({ ... })` is using the `useFormik` hook from the Formik library
  to create a formik instance. The formik instance is responsible for managing the form state,
  handling form submission, and providing helper functions and values to interact with the form. */
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validateNotesSchema,
    initialValues: state === "Edit Notes" ? updateInititalValue : initialValue,
    onSubmit: (values, reset) => {
      if (state === "Edit Notes") {
        update.mutate(values);
      } else {
        create.mutate({
          note_title: values.note_title,
          note_body: values.note_body,
          consultation_id: cId,
        });
        reset.resetForm();
      }
    },
  });

  /* The line `const validate = validatenoteTitle(formik.values.note_title);` is calling the
  `validatenoteTitle` function and passing the value of `formik.values.note_title` as an argument.
  The `validatenoteTitle` function checks if the value is empty or not and returns `true` if the
  value is empty, and `false` otherwise. The `validate` variable will hold the result of this
  validation check. */
  const validate = validatenoteTitle(formik.values.note_title);

  /**
   * The function `handleProcedureContentChange` updates the value of a field in a Formik form with the
   * content of a text editor.
   * @param content - The current content of the editor.
   * @param delta - The "delta" parameter represents the changes made to the content. It is an object
   * that contains information about the changes, such as the text that was added or removed.
   * @param source - The "source" parameter in the handleProcedureContentChange function refers to the
   * source of the change in the editor. It can be one of the following values:
   * @param editor - The `editor` parameter refers to the editor instance that triggered the content
   * change. It can be used to access various methods and properties of the editor, such as getting the
   * current selection, applying formatting, or retrieving the editor's content.
   */
  const handleProcedureContentChange = (content, delta, source, editor) => {
    formik.setFieldValue("note_body", content);
  };
  const { primaryColor, primaryLightColor } = useColors();

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div
          className="input"
          style={{
            marginBottom: "32px",
          }}
        >
          <div className="label_name">
            Title <strong className="asteriek">*</strong>
          </div>
          <div
            className={
              formik.touched.note_title && formik.errors.note_title
                ? " input_wrapper-outline-error"
                : "input_wrapper"
            }
          >
            <TextInput
              className="input_wrapper-outline"
              placeholder="Enter your Title"
              formik={formik.getFieldProps("note_title")}
              value={formik.values.note_title}
              onChange={
                formik.handleChange as (
                  e: React.ChangeEvent<HTMLInputElement>,
                ) => void
              }
            />
          </div>

          {formik.errors.note_title ||
          (formik.touched.note_title && formik.errors.note_title) ||
          validate ? (
            <ErrorText message={formik.errors.note_title as string} />
          ) : null}
        </div>
        <div className="input w-full">
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Type text here ..."
            value={formik.values.note_body}
            onChange={handleProcedureContentChange}
            style={{
              height: "200px",
              borderRadius: "5px",
              marginBottom: "32px",
              border: "1px red",
              width: "100%",
              textAlign: "left",
              // placeholder
            }}
          />
        </div>
        <Button
          id=""
          button={state === "Edit Notes" ? "Save Changes" : "Add"}
          type="submit"
          className="btn"
          dataBsDismiss={validate ? "" : "modal"}
          disabled={validate}
          style={{
            height: "48px",
            width: "100%",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
            marginTop: "40px",
            backgroundColor: validate
              ? `${primaryLightColor}`
              : `${primaryColor}`,
          }}
        />
      </form>
    </>
  );
}
