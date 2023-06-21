export const customStyles = {
    rows: {
        style: {
            minHeight: '55px',
            background:'#e1e1e161',
        },
    },
    headCells: {
        style: {
            fontSize:'18px',
            fontWeight:'bold',
            width:'20',
        },
    },
    cells: {
        style: {
            fontSize:'16px',
        },
    },
};

export const sortData = (data, sortConfig) => {
    if (!sortConfig) {
      return data;
    }
  
    const { key, direction } = sortConfig;
  
    return [...data].sort((a, b) => {
      const valueA = a[key].toLowerCase();
      const valueB = b[key].toLowerCase();
  
      if (valueA < valueB) {
        return direction === "ascending" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };
  
  // Helper function to search the data
export const searchData = (data, query) => {
    if (!query) {
      return data;
    }
  
    const lowercasedQuery = query.toLowerCase();
  
    return data.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercasedQuery) 
        // item.capital.toLowerCase().includes(lowercasedQuery) ||
        // item.language.toLowerCase().includes(lowercasedQuery)
    );
  };
