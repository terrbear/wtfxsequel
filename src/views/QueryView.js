import React, { useState, useContext } from "react";

import QueryEditor from "../components/QueryEditor";
import ResultsTable from "../components/ResultsTable";

import StatusContext from "../StatusContext";

function QueryView({ connection }) {
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const status = useContext(StatusContext);

  const runQuery = query => {
    status.setStatus("Running query...");
    window.ipc
      .invoke("query", query)
      .then(res => {
        if (res.length > 0) {
          status.setStatus(`${res.length} rows returned`);
          setCols(Object.keys(res[0]));
          setRows(res);
        }
      })
      .catch(err => {
        console.log('err: ', err);
        status.setStatus(("" + err).replace("Error invoking remote method 'query': error ", ''));
      });
  };

  return (
    <div id="query-view">
      <div id="query-pane">
        <QueryEditor connection={connection} runQuery={runQuery} />
      </div>
      <div id="results-pane">
        <ResultsTable rows={rows} cols={cols} />
      </div>
    </div>
  );
}

export default QueryView;
