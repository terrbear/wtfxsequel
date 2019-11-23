import React, { useState } from "react";

const COMMAND = 91; // command key on mbp

function QueryView() {
  const [query, setQuery] = useState("");
  const [cols, setCols] = useState([]);
  const [rows, setRows] = useState([]);
  const [commandMode, setCommandMode] = useState(false);

  const runQuery = () => {
    window.ipc.invoke("query", query).then(res => {
      if (res.length > 0) {
        setCols(Object.keys(res[0]));
        setRows(res);
      }
    });
  };

  const COMMANDS = {
    ["T".charCodeAt(0)]: runQuery
  };

  const keyup = e => {
    if (e.keyCode === COMMAND) {
      setCommandMode(false);
    } else {
      setQuery(e.target.value);
    }
  };

  const keydown = e => {
    if (e.keyCode === COMMAND) {
      setCommandMode(true);
    } else if (commandMode) {
      if (COMMANDS[e.keyCode]) {
        COMMANDS[e.keyCode]();
      }
    }
  };

  return (
    <div id="query-view">
      <div id="query-pane">
        <textarea
          className="form-control"
          rows="10"
          onKeyDown={keydown}
          onKeyUp={keyup}
          placeholder="select * from table"
        />
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
