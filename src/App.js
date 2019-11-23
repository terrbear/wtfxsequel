import React, { useState, useEffect } from "react";

import QueryView from "./views/QueryView";
import ConnectionSelectView from "./views/ConnectionSelectView";

import StatusBar from "./components/StatusBar";

import StatusContext from "./StatusContext";

import "./App.css";

function App() {
  const [connection, setConnection] = useState("");
  const [status, setStatus] = useState("");

  const COMMANDS = {
    ["N".charCodeAt(0)]: () => window.open('http://localhost:3000'), //window.newWindow
  };

  const keydown = e => {
    if (e.metaKey && COMMANDS[e.keyCode]) {
      COMMANDS[e.keyCode]();
    }
  };

  const statusContext = {
    status,
    setStatus
  };

  useEffect(() => {
    document.addEventListener("keydown", keydown);
    // eslint-disable-next-line 
  }, []);

  return (
    <div onKeyDown={keydown} className="App">
      <StatusContext.Provider value={statusContext}>
        <StatusBar />
        {connection && <QueryView connection={connection} />}
        {!connection && <ConnectionSelectView setConnection={setConnection} />}
      </StatusContext.Provider>
    </div>
  );
}

export default App;
