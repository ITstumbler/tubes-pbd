import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import "./Loginpage.css";

function AdminEditWorker() {
    const location = useLocation();
    const [workerData, setWorkerData] = useState({nama: "Memuat data...", tanggal_diterima: "", tambang: "1", status: "Aktif"});
    //error 0 means use default error messages for password mismatch and passwords being under 6 characters long.
    //error 1 or 2 uses the message set in customStatusMessage. 1 displays red text and 2 displays green text.
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0});
    const [mineList, setMineList] = useState([{nama: "Memuat data...", id_tambang: "-1"}]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!location.state.id_pekerja) navigate("/admin_worker_list", {state: {}});
        fetch(backendUrl + `/viewentry?table=2&id=`+location.state.id_pekerja)
        .then(res => res.json())
        .then(jsondata => {setWorkerData(jsondata)});
        fetch(backendUrl + "/viewtable?table=6")
        .then(res => res.json())
        .then(mineData => setMineList(mineData));
    }, [location, navigate]);

    let errorMessage = " ";
    let errorMessageClass = "statusmessagered";

    const updateWorkerData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setWorkerData(values => ({...values, [name]: value}));
        customStatusMessage.error = 0
    };
    
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

    const submitEditedWorkerData = (e) => {
        e.preventDefault();
        if(workerData.nama === undefined
            || workerData.tanggal_diterima  === undefined
            || workerData.status  === undefined
            || workerData.tambang  === undefined) {
            setCustomStatusMessage({message: "Mohon mengisi semua kolom", error: 1});
        }
        else {
            const payload = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(workerData),
                mode: "cors"
            }
            fetch(backendUrl + "/editworkerdata?id="+location.state.id_pekerja, payload)
            .then(res => res.json())
            .then(postResponse => setCustomStatusMessage({message: postResponse.msg, error: postResponse.success}));
        }
    }

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToWorkerList = (e) => {
        e.preventDefault();
        navigate("/admin_list_worker", {state: {}})
    }

    return(
        <>
        <div className="headertext">EDIT DATA PEKERJA
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToWorkerList} >DATA PEKERJA</button>
        </div>
        <div className="secondarytext"></div>
        <br></br>
        <form onSubmit={submitEditedWorkerData}>
            <table className="submitkittable">
                <tr>
                    <td>NAMA PEKERJA</td>
                    <td>
                    <input className="submitkitinput" type="text" name="nama"
                    value={workerData.nama} maxlength="64" onChange={(e) => updateWorkerData(e)} />
                    </td>
                </tr>
                <tr>
                    <td>TANGGAL DITERIMA</td>
                    <td><input className="submitkitinput" type="date" name="tanggal_diterima"
                    value={workerData.tanggal_diterima} onChange={(e) => updateWorkerData(e)} /></td>
                </tr>
                <tr>
                    <td>TEMPAT MENAMBANG</td>
                    <td>
                        <select name="tambang" className="submitkitinput"
                        value={workerData.tambang} onChange={(e) => updateWorkerData(e)}>
                            {mineList.map((mineEntry) => {
                                return(
                                    <option value={mineEntry.id_tambang}>{mineEntry.nama}</option>
                                )
                            })}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>STATUS</td>
                    <td><select name="status" className="submitkitinput"
                        value={workerData.status} onChange={(e) => updateWorkerData(e)}>
                            <option value="Aktif">Aktif</option>
                            <option value="Tidak Aktif">Tidak Aktif</option>
                        </select></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div className={errorMessageClass}>{errorMessage}</div>
                        <input className="submitkitbutton" type="submit" value="SIMPAN" />
                    </td>
                </tr>
            </table>
        </form>
        </>
    );
}

export default AdminEditWorker;