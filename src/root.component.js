import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PeoplePage from "@@/pages/People";

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/people/:personId" element={<PeoplePage />} />
        <Route path="/people" element={<PeoplePage />} />
      </Routes>
    </BrowserRouter>
  );
}
