import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ResultsTable({ cols, rows }) {
  const [styles, setStyles] = useState({});

  useEffect(() => {
    if (rows && rows[0]) {
      const fieldStyles = {};

      console.log("row0: ", rows[0]);

      Object.keys(rows[0]).forEach(field => {
        if (typeof rows[0][field] === "number") {
          fieldStyles[field] = { textAlign: "right" };
        }
      });

      setStyles(fieldStyles);
    }
  }, [rows]);

  if (rows.length === 0) {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Run a query to get results</h3>
      </div>
    );
  }

  return (
    <table className="table table-bordered table-hover table-sm">
      <thead>
        <tr>
          {cols.map((col, idx) => (
            <th key={idx}>
              <div className="table-header">{col}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {cols.map((col, cIdx) => (
              <td style={styles[col]} key={cIdx}>
                {row[col] === null ? (
                  <span className="null">NULL</span>
                ) : (
                  row[col]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ResultsTable.propTypes = {
  rows: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired
};

export default ResultsTable;
