import * as Yup from "yup";

export type IChangePassword = {
  old_password: string;
  password: string;
  password_confirm: string;
};

export type ISignUpFormValues = {
  first_name: string;
  last_name: string;
  phone_number: string;
  medicare_number: string;
  dob: string | null | undefined;
  gender: string;
  address: string;
  email: string;
  password: string;
  confirm_password: string;
  signed_consent_form_id: number;
  onboarding_status: string;
  health_identifier: string;
  auto_location?: boolean;
  is_qualified?: boolean;
};

export type ILoginValues = {
  username: string;
  password: string;
};

export const passwordChangeSchema = Yup.object().shape({
  old_password: Yup.string().required("Old Password is required."),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Password must be at least 8 characters long with at least one number and one special character."
    )
    .required("Password is required.")
    .notOneOf(
      [Yup.ref("old_password")],
      "New Password must be different from Old Password."
    ),
  password_confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Password Missmatched.")
    .required("Confirm Password is required."),
});

/* The `signUpSchema` is a validation schema defined using the Yup library. It is used to define the
validation rules for the sign-up form fields. */
export const signUpSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  // phone nuber must have only numbers with +, - () and spaces allowed
  phone_number: Yup.string()
    .matches(/^[\d\s()+-]+$/, "The number you have entered is not valid")
    .required("Phone Number is required")
    .max(20, "The number you have entered is not valid")
    .min(10, "The number you have entered is not valid"),
  // medicare_number: Yup.string().min(10, "Medicare Number must be 10 digits"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  // dob not required as it is not required in the database but if it is entered it must be a valid date format YYYY-MM-DD
  dob: Yup.date()
    .nullable()
    .test("dob", "Date of Birth cannot be in the future.", (value) => {
      if (value) {
        const date = new Date(value);
        const currentDate = new Date();
        if (date > currentDate) {
          return false;
        }
      }
      return true;
    })
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      "You must be at least 18 years old or above."
    )
    .typeError("Date of Birth is required"),
  password: Yup.string()
    .matches(
      // must be at least 8 characters long or more with at least one number and one special character can be any special character from the list
      //  !@#$%^&*()_+{}|:<>?[]\;',./`~  and can be any number
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Password must be at least 8 characters long with at least one number and one special character"
    )
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Password Missmatched.")
    .required("Confirm Password is required"),
  // must be 16 digits of numbers
  // health_identifier: Yup.string()
  //   .nullable()
  //   .matches(/^[0-9]{16}$/, "Health Identifier must be 16 digits of numbers")
  //   .min(16, "Health Identifier must be 16 digits of numbers"),
});

/* The code `export const loginSchema = Yup.object().shape({ ... })` is defining a validation schema
for the login form fields using the Yup library. */
export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const validateFirstStep = (values: any) => {
  const errors: any = {};
  if (!values.first_name) {
    errors.first_name = "Required";
  } else if (values.first_name.length > 15) {
    errors.first_name = "Must be 15 characters or less";
  }

  if (!values.last_name) {
    errors.last_name = "Required";
  } else if (values.last_name.length > 20) {
    errors.last_name = "Must be 20 characters or less";
  }

  if (!values.phone_number) {
    errors.phone_number = "Required";
  } else if (values.phone_number.length > 20) {
    errors.phone_number = "Must be 20 characters or less";
  } else if (values.phone_number.length < 10) {
    errors.phone_number = "Must be 10 characters or more";
  }
  // if (values.medicare_number || values.medicare_number !== undefined) {
  //   if (values.medicare_number.length < 10) {
  //     errors.medicare_number = "Must be 11 characters or less";
  //   }
  // }

  // if (values.health_identifier || values.health_identifier !== undefined) {
  //   if (values.health_identifier.length < 16) {
  //     errors.health_identifier = "Must be 16 characters or less";
  //   }
  // }

  // dob is not required as it is not required in the database but if it is entered it must be a valid date format YYYY-MM-DD
  if (values.dob) {
    // check if dob is in format of mm/dd/yyyy
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (dateRegex.test(values.dob)) {
      errors.dob = "Date of Birth must be in format YYYY-MM-DD";
    }
  }
  // check if dob is in the future
  if (values.dob) {
    const date = new Date(values.dob);
    const currentDate = new Date();
    if (date > currentDate) {
      errors.dob = "Date of Birth cannot be in the future";
    }
  }
  // check if dob is 18 years or older
  if (values.dob) {
    const date = new Date(values.dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - date.getFullYear();
    if (age < 18) {
      errors.dob = "You must be at least 18 years old or above";
    }
  }

  return errors;
};

export const validateSecondStep = (values: any) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be 8 characters long.";
  } else if (!/(?=.*[0-9])/.test(values.password)) {
    errors.password = "Password must contain a number.";
  } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
    errors.password = "Password must contain a special character.";
  } else if (!/(?=.*[A-Z])/.test(values.password)) {
    errors.password = "Password must contain an uppercase letter.";
  } else if (!/(?=.*[a-z])/.test(values.password)) {
    errors.password = "Password must contain a lowercase letter.";
  }
  if (!values.confirm_password) {
    errors.confirm_password = "Required";
  } else if (values.confirm_password !== values.password) {
    errors.confirm_password = "Passwords must match.";
  }
};
