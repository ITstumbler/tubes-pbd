import { React, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import './Loginpage.css';

function AdminListMine() {
    // const location = useLocation();
    //console.log(location);

    const [tableData, setTableData] = useState([{id_tambang: "Memuat...", nama: "Memuat data...", tanggal_dibuka: "Memuat data...", lokasi: "Memuat data...", status: "Memuat data..."}]);

    useEffect(() => {
        fetch(backendUrl + `/viewtable?table=1`)
        .then(res => res.json())
        .then(jsondata => {setTableData(jsondata)});
    });
    
    const changeData = (e) => {
        const mine_id = e.target.name;
        navigate("/admin_edit_mine", {state: {id_tambang: mine_id}})
    }

    const navigate = useNavigate();

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToAddMineData = (e) => {
        e.preventDefault();
        navigate("/admin_add_mine", {state: {}})
    }

    return(
        <>
        
        <div className="headertext">DATA TAMBANG
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToAddMineData} >TAMBAH TAMBANG</button>
        </div>
        <br></br>
        <table className="kitstable">
            <thead>
                <tr>
                    <th>ID tambang</th>
                    <th>Nama tambang</th>
                    <th>Tanggal dibuka</th>
                    <th>Lokasi</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((data) => {
                    return(
                        <tr>
                            <td>{data.id_tambang}</td>
                            <td>{data.nama}</td>
                            <td>{data.tanggal_dibuka.substring(0, 10)}</td>
                            <td>{data.lokasi}</td>
                            <td>{data.status}</td>
                            <td><button
                            className="changedatabutton"
                            name={data.id_tambang}
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

export default AdminListMine;