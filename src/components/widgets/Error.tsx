type IErrorText = {
  message: string;
  extraClasses?: string;
};

export default function ErrorText({ message, extraClasses = "" }: IErrorText) {
  return (
    <p
      className={`small text-danger text-start${extraClasses ? " " + extraClasses : " mb-0 pb-lg-2"}`}
    >
      {message}
    </p>
  );
}
