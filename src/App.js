import React, { useState } from "react";

import QueryView from "./views/QueryView";
import ConnectionSelectView from "./views/ConnectionSelectView";

import StatusBar from "./components/StatusBar";

import StatusContext from "./StatusContext";

import "./App.css";

function App() {
  const [connection, setConnection] = useState("1");
  const [status, setStatus] = useState("");

  const statusContext = {
    status,
    setStatus
  };

  return (
    <div className="App">
      <StatusContext.Provider value={statusContext}>
        <StatusBar />
        {connection && <QueryView connection={connection} />}
        {!connection && <ConnectionSelectView setConnection={setConnection} />}
      </StatusContext.Provider>
    </div>
  );
}

export default App;
