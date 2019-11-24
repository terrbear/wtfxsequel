import React, { useState } from "react";
import PropTypes from "prop-types";

import Storage from "../Storage";

function QueryEditor({ runQuery, connection }) {
  const store = new Storage(connection);
  const [query, setQuery] = useState(store.get("query") || "");

  const COMMANDS = {
    ["T".charCodeAt(0)]: () => runQuery(query)
  };

  const keydown = e => {
    if (e.metaKey && COMMANDS[e.keyCode]) {
      COMMANDS[e.keyCode]();
    }
  };

  return (
    <textarea
      className="form-control"
      onKeyDown={keydown}
      onChange={e => setQuery(store.set("query", e.target.value))}
      value={query}
      placeholder="select * from table"
    />
  );
}

QueryEditor.propTypes = {
  connection: PropTypes.string.isRequired,
  runQuery: PropTypes.func.isRequired
};

export default QueryEditor;
