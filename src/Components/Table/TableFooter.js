import React, { useEffect } from "react";
import styles from "../../Assets/Style/Table/TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice }) => {
    useEffect(() => {
      if (slice.length < 1 && page !== 1) {
        setPage(page - 1);
      }
    }, [slice, page, setPage]);
  
    const maxVisiblePages = 5; // Set the maximum number of visible pages
  
    const renderPageButtons = () => {
      const totalPages = range.length;
      const visiblePages = Math.min(maxVisiblePages, totalPages);
      const middlePage = Math.ceil(visiblePages / 2);
      const startPage = Math.max(1, page - middlePage + 1);
      const endPage = Math.min(startPage + visiblePages - 1, totalPages);
  
      const buttons = [];
      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            className={`${styles.button} ${
              page === i ? styles.activeButton : styles.inactiveButton
            }`}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        );
      }
  
      return buttons;
    };
  
    return <div className={styles.tableFooter}>{renderPageButtons()}</div>;
  };
  

export default React.memo(TableFooter);
