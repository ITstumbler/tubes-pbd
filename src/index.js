import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
// import reportWebVitals from './reportWebVitals';
import AdminHomepage from "./admin_homepage.js";
import AdminListMine from "./admin_list_mine.js";
import AdminAddMine from "./admin_add_mine.js";
import AdminEditMine from "./admin_edit_mine.js";
import AdminListWorker from "./admin_list_worker.js";
import AdminAddWorker from "./admin_add_worker.js";
import AdminEditWorker from "./admin_edit_worker.js";
import AdminListTool from "./admin_list_tool.js";
import AdminAddTool from "./admin_add_tool.js";
import AdminEditTool from "./admin_edit_tool.js";
import AdminListMineral from "./admin_list_mineral.js";
import AdminAddMineral from "./admin_add_mineral.js";
import AdminEditMineral from "./admin_edit_mineral.js";
import AdminListEarnings from "./admin_list_earnings.js";
import AdminAddEarnings from "./admin_add_earnings.js";
import AdminEditEarnings from "./admin_edit_earnings.js";

const backendUrl = "http://localhost:8082";
export { backendUrl };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={ <AdminHomepage />} />
        <Route path="admin_list_mine" element={ <AdminListMine />} />
        <Route path="admin_add_mine" element={ <AdminAddMine />} />
        <Route path="admin_edit_mine" element={ <AdminEditMine />} />
        <Route path="admin_list_worker" element={ <AdminListWorker />} />
        <Route path="admin_add_worker" element={ <AdminAddWorker />} />
        <Route path="admin_edit_worker" element={ <AdminEditWorker />} />
        <Route path="admin_list_tool" element={ <AdminListTool />} />
        <Route path="admin_add_tool" element={ <AdminAddTool />} />
        <Route path="admin_edit_tool" element={ <AdminEditTool />} />
        <Route path="admin_list_mineral" element={ <AdminListMineral />} />
        <Route path="admin_add_mineral" element={ <AdminAddMineral />} />
        <Route path="admin_edit_mineral" element={ <AdminEditMineral />} />
        <Route path="admin_list_earnings" element={ <AdminListEarnings />} />
        <Route path="admin_add_earnings" element={ <AdminAddEarnings />} />
        <Route path="admin_edit_earnings" element={ <AdminEditEarnings />} />
        <Route path="*" element={ <AdminHomepage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
