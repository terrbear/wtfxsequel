import React, { useContext } from "react";

import StatusContext from "../StatusContext";

export default function() {
  const status = useContext(StatusContext);

  return <div id="status">{status.status}</div>;
}
