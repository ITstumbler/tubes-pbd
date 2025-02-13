import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import "./Loginpage.css";

function AdminEditOwnership() {
    const location = useLocation();
    const [ownershipData, setOwnershipData] = useState({id_alat: "", id_pekerja: ""});
    //error 0 means use default error messages for password mismatch and passwords being under 6 characters long.
    //error 1 or 2 uses the message set in customStatusMessage. 1 displays red text and 2 displays green text.
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0});
    const [toolList, setToolList] = useState([{nama_alat: "Memuat data...", id_alat: "-1"}]);
    const [workerList, setWorkerList] = useState([{nama: "Memuat data...", id_pekerja: "-1"}]);

    const navigate = useNavigate();

    useEffect(() => {
        if(!location.state.id_kepemilikan) navigate("/admin_ownership_list", {state: {}});
        fetch(backendUrl + `/viewentry?table=9&id=`+location.state.id_kepemilikan)
        .then(res => res.json())
        .then(jsondata => {setOwnershipData(jsondata)});
        fetch(backendUrl + "/viewtable?table=10")
        .then(res => res.json())
        .then(toolData => setToolList(toolData));
        fetch(backendUrl + "/viewtable?table=7")
        .then(res => res.json())
        .then(workerData => setWorkerList(workerData));
    }, [location, navigate]);

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

    const submitEditedOwnershipData = (e) => {
        e.preventDefault();
        if(ownershipData.id_alat === undefined
            || ownershipData.id_pekerja  === undefined) {
            setCustomStatusMessage({message: "Mohon mengisi semua kolom", error: 1});
        }
        else {
            const payload = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(ownershipData),
                mode: "cors"
            }
            fetch(backendUrl + "/editownershipdata?id="+location.state.id_kepemilikan, payload)
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
        <div className="headertext">EDIT DATA KEPEMILIKAN ALAT
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToOwnershipList} >KEPEM. ALAT</button>
        </div>
        <div className="secondarytext"></div>
        <br></br>
        <form onSubmit={submitEditedOwnershipData}>
            <table className="submitkittable">
            <tr>
                    <td>(ID) TIPE ALAT</td>
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
                        <input className="submitkitbutton" type="submit" value="SIMPAN" />
                    </td>
                </tr>
            </table>
        </form>
        </>
    );
}

export default AdminEditOwnership;