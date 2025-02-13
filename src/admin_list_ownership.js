import { React, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import './Loginpage.css';

function AdminListOwnership() {
    // const location = useLocation();
    //console.log(location);

    const [tableData, setTableData] = useState([{id_penghasilan: "Memuat...", nama_tambang: "Memuat data...", nama_mineral: "Memuat data...", tanggal: "Memuat data...", jumlah_penghasilan_kg: "Memuat data..."}]);
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0});

    useEffect(() => {
        fetch(backendUrl + `/viewtable?table=9`)
        .then(res => res.json())
        .then(jsondata => {setTableData(jsondata)});
    });

    let errorMessage = " ";
    let errorMessageClass = "statusmessagered";

    if(customStatusMessage.error === 0) {
        errorMessage = "";
        errorMessageClass = "statusmessagered";
    }

    else if(customStatusMessage.error === 1) {
        errorMessage = customStatusMessage.message;
        errorMessageClass = "statusmessagered";
    }
    else {
        errorMessage = customStatusMessage.message;
        errorMessageClass = "statusmessagegreen";
    }
    
    const changeData = (e) => {
        const ownership_id = e.target.name;
        navigate("/admin_edit_ownership", {state: {id_penghasilan: ownership_id}})
    }

    const deleteData = (e) => {
        const payload = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ownershipId: e.target.name}),
            mode: "cors"
        }
        fetch(backendUrl + "/deleteownershipdata", payload)
        .then(res => res.json())
        .then(postResponse => setCustomStatusMessage({message: postResponse.msg, error: postResponse.success}));
    }

    const navigate = useNavigate();

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToAddOwnershipData = (e) => {
        e.preventDefault();
        navigate("/admin_add_ownership", {state: {}})
    }

    return(
        <>
        
        <div className="headertext">DATA KEPEMILIKAN ALAT
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToAddOwnershipData} >TAMBAH PENGHAS.</button>
        </div>
        <div className={errorMessageClass}>{errorMessage}</div>
        <br></br>
        <table className="kitstable">
            <thead>
                <tr>
                    <th>ID penghasilan</th>
                    <th>Tambang</th>
                    <th>Mineral</th>
                    <th>Tanggal</th>
                    <th>Kg mineral yang didapatkan</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((data) => {
                    return(
                        <tr>
                            <td>{data.id_penghasilan}</td>
                            <td>{data.nama_tambang}</td>
                            <td>{data.nama_mineral}</td>
                            <td>{data.tanggal.substring(0, 10)}</td>
                            <td>{data.jumlah_penghasilan_kg}</td>
                            <td><button
                            className="changedatabutton"
                            name={data.id_penghasilan}
                            onClick={(e) => {changeData(e)}}
                            >UBAH DATA</button></td>
                            <td><button
                            className="changedatabutton"
                            name={data.id_penghasilan}
                            onClick={(e) => {deleteData(e)}}
                            >HAPUS DATA</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <Outlet />
        </>
    );
}

export default AdminListOwnership;