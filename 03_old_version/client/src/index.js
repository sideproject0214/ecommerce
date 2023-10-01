import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import loadUser from "./util/loadUser";

loadUser();

ReactDOM.render(<App />, document.getElementById("root"));
