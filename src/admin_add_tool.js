import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import "./Loginpage.css";

function AdminAddTool() {
    // const location = useLocation();
    const [toolData, setToolData] = useState({tipe: "", tanggal_dibeli: "", harga: "", dimiliki: "1", status: "Berfungsi"});
    //error 0 means use default error messages for password mismatch and passwords being under 6 characters long.
    //error 1 or 2 uses the message set in customStatusMessage. 1 displays red text and 2 displays green text.
    const [customStatusMessage, setCustomStatusMessage] = useState({message: "", error: 0});

    const navigate = useNavigate();

    useEffect(() => {
        }, [navigate]);

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

    const submitNewToolData = (e) => {
        e.preventDefault();
        if(toolData.tipe === ""
        || toolData.harga  === ""
        || toolData.tanggal_dibeli  === ""
        || toolData.status  === "") {
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
            fetch(backendUrl + "/addtooldata", payload)
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
        <div className="headertext">TAMBAH DATA ALAT
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToToolList} >DATA ALAT</button>
        </div>
        <div className="secondarytext"></div>
        <br></br>
        <form onSubmit={submitNewToolData}>
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
                        <input className="submitkitbutton" type="submit" value="TAMBAH" />
                    </td>
                </tr>
            </table>
        </form>
        </>
    );
}

export default AdminAddTool;