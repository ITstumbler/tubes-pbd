import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import "./Loginpage.css";

function AdminEditTool() {
    const location = useLocation();
    const [toolData, setToolData] = useState({tipe: "Memuat data...", tanggal_dibeli: "", dimiliki: "1", harga: "", status: "Berfungsi"});
    //error 0 means use default error messages for password mismatch and passwords being under 6 characters long.
    //error 1 or 2 uses the message set in customStatusMessage. 1 displays red text and 2 displays green text.
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0});
    const [workerList, setWorkerList] = useState([{nama: "Memuat data...", id_pekerja: "-1"}]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!location.state.id_alat) navigate("/admin_tool_list", {state: {}});
        fetch(backendUrl + `/viewentry?table=3&id=`+location.state.id_alat)
        .then(res => res.json())
        .then(jsondata => {setToolData(jsondata)});
        fetch(backendUrl + "/viewtable?table=7")
        .then(res => res.json())
        .then(workerData => setWorkerList(workerData));
    }, [location, navigate]);

    let errorMessage = " ";
    let errorMessageClass = "statusmessagered";

    const updateToolData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setToolData(values => ({...values, [name]: value}));
        customStatusMessage.error = 0
    };
    
    if(customStatusMessage.error === 0) {
        if((isNaN(+toolData.harga) && toolData.harga)) {
            errorMessage = "Harga harus berupa angka";
            errorMessageClass = "statusmessagered";
        }
    }

    else if(customStatusMessage.error === 1) {
        errorMessage = customStatusMessage.message;
        errorMessageClass = "statusmessagered";
    }
    else {
        errorMessage = customStatusMessage.message;
        errorMessageClass = "statusmessagegreen";
    }

    const submitEditedToolData = (e) => {
        e.preventDefault();
        if(toolData.tipe === undefined
            || toolData.harga  === undefined
            || toolData.tanggal_dibeli  === undefined
            || toolData.status  === undefined
            || toolData.dimiliki  === undefined) {
            setCustomStatusMessage({message: "Mohon mengisi semua kolom", error: 1});
        }
        else if((isNaN(+toolData.harga) && toolData.harga)) {
            setCustomStatusMessage({message: "Harga harus berupa angka!!!", error: 1});
        }
        else {
            const payload = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(toolData),
                mode: "cors"
            }
            fetch(backendUrl + "/edittooldata?id="+location.state.id_alat, payload)
            .then(res => res.json())
            .then(postResponse => setCustomStatusMessage({message: postResponse.msg, error: postResponse.success}));
        }
    }

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToToolList = (e) => {
        e.preventDefault();
        navigate("/admin_list_tool", {state: {}})
    }

    return(
        <>
        <div className="headertext">EDIT DATA ALAT
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToToolList} >DATA ALAT</button>
        </div>
        <div className="secondarytext"></div>
        <br></br>
        <form onSubmit={submitEditedToolData}>
            <table className="submitkittable">
                <tr>
                    <td>TIPE ALAT</td>
                    <td>
                    <input className="submitkitinput" type="text" name="tipe"
                    value={toolData.tipe} maxlength="64" onChange={(e) => updateToolData(e)} />
                    </td>
                </tr>
                <tr>
                    <td>HARGA</td>
                    <td>Rp. <input className="submitkitinputprice" type="text" name="harga"
                    value={toolData.harga} onChange={(e) => updateToolData(e)} /></td>
                </tr>
                <tr>
                    <td>TANGGAL DIBELI</td>
                    <td><input className="submitkitinput" type="date" name="tanggal_dibeli"
                    value={toolData.tanggal_dibeli} onChange={(e) => updateToolData(e)} /></td>
                </tr>
                <tr>
                    <td>DIMILIKI oleh</td>
                    <td>
                        <select name="dimiliki" className="submitkitinput"
                        value={toolData.dimiliki} onChange={(e) => updateToolData(e)}>
                            {workerList.map((workerEntry) => {
                                return(
                                    <option value={workerEntry.id_pekerja}>{workerEntry.nama}</option>
                                )
                            })}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>STATUS</td>
                    <td><select name="status" className="submitkitinput"
                        value={toolData.status} onChange={(e) => updateToolData(e)}>
                            <option value="Berfungsi">Berfungsi</option>
                            <option value="Rusak">Rusak</option>
                            <option value="Tidak dimiliki">Tidak dimiliki</option>
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

export default AdminEditTool;