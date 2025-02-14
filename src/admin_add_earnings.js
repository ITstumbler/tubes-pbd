import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import "./adminaddearnings.css";

function AdminAddEarnings() {
    // const location = useLocation();
    const [earningsData, setEarningsData] = useState({id_tambang: "", id_mineral: "", tanggal: "", jumlah_penghasilan_kg: ""});
    //error 0 means use default error messages for password mismatch and passwords being under 6 characters long.
    //error 1 or 2 uses the message set in customStatusMessage. 1 displays red text and 2 displays green text.
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0});
    const [mineList, setMineList] = useState([{nama: "Memuat data...", id_tambang: "-1"}]);
    const [mineralList, setMineralList] = useState([{nama: "Memuat data...", id_mineral: "-1"}]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(backendUrl + "/viewtable?table=6")
        .then(res => res.json())
        .then(mineData => setMineList(mineData));
        fetch(backendUrl + "/viewtable?table=8")
        .then(res => res.json())
        .then(mineralData => setMineralList(mineralData));
    }, [navigate]);

    let errorMessage = " ";
    let errorMessageClass = "statusmessagered";

    const updateEarningsData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEarningsData(values => ({...values, [name]: value}));
        customStatusMessage.error = 0
    };
    
    if(customStatusMessage.error === 0) {
        if((isNaN(+earningsData.jumlah_penghasilan_kg) && earningsData.jumlah_penghasilan_kg)) {
            errorMessage = "Jumlah penghasilan (kg) harus berupa angka";
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

    const submitNewEarningsData = (e) => {
        e.preventDefault();
        if(earningsData.id_tambang === ""
        || earningsData.id_mineral  === ""
        || earningsData.tanggal  === ""
        || earningsData.jumlah_penghasilan_kg  === "") {
            setCustomStatusMessage({message: "Mohon mengisi semua kolom", error: 1});
        }
        else if((isNaN(+earningsData.jumlah_penghasilan_kg) && earningsData.jumlah_penghasilan_kg)) {
            setCustomStatusMessage({message: "Jumlah penghasilan (kg) harus berupa angka", error: 1});
        }
        else {
            const payload = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(earningsData),
                mode: "cors"
            }
            fetch(backendUrl + "/addearningsdata", payload)
            .then(res => res.json())
            .then(postResponse => setCustomStatusMessage({message: postResponse.msg, error: postResponse.success}));
        }
    }

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToEarningsList = (e) => {
        e.preventDefault();
        navigate("/admin_list_earnings", {state: {}})
    }

    return(
        <>
        <div className="headertext">TAMBAH DATA PENGHASILAN TAMBANG
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToEarningsList} >DATA PENGHAS.</button>
        </div>
        <div className="secondarytext"></div>
        <br></br>
        <form onSubmit={submitNewEarningsData}>
            <table className="submitkittable">
                <tr>
                    <td>TEMPAT MENAMBANG</td>
                    <td>
                        <select name="id_tambang" className="submitkitinput"
                        value={earningsData.id_tambang} onChange={(e) => updateEarningsData(e)}>
                            {mineList.map((mineEntry) => {
                                return(
                                    <option value={mineEntry.id_tambang}>{mineEntry.nama}</option>
                                )
                            })}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>MINERAL YANG DIDAPATKAN</td>
                    <td>
                        <select name="id_mineral" className="submitkitinput"
                        value={earningsData.id_mineral} onChange={(e) => updateEarningsData(e)}>
                            {mineralList.map((mineralEntry) => {
                                return(
                                    <option value={mineralEntry.id_mineral}>{mineralEntry.nama}</option>
                                )
                            })}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>TANGGAL DITERIMA</td>
                    <td><input className="submitkitinput" type="date" name="tanggal"
                    value={earningsData.tanggal} onChange={(e) => updateEarningsData(e)} /></td>
                </tr>
                <tr>
                    <td>JUMLAH PENGHASILAN</td>
                    <td><input className="submitkitinputprice" type="text" name="jumlah_penghasilan_kg"
                    value={earningsData.jumlah_penghasilan_kg} onChange={(e) => updateEarningsData(e)} /> KG</td>
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

export default AdminAddEarnings;