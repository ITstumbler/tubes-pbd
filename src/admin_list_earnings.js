import { React, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import './Loginpage.css';

function AdminListEarnings() {
    // const location = useLocation();
    //console.log(location);

    const [tableData, setTableData] = useState([{id_penghasilan: "Memuat...", nama_tambang: "Memuat data...", nama_mineral: "Memuat data...", tanggal: "Memuat data...", jumlah_penghasilan_kg: "Memuat data..."}]);
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0, id_penghasilan: -1});

    useEffect(() => {
        fetch(backendUrl + `/viewtable?table=5`)
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
        const earnings_id = e.target.name;
        navigate("/admin_edit_earnings", {state: {id_penghasilan: earnings_id}})
    }

    const deleteData = (e) => {
        if(customStatusMessage.id_penghasilan !== e.target.name) {
            setCustomStatusMessage({message: "Yakin? Tekan tombol lagi untuk lanjut dengan penghapusan data", error: 1, id_penghasilan: e.target.name});
            return;
        }
        const payload = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({earningsId: e.target.name}),
            mode: "cors"
        }
        fetch(backendUrl + "/deleteearningsdata", payload)
        .then(res => res.json())
        .then(postResponse => setCustomStatusMessage({message: postResponse.msg, error: postResponse.success, id_penghasilan: -1}));
    }

    const navigate = useNavigate();

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToAddEarningsData = (e) => {
        e.preventDefault();
        navigate("/admin_add_earnings", {state: {}})
    }

    return(
        <>
        
        <div className="headertext">DATA PENGHASILAN
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToAddEarningsData} >TAMBAH PENGHAS.</button>
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
                            >{parseInt(customStatusMessage.id_penghasilan) === parseInt(data.id_penghasilan) ? "YAKIN, HAPUS" : "HAPUS DATA"}</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <Outlet />
        </>
    );
}

export default AdminListEarnings;