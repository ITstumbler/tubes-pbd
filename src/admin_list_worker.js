import { React, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import './adminlistworker.css';

function AdminListWorker() {
    // const location = useLocation();
    //console.log(location);

    const [tableData, setTableData] = useState([{id_pekerja: "Memuat...", nama: "Memuat data...", tanggal_diterima: "Memuat data...", nama_tambang: "Memuat data...", status: "Memuat data..."}]);

    useEffect(() => {
        fetch(backendUrl + `/viewtable?table=2`)
        .then(res => res.json())
        .then(jsondata => {setTableData(jsondata)});
    });
    
    const changeData = (e) => {
        const worker_id = e.target.name;
        navigate("/admin_edit_worker", {state: {id_pekerja: worker_id}})
    }

    const navigate = useNavigate();

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToAddWorkerData = (e) => {
        e.preventDefault();
        navigate("/admin_add_worker", {state: {}})
    }

    return(
        <>
        
        <div className="headertext">DATA PEKERJA
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToAddWorkerData} >TAMBAH PEKERJA</button>
        </div>
        <br></br>
        <table className="kitstable">
            <thead>
                <tr>
                    <th>ID pekerja</th>
                    <th>Nama pekerja</th>
                    <th>Tanggal diterima</th>
                    <th>Tempat menambang</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((data) => {
                    return(
                        <tr>
                            <td>{data.id_pekerja}</td>
                            <td>{data.nama}</td>
                            <td>{data.tanggal_diterima.substring(0, 10)}</td>
                            <td>{data.nama_tambang}</td>
                            <td>{data.status}</td>
                            <td><button
                            className="changedatabutton"
                            name={data.id_pekerja}
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

export default AdminListWorker;