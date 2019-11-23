import React, { useState } from "react";
import PropTypes from "prop-types";

import Storage from "../Storage";

const COMMAND = 91; // command key on mbp

function QueryEditor({ runQuery, connection }) {
  const store = new Storage(connection);
  const [query, setQuery] = useState(store.get("query") || "");
  const [commandMode, setCommandMode] = useState(false);

  const COMMANDS = {
    ["T".charCodeAt(0)]: () => runQuery(query)
  };

  const keyup = e => {
    if (e.keyCode === COMMAND) {
      setCommandMode(false);
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
    <textarea
      className="form-control"
      rows="10"
      onKeyDown={keydown}
      onKeyUp={keyup}
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
