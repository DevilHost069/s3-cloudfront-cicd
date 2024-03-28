import { useSearchParams } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [urlParams, setUrlParams] = useSearchParams();
  const pageState = urlParams.get("page") as any;
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxButtonsToShow = 5; // Change this value to control the number of visible buttons

    if (totalPages <= maxButtonsToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        Number(pageState) - Math.floor(maxButtonsToShow / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li
            className={`page-item ${Number(pageState) === 1 ? "disabled" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              tabIndex={-1}
              aria-disabled={Number(pageState) === 1}
              onClick={() => {
                onPageChange(Number(pageState) - 1);
                setUrlParams((urlParams) => {
                  urlParams.set("page", String(pageState - 1));
                  return urlParams;
                });
              }}
            >
              Previous
            </a>
          </li>
          {generatePageNumbers().map((page) => (
            <li
              key={page}
              className={`page-item ${Number(pageState) === page ? "active" : ""}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => {
                  onPageChange(page);
                  setUrlParams((urlParams) => {
                    urlParams.set("page", String(page));
                    return urlParams;
                  });
                }}
              >
                {page}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${Number(pageState) === totalPages ? "disabled" : ""}`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => {
                onPageChange(Number(pageState) + 1);
                const conv = Number(pageState) + 1;
                setUrlParams((urlParams) => {
                  urlParams.set("page", String(conv));
                  return urlParams;
                });
              }}
              aria-disabled={Number(pageState) === totalPages}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
