import React, { useState } from "react";
import PropTypes from "prop-types";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism.css";

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
    <Editor
      className="form-control"
      onKeyDown={keydown}
      onValueChange={sql => setQuery(store.set("query", sql))}
      highlight={code => highlight(code, languages.sql)}
      value={query}
      style={{
        height: "100%",
        fontFamily: '"Fira code", "Fira Mono", monospace',
      }}
      placeholder="select * from table"
    />
  );
}

QueryEditor.propTypes = {
  connection: PropTypes.string.isRequired,
  runQuery: PropTypes.func.isRequired
};

export default QueryEditor;
