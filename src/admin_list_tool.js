import { React, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import './Loginpage.css';

function AdminListTool() {
    // const location = useLocation();
    //console.log(location);

    const [tableData, setTableData] = useState([{id_alat: "Memuat...", tipe: "Memuat data...", tanggal_dibeli: "Memuat data...", harga: "Memuat data...", status: "Memuat data...", nama: "Memuat data..."}]);

    useEffect(() => {
        fetch(backendUrl + `/viewtable?table=3`)
        .then(res => res.json())
        .then(jsondata => {setTableData(jsondata)});
    });
    
    const changeData = (e) => {
        const tool_id = e.target.name;
        navigate("/admin_edit_tool", {state: {id_alat: tool_id}})
    }

    const navigate = useNavigate();

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToAddToolData = (e) => {
        e.preventDefault();
        navigate("/admin_add_tool", {state: {}})
    }

    return(
        <>
        
        <div className="headertext">DATA ALAT
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToAddToolData} >TAMBAH ALAT</button>
        </div>
        <br></br>
        <table className="kitstable">
            <thead>
                <tr>
                    <th>ID alat</th>
                    <th>Tipe alat</th>
                    <th>Tanggal dibeli</th>
                    <th>Harga</th>
                    <th>Status</th>
                    <th>Dimiliki oleh</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((data) => {
                    return(
                        <tr>
                            <td>{data.id_alat}</td>
                            <td>{data.tipe}</td>
                            <td>{data.tanggal_dibeli.substring(0, 10)}</td>
                            <td>Rp {data.harga.toLocaleString("en")}</td>
                            <td>{data.status}</td>
                            <td>{data.nama}</td>
                            <td><button
                            className="changedatabutton"
                            name={data.id_alat}
                            onClick={(e) => {changeData(e)}}
                            >UBAH DATA</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <Outlet />
        </>
    );
}

export default AdminListTool;