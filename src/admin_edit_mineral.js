import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import "./Loginpage.css";

function AdminEditMineral() {
    const location = useLocation();
    const [mineralData, setMineralData] = useState({nama: "Memuat data...", harga_kg: "", jenis: ""});
    //error 0 means use default error messages for password mismatch and passwords being under 6 characters long.
    //error 1 or 2 uses the message set in customStatusMessage. 1 displays red text and 2 displays green text.
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0});

    const navigate = useNavigate();

    useEffect(() => {
        if(!location.state.id_mineral) navigate("/admin_mineral_list", {state: {}});
        fetch(backendUrl + `/viewentry?table=4&id=`+location.state.id_mineral)
        .then(res => res.json())
        .then(jsondata => {setMineralData(jsondata)});
    }, [location, navigate]);

    let errorMessage = " ";
    let errorMessageClass = "statusmessagered";

    const updateMineralData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setMineralData(values => ({...values, [name]: value}));
        customStatusMessage.error = 0
    };
    
    if(customStatusMessage.error === 0) {
        if((isNaN(+mineralData.harga) && mineralData.harga)) {
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

    const submitEditedMineralData = (e) => {
        e.preventDefault();
        if(mineralData.nama === undefined
            || mineralData.harga_kg  === undefined
            || mineralData.jenis  === undefined) {
            setCustomStatusMessage({message: "Mohon mengisi semua kolom", error: 1});
        }
        else if((isNaN(+mineralData.harga_kg) && mineralData.harga_kg)) {
            setCustomStatusMessage({message: "Harga harus berupa angka!!!", error: 1});
        }
        else {
            const payload = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(mineralData),
                mode: "cors"
            }
            fetch(backendUrl + "/editmineraldata?id="+location.state.id_mineral, payload)
            .then(res => res.json())
            .then(postResponse => setCustomStatusMessage({message: postResponse.msg, error: postResponse.success}));
        }
    }

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToMineralList = (e) => {
        e.preventDefault();
        navigate("/admin_list_mineral", {state: {}})
    }

    return(
        <>
        <div className="headertext">EDIT DATA MINERAL
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToMineralList} >DATA MINERAL</button>
        </div>
        <div className="secondarytext"></div>
        <br></br>
        <form onSubmit={submitEditedMineralData}>
            <table className="submitkittable">
                <tr>
                    <td>NAMA MINERAL</td>
                    <td>
                    <input className="submitkitinput" type="text" name="nama"
                    value={mineralData.nama} maxlength="64" onChange={(e) => updateMineralData(e)} />
                    </td>
                </tr>
                <tr>
                    <td>HARGA/KG</td>
                    <td>Rp. <input className="submitkitinputprice" type="text" name="harga_kg"
                    value={mineralData.harga_kg} onChange={(e) => updateMineralData(e)} /></td>
                </tr>
                <tr>
                    <td>JENIS</td>
                    <td>
                    <input className="submitkitinput" type="text" name="jenis"
                    value={mineralData.jenis} maxlength="64" onChange={(e) => updateMineralData(e)} />
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

export default AdminEditMineral;