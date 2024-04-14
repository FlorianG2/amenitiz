import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import App from "../components/App";

export default (
<Router>
<Routes>
  <Route path="/" element={<App />} />
</Routes>
</Router>
);
