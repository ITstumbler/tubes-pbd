import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function AdminHomepage() {
    const navigate = useNavigate();

    const menuItems = [
        { label: "Data Tambang", path: "/admin_list_mine" },
        { label: "Data Pekerja", path: "/admin_list_worker" },
        { label: "Data Alat", path: "/admin_list_tool" },
        { label: "Data Mineral", path: "/admin_list_mineral" },
        { label: "Data Penghasilan", path: "/admin_list_earnings" },
        { label: "Kepemilikan Alat", path: "/admin_list_ownership" },
    ];

    const earningsData = [
        { month: "Jan", earnings: 5000 },
        { month: "Feb", earnings: 7000 },
        { month: "Mar", earnings: 6500 },
        { month: "Apr", earnings: 8000 },
        { month: "Mei", earnings: 7500 },
    ];

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
                <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Pendapatan Bulanan</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={earningsData}>
                        <XAxis dataKey="month" stroke="#8884d8" />
                        <YAxis stroke="#8884d8" />
                        <Tooltip />
                        <Bar dataKey="earnings" fill="#4f46e5" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <Outlet />
        </div>
    );
}

export default AdminHomepage;
