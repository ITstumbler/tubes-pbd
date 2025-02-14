import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import "./Loginpage.css";

function AdminAddOwnership() {
    // const location = useLocation();
    const [ownershipData, setOwnershipData] = useState({id_alat: "1", id_pekerja: "1"});
    //error 0 means use default error messages for password mismatch and passwords being under 6 characters long.
    //error 1 or 2 uses the message set in customStatusMessage. 1 displays red text and 2 displays green text.
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0});
    const [toolList, setToolList] = useState([{nama_alat: "Memuat data...", id_alat: "-1"}]);
    const [workerList, setWorkerList] = useState([{nama: "Memuat data...", id_pekerja: "-1"}]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(backendUrl + "/viewtable?table=10")
        .then(res => res.json())
        .then(toolData => setToolList(toolData));
        fetch(backendUrl + "/viewtable?table=7")
        .then(res => res.json())
        .then(workerData => setWorkerList(workerData));
    }, [navigate]);

    let errorMessage = " ";
    let errorMessageClass = "statusmessagered";

    const updateOwnershipData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setOwnershipData(values => ({...values, [name]: value}));
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

    const submitNewOwnershipData = (e) => {
        e.preventDefault();
        if(ownershipData.id_alat === ""
        || ownershipData.id_pekerja  === "") {
            setCustomStatusMessage({message: "Mohon mengisi semua kolom", error: 1});
        }
        else {
            const payload = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(ownershipData),
                mode: "cors"
            }
            fetch(backendUrl + "/addownershipdata", payload)
            .then(res => res.json())
            .then(postResponse => setCustomStatusMessage({message: postResponse.msg, error: postResponse.success}));
        }
    }

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToOwnershipList = (e) => {
        e.preventDefault();
        navigate("/admin_list_ownership", {state: {}})
    }

    return(
        <>
        <div className="headertext">TAMBAH DATA KEPEMILIKAN ALAT
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToOwnershipList} >KEPEM. ALAT</button>
        </div>
        <div className="secondarytext"></div>
        <br></br>
        <form onSubmit={submitNewOwnershipData}>
            <table className="submitkittable">
                <tr>
                    <td>(ID): TIPE ALAT</td>
                    <td>
                        <select name="id_alat" className="submitkitinput"
                        value={ownershipData.id_alat} onChange={(e) => updateOwnershipData(e)}>
                            {toolList.map((toolEntry) => {
                                return(
                                    <option value={toolEntry.id_alat}>{toolEntry.nama_alat}</option>
                                )
                            })}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>PEKERJA</td>
                    <td>
                        <select name="id_pekerja" className="submitkitinput"
                        value={ownershipData.id_pekerja} onChange={(e) => updateOwnershipData(e)}>
                            {workerList.map((workerEntry) => {
                                return(
                                    <option value={workerEntry.id_pekerja}>{workerEntry.nama}</option>
                                )
                            })}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div className={errorMessageClass}>{errorMessage}</div>
                        <input className="submitkitbutton" type="submit" value="TAMBAH" />
                    </td>
                </tr>
            </table>
        </form>
        </>
    );
}

export default AdminAddOwnership;