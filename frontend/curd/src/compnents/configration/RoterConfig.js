import React  from 'react';
import TableView from "../product/TableView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
export default function RoterConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TableView />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
