import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type Pagination = {
  data: any[];
  itemsPerPage?: number;
  isLoading?: boolean;
};

const usePagination = ({ data, itemsPerPage = 15, isLoading }: Pagination) => {
  const [paginatedData, setPaginatedData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // setcurrent page in urlParams
  const [urlParams, setUrlParams] = useSearchParams();

  useEffect(() => {
    const pageParams = urlParams.get("page");
    if (pageParams === null) {
      urlParams.set("page", "1");
      setUrlParams(urlParams);
    }
  }, [urlParams]);

  // compare data values to determine if data has changed and reset pagination
  useEffect(() => {
    if (data && data !== originalData && data.length > 0) {
      // setPaginatedData(data.slice(0, itemsPerPage));
      setOriginalData(data);
      setCurrentPage(1);
    }
  }, [data, originalData, itemsPerPage]);

  useEffect(() => {
    if (data && data.length > 0) {
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
  }, [data, itemsPerPage]);

  useEffect(() => {
    if (paginatedData.length === 0 && data && data.length > 0) {
      setPaginatedData(data.slice(0, itemsPerPage));
      setOriginalData(data);
    }
  }, [data, itemsPerPage]);
  useEffect(() => {
    const pageParams = urlParams.get("page");
    if (pageParams) {
      const page = parseInt(pageParams);
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setPaginatedData(originalData.slice(start, end));
    }
  }, [originalData, itemsPerPage]);

  const onPageChange = (page) => {
    setUrlParams((urlParams) => {
      urlParams.set("page", String(page));
      return urlParams;
    });
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPaginatedData(originalData.slice(start, end));
  };

  return {
    paginatedData,
    currentPage,
    totalPages,
    onPageChange,
  };
};

export default usePagination;
