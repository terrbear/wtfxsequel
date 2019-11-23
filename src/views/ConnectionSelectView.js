import React from "react";

function ConnectionSelectView({ setConnection }) {
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

export default ConnectionSelectView;
