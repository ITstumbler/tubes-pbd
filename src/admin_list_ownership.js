import { React, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import './Loginpage.css';

function AdminListOwnership() {
    // const location = useLocation();
    //console.log(location);

    const [tableData, setTableData] = useState([{id_kepemilikan: "Memuat...", id_alat: "Memuat data...", tipe: "Memuat data...", nama: "Memuat data..."}]);
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0, id_kepemilikan: -1});

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
        navigate("/admin_edit_ownership", {state: {id_kepemilikan: ownership_id}})
    }

    const deleteData = (e) => {
        if(customStatusMessage.id_kepemilikan !== e.target.name) {
            setCustomStatusMessage({message: "Yakin? Tekan tombol lagi untuk lanjut dengan penghapusan data", error: 1, id_kepemilikan: e.target.name});
            return;
        }
        const payload = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ownershipId: e.target.name}),
            mode: "cors"
        }
        fetch(backendUrl + "/deleteownershipdata", payload)
        .then(res => res.json())
        .then(postResponse => setCustomStatusMessage({message: postResponse.msg, error: postResponse.success, id_kepemilikan: -1}));
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
            <button className="topleftnavbutton" onClick={goToAddOwnershipData} >TAMBAH KEPEM.</button>
        </div>
        <div className={errorMessageClass}>{errorMessage}</div>
        <br></br>
        <table className="kitstable">
            <thead>
                <tr>
                    <th>ID kepemilikan</th>
                    <th>ID alat</th>
                    <th>Tipe alat</th>
                    <th>Nama pemilik</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((data) => {
                    return(
                        <tr>
                            <td>{data.id_kepemilikan}</td>
                            <td>{data.id_alat}</td>
                            <td>{data.tipe}</td>
                            <td>{data.nama}</td>
                            <td><button
                            className="changedatabutton"
                            name={data.id_kepemilikan}
                            onClick={(e) => {changeData(e)}}
                            >UBAH DATA</button></td>
                            <td><button
                            className="changedatabutton"
                            name={data.id_kepemilikan}
                            onClick={(e) => {deleteData(e)}}
                            >{parseInt(customStatusMessage.id_kepemilikan) === parseInt(data.id_kepemilikan) ? "YAKIN, HAPUS" : "HAPUS DATA"}</button></td>
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