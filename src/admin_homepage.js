import { React, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { backendUrl } from "./index.js";

function AdminHomepage() {
    const navigate = useNavigate();

    const [chartData, setChartData] = useState([{nama_pekerja: "Memuat...", total_penghasilan: 1000000}]);

    const menuItems = [
        { label: "Data Tambang", path: "/admin_list_mine" },
        { label: "Data Pekerja", path: "/admin_list_worker" },
        { label: "Data Alat", path: "/admin_list_tool" },
        { label: "Data Mineral", path: "/admin_list_mineral" },
        { label: "Data Penghasilan", path: "/admin_list_earnings" },
        { label: "Kepemilikan Alat", path: "/admin_list_ownership" },
    ];

    useEffect(() => {
        fetch(backendUrl + `/viewtable?table=11`)
        .then(res => res.json())
        .then(jsondata => {setChartData(jsondata)});
    });

    return (
        <div style={{ padding: "20px", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
            <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                Admin Dashboard
            </h1>

            {/* Menu Navigasi */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "20px" }}>
                {menuItems.map((item, index) => (
                    <button 
                        key={index} 
                        style={{
                            padding: "10px",
                            fontSize: "16px",
                            backgroundColor: "#4f46e5",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                        onClick={() => navigate(item.path)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Dashboard Pendapatan */}
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
                <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Pendapatan per Pekerja (Rp)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="nama_pekerja" stroke="#8884d8" />
                        <YAxis stroke="#8884d8" />
                        <Tooltip />
                        <Bar dataKey="total_penghasilan" fill="#4f46e5" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <Outlet />
        </div>
    );
}

export default AdminHomepage;
