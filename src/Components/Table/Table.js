import React, { useState, useEffect } from "react";
import useTable from "./useTable";
import styles from "../../Assets/Style/Table/Table.module.css";
import TableFooter from "./TableFooter";
import { searchData, sortData } from "../../features/DataTable";

const Table = ({ data, rowsPerPage }) => {
    const [page, setPage] = useState(1);
    const [sortConfig, setSortConfig] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { slice, range } = useTable(data, page, rowsPerPage);
  
    useEffect(() => {
      setPage(1);
    }, [searchQuery]);
  
    const handleSort = (key) => {
      let direction = "ascending";
      if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };
  
    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const sortedData = sortData(slice, sortConfig);
    const searchedData = searchData(sortedData, searchQuery);
  
    const renderTableRows = () => {
      return searchedData.map((el) => (
        <tr className={styles.tableRowItems} key={el.id}>
          <td className={styles.tableCell}>{el.title}</td>
          <td className={styles.tableCell}>{el.capital}</td>
          <td className={styles.tableCell}>{el.language}</td>
        </tr>
      ));
    };
  
    return (
      <>
        <div className={styles.tableHeader}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
        <table className={styles.table}>
          <thead className={styles.tableRowHeader}>
            <tr>
              <th
                className={styles.tableHeader}
                onClick={() => handleSort("title")}
              >
                Country
                {sortConfig && sortConfig.key === "title" && (
                  <span className={styles.sortArrow}>
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                className={styles.tableHeader}
                onClick={() => handleSort("capital")}
              >
                Capital
                {sortConfig && sortConfig.key === "capital" && (
                  <span className={styles.sortArrow}>
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
              <th
                className={styles.tableHeader}
                onClick={() => handleSort("language")}
              >
                Language
                {sortConfig && sortConfig.key === "language" && (
                  <span className={styles.sortArrow}>
                    {sortConfig.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      </>
    );
  };

export default React.memo(Table);
