import logout from "@server/auth/Logout";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function LogoutModal() {
  const navigate = useNavigate();
  const client = useQueryClient();

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

  const onLogoutClick = () => {
    client.clear();
    logout({ navigate });
  };
  return (
    <>
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
        Are you sure you want to logout from this
        <br />
        account?
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
          onClick={onLogoutClick}
          className="btn w-full "
          style={btnStyles2}
          data-bs-dismiss="modal"
        >
          Logout
        </button>
      </div>
    </>
  );
}
