import React, { useState, useEffect, useContext } from "react";

import QueryEditor from "../components/QueryEditor";

import StatusContext from "../StatusContext";

function QueryView({ connection }) {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const statusContext = useContext(StatusContext);

  const runQuery = (query) => {
    statusContext.setStatus("Running query...");
    window.ipc.invoke("query", query).then(res => {
      if (res.length > 0) {
        statusContext.setStatus(`${res.length} rows returned`);
        setCols(Object.keys(res[0]));
        setRows(res);
      }
    });
  };

  return (
    <div id="query-view">
      <div id="query-pane">
        <QueryEditor connection={connection} runQuery={runQuery} />
      </div>
      <div id="results-pane">
        {rows.length > 0 && (
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                {cols.map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  {cols.map((col, cIdx) => (
                    <td key={cIdx}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {rows.length === 0 && <h3>Run a query to get results</h3>}
      </div>
    </div>
  );
}

export default QueryView;
