import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { backendUrl } from "./index.js";
import './adminlistearning.css';

function AdminListEarnings() {
    const [tableData, setTableData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0, id_penghasilan: -1});

    useEffect(() => {
        fetch(backendUrl + `/viewtable?table=5`)
        .then(res => res.json())
        .then(jsondata => {
            setTableData(jsondata);
            
            // Mengelompokkan data penghasilan berdasarkan tambang
            const groupedData = jsondata.reduce((acc, item) => {
                const existing = acc.find(data => data.nama_tambang === item.nama_tambang);
                if (existing) {
                    existing.total_penghasilan += parseFloat(item.jumlah_penghasilan_kg);
                } else {
                    acc.push({ 
                        nama_tambang: item.nama_tambang, 
                        total_penghasilan: parseFloat(item.jumlah_penghasilan_kg)
                    });
                }
                return acc;
            }, []);

            // Urutkan dari terbesar ke terkecil
            groupedData.sort((a, b) => b.total_penghasilan - a.total_penghasilan);
            setChartData(groupedData);
        });
    }, []);

    const navigate = useNavigate();

    const goToHome = () => navigate("/admin_homepage");
    const goToAddEarningsData = () => navigate("/admin_add_earnings");

    return (
        <div className="container">
            <div className="header">
                <h2>📊 DATA PENGHASILAN</h2>
                <div className="button-group">
                    <button className="btn add-btn" onClick={goToAddEarningsData}>+ Tambah Data</button>
                    <button className="btn home-btn" onClick={goToHome}>🏠 Menu Utama</button>
                </div>
            </div>

            {/* Chart Section */}
            <div className="chart-container">
                <h3>📈 Perbandingan Penghasilan Tambang</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nama_tambang" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total_penghasilan" fill="#4CAF50" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Table Section */}
            <table className="earnings-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tambang</th>
                        <th>Mineral</th>
                        <th>Tanggal</th>
                        <th>Kg Mineral</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data) => (
                        <tr key={data.id_penghasilan}>
                            <td>{data.id_penghasilan}</td>
                            <td>{data.nama_tambang}</td>
                            <td>{data.nama_mineral}</td>
                            <td>{data.tanggal.substring(0, 10)}</td>
                            <td>{data.jumlah_penghasilan_kg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <Outlet />
        </div>
    );
}

export default AdminListEarnings;
