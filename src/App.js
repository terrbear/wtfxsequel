import React, { useState } from "react";

import QueryView from "./views/QueryView";
import ConnectionSelectView from "./views/ConnectionSelectView";

import "./App.css";

function App() {
  const [connection, setConnection] = useState("1");

  return (
    <div className="App">
      {connection && <QueryView connection={connection} />}
      {!connection && <ConnectionSelectView setConnection={setConnection} />}
    </div>
  );
}

export default App;
