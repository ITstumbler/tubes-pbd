import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { backendUrl } from "./index.js";
import './adminlistmineral.css';

function AdminListMineral() {
    const [tableData, setTableData] = useState([{id_mineral: "Memuat...", nama: "Memuat data...", harga_kg: "Memuat data...", jenis: "Memuat data..."}]);
    const [chartData, setChartData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(backendUrl + `/viewtable?table=4`)
        .then(res => res.json())
        .then(jsondata => {
            setTableData(jsondata);
            setChartData(jsondata.map(item => ({
                nama: item.nama,
                harga: item.harga_kg
            })));
        });
    }, []);

    const changeData = (e) => {
        const mineral_id = e.target.name;
        navigate("/admin_edit_mineral", {state: {id_mineral: mineral_id}});
    };

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}});
    };

    const goToAddMineralData = (e) => {
        e.preventDefault();
        navigate("/admin_add_mineral", {state: {}});
    };

    return (
        <>
            <div className="headertext">DATA MINERAL
                <button className="toprightnavbutton" onClick={goToHome}>MENU UTAMA</button>
                <button className="topleftnavbutton" onClick={goToAddMineralData}>TAMBAH MINERAL</button>
            </div>
            <br />
            <table className="kitstable">
                <thead>
                    <tr>
                        <th>ID mineral</th>
                        <th>Nama mineral</th>
                        <th>Harga/kg</th>
                        <th>Jenis</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.id_mineral}</td>
                            <td>{data.nama}</td>
                            <td>Rp {data.harga_kg.toLocaleString("en")}</td>
                            <td>{data.jenis}</td>
                            <td>
                                <button className="changedatabutton" name={data.id_mineral} onClick={changeData}>
                                    UBAH DATA
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Chart Section */}
            <div className="chart-container">
                <h2>Grafik Harga Mineral</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nama" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="harga" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <Outlet />
        </>
    );
}

export default AdminListMineral;
