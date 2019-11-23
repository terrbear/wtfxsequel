import React, { useState, useContext, useEffect } from "react";
import StatusContext from "../StatusContext";

import UUID from "../lib/UUID";

/*
const config = {
  host: "localhost",
  port: 5432,
  database: "finance_funday",
  user: "tinle",
  password: "",
};
*/

function ConnectionSelectView({ setConnection }) {
  const [connectionInfo, setConnectionInfo] = useState({ id: UUID() });
  const [connections, setConnections] = useState([]);
  const [isDirty, setDirty] = useState(false);

  const status = useContext(StatusContext);

  const handleChange = e => {
    setDirty(true);
    setConnectionInfo({ ...connectionInfo, [e.target.name]: e.target.value });
  };

  const loadConnectionInfo = connection => {
    setConnectionInfo(connection);
    setDirty(false);
  };

  const loadConnections = () =>
    window.ipc.invoke("connections/list").then(connections => {
      console.log("connections: ", connections);
      setConnections(connections);
    });

  useEffect(() => {
    loadConnections();
  }, []);

  const handleSubmit = (cb, e) => {
    const form = e.currentTarget;

    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity()) {
      cb();
    }
  };

  const save = async () => {
    status.setStatus("Saving connection...");
    await window.ipc.invoke("connections/save", connectionInfo);
    status.clear();
    setDirty(false);
    loadConnections();
  };

  return (
    <div id="connection-select-view">
      <div id="connections-list">
        {connections.map(c => (
          <span
            className="connection-link"
            onClick={() => loadConnectionInfo(c)}
            key={c.id}
          >
            <i className="fas fa-database"></i> {c.name}
          </span>
        ))}
        <div id="add-connection">
          <button
            onClick={() => loadConnectionInfo({ id: UUID() })}
            className="btn btn-light btn-sm"
          >
            New Connection
          </button>
        </div>
      </div>
      <div id="connections-form">
        <form onSubmit={handleSubmit.bind(this, save)}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              placeholder="name"
              required
              value={connectionInfo.name || ""}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="host">Host</label>
            <input
              className="form-control"
              placeholder="host"
              required
              value={connectionInfo.host || ""}
              onChange={handleChange}
              name="host"
            />
          </div>
          <div className="form-group">
            <label htmlFor="port">Port</label>
            <input
              className="form-control"
              placeholder="5432"
              type="number"
              required
              value={connectionInfo.port || ""}
              onChange={handleChange}
              name="port"
            />
          </div>
          <div className="form-group">
            <label htmlFor="database">Database</label>
            <input
              className="form-control"
              placeholder="database"
              value={connectionInfo.database || ""}
              onChange={handleChange}
              name="database"
            />
          </div>
          <div className="form-group">
            <label htmlFor="user">User</label>
            <input
              className="form-control"
              placeholder="user"
              required
              value={connectionInfo.user || ""}
              onChange={handleChange}
              name="user"
            />
          </div>
          <div className="form-group">
            <label htmlFor="host">Password</label>
            <input
              className="form-control"
              type="password"
              value={connectionInfo.password || ""}
              onChange={handleChange}
              name="password"
            />
            <small id="passwordHelp" className="form-text text-muted">
              Passwords are stored using your native keychain/secrets manager.
            </small>
          </div>

          {connectionInfo.host && (
            <div className="btn-group" style={{ float: "right" }}>
              <button className="btn btn-outline-primary">Save</button>
              {!isDirty && (
                <button
                  type="button"
                  onClick={() => setConnection(connectionInfo.id)}
                  className="btn btn-outline-success"
                >
                  Connect
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ConnectionSelectView;
