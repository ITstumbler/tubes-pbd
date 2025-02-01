import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import "./Loginpage.css";

function AdminAddMine() {
    // const location = useLocation();
    const [mineData, setMineData] = useState({nama: "", tanggal_dibuka: "", lokasi: "", status: "Aktif"});
    //error 0 means use default error messages for password mismatch and passwords being under 6 characters long.
    //error 1 or 2 uses the message set in customStatusMessage. 1 displays red text and 2 displays green text.
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0});

    const navigate = useNavigate();

    let errorMessage = " ";
    let errorMessageClass = "statusmessagered";

    const updateMineData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setMineData(values => ({...values, [name]: value}));
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

    const submitNewMineData = (e) => {
        e.preventDefault();
        if(mineData.nama === ""
        || mineData.tanggal_dibuka  === ""
        || mineData.status  === ""
        || mineData.lokasi  === "") {
            setCustomStatusMessage({message: "Mohon mengisi semua kolom", error: 1});
        }
        else {
            const payload = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(mineData),
                mode: "cors"
            }
            fetch(backendUrl + "/addminedata", payload)
            .then(res => res.json())
            .then(postResponse => setCustomStatusMessage({message: postResponse.msg, error: postResponse.success}));
        }
    }

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToMineList = (e) => {
        e.preventDefault();
        navigate("/admin_list_mine", {state: {}})
    }

    return(
        <>
        <div className="headertext">TAMBAH DATA TAMBANG
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToMineList} >DATA TAMBANG</button>
        </div>
        <div className="secondarytext"></div>
        <br></br>
        <form onSubmit={submitNewMineData}>
            <table className="submitkittable">
                <tr>
                    <td>NAMA TAMBANG</td>
                    <td>
                    <input className="submitkitinput" type="text" name="nama"
                    value={mineData.nama} maxlength="64" onChange={(e) => updateMineData(e)} />
                    </td>
                </tr>
                <tr>
                    <td>TANGGAL DIBUKA</td>
                    <td><input className="submitkitinput" type="date" name="tanggal_dibuka"
                    value={mineData.tanggal_dibuka} onChange={(e) => updateMineData(e)} /></td>
                </tr>
                <tr>
                    <td>LOKASI TAMBANG</td>
                    <td>
                    <input className="submitkitinput" type="text" name="lokasi"
                    value={mineData.lokasi} maxlength="64" onChange={(e) => updateMineData(e)} />
                    </td>
                </tr>
                <tr>
                    <td>STATUS</td>
                    <td><select name="status" className="submitkitinput"
                        value={mineData.status} onChange={(e) => updateMineData(e)}>
                            <option value="Aktif">Aktif</option>
                            <option value="Tidak Aktif">Tidak Aktif</option>
                        </select></td>
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

export default AdminAddMine;