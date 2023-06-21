import { useMemo } from "react";

const useTable = (data, page, rowsPerPage) => {
  const startIndex = useMemo(() => (page - 1) * rowsPerPage, [page, rowsPerPage]);

  const endIndex = startIndex + rowsPerPage;
  const slice = useMemo(() => data.slice(startIndex, endIndex), [data, startIndex, endIndex]);

  const totalPages = useMemo(() => Math.ceil(data.length / rowsPerPage), [data.length, rowsPerPage]);
  const range = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

  return { slice, range };
};

export default useTable;
