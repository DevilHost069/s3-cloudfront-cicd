/* The `componentName` constant is an object that defines key-value pairs. Each key represents a
component name, and the corresponding value is a string that represents the name of the component.
In this case, the keys are `PersonalInformation`, `Credentials`, `Questionnaire`, and `Review`, and
the values are the same as the keys. This object can be used to reference the component names in
other parts of the code. */
const componentName = {
  PersonalInformation: "PersonalInformation",
  Credentials: "Credentials",
  Questionnaire: "Questionnaire",
  Review: "Review",
};

/* The `steps` constant is an array of objects. Each object represents a step in a process or a
sequence of actions. Each object has properties such as `id`, `name`, `label`, and `url`. */
const steps = [
  {
    id: 1,
    name: componentName.PersonalInformation,
    label: "Personal Information",
    url: "/personal-information",
  },
  {
    id: 2,
    name: componentName.Credentials,
    label: "Credentials",
    url: "/credentials",
  },
  {
    id: 3,
    name: componentName.Questionnaire,
    label: "Questionnaire",
    url: "/questionnaire",
  },
  {
    id: 4,
    name: componentName.Review,
    label: "Review",
    url: "/review",
  },
];

export { componentName, steps };
