import Button from "@components/widgets/Button";
import ErrorText from "@components/widgets/Error";
import TextInput from "@components/widgets/TextInput";
import { formats, modules } from "@shared/data/quillConfig";
import { useFormik } from "formik";
import { useState } from "react";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from "@utils/color";

import { usePostNotePrescriber } from "@server/prescriber/Prescriber-Consultation/Note/create";
import "react-quill/dist/quill.snow.css";
import "@assets/css/notes.css";
import { useColors } from "@utils/tenant_configuration";


type IProps = {
  state?: string;
  getNote: any;
  update: any;
};

const initialValue = {
  note_title: "",
  note_body: "<p><br></p>",
  prescriber_consultation_id: "",
};
export default function NewNote({ state, getNote, update }: IProps) {
  const [dismiss, setDismiss] = useState("");
  const params = new URLSearchParams(window.location.search);
  const cId = params.get("c_id");

  const create = usePostNotePrescriber();

  const validateNotesSchema = Yup.object().shape({
    note_title: Yup.string().required("Title is required"),
  });

  const updateInititalValue = {
    note_title: getNote.data?.note_title,
    note_body: getNote.data?.note_body,
    prescriber_consultation_id: getNote.data?.prescriber_consultation_id,
  };

  const validatenoteTitle = (value: string) => {
    if (!value) {
      return true;
    }
    return false;
  };

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
          prescriber_consultation_id: cId,
        });
        reset.resetForm();
      }
    },
  });
  const validate = validatenoteTitle(formik.values.note_title);

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
