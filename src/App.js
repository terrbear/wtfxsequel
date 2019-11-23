import React, { useState } from "react";

import QueryView from "./views/QueryView";
import ConnectionSelectView from "./views/ConnectionSelectView";

import "./App.css";

function ConnectionSelector({ setConnection }) {
  const connections = [
    {
      id: "1",
      name: "localhost"
    }
  ];

  return (
    <React.Fragment>
      <h2>Choose a connection</h2>
      <ul>
        {connections.map(c => (
          <li onClick={() => setConnection(c.id)} key={c.id}>
            {c.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
}

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
