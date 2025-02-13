import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import "./adminlistmine.css";

function AdminListMine() {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();

    const menuItems = [
        { label: "Data Tambang", path: "/admin_list_mine" },
        { label: "Data Pekerja", path: "/admin_list_worker" },
        { label: "Data Alat", path: "/admin_list_tool" },
        { label: "Data Mineral", path: "/admin_list_mineral" },
        { label: "Data Penghasilan", path: "/admin_list_earnings" },
        { label: "Kepemilikan Alat", path: "/admin_list_ownership" },
    ];

    useEffect(() => {
        fetch(backendUrl + `/viewtable?table=1`)
            .then(res => res.json())
            .then(jsondata => setTableData(jsondata))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const changeData = (id_tambang) => {
        navigate("/admin_edit_mine", { state: { id_tambang } });
    };

    const goToHome = () => navigate("/admin_homepage");
    const goToAddMineData = () => navigate("/admin_add_mine");

    return (
        <div className="container">
            <h1 className="title">Admin Dashboard</h1>
            <div className="button-grid">
                <button className="btn blue">Data Tambang</button>
                <button className="btn blue">Data Pekerja</button>
                <button className="btn blue">Data Alat</button>
                <button className="btn blue">Data Mineral</button>
                <button className="btn blue">Data Penghasilan</button>
                <button className="btn blue">Kepemilikan Alat</button>
            </div>

            <div className="header">
                <h2>Data Tambang</h2>
                <div className="button-group">
                    <button onClick={goToHome} className="btn green">Menu Utama</button>
                    <button onClick={goToAddMineData} className="btn green">Tambah Tambang</button>
                </div>
            </div>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID Tambang</th>
                            <th>Nama Tambang</th>
                            <th>Tanggal Dibuka</th>
                            <th>Lokasi</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length > 0 ? (
                            tableData.map((data) => (
                                <tr key={data.id_tambang}>
                                    <td>{data.id_tambang}</td>
                                    <td>{data.nama}</td>
                                    <td>{data.tanggal_dibuka.substring(0, 10)}</td>
                                    <td>{data.lokasi}</td>
                                    <td>{data.status}</td>
                                    <td>
                                        <button className="btn edit" onClick={() => changeData(data.id_tambang)}>
                                            Ubah Data
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="loading">Memuat data...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Outlet />
        </div>
    );
}

export default AdminListMine;
