import { React, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { backendUrl } from "./index.js";
import './Loginpage.css';

function AdminListMineral() {
    // const location = useLocation();
    //console.log(location);

    const [tableData, setTableData] = useState([{id_mineral: "Memuat...", nama: "Memuat data...", harga_kg: "Memuat data...", jenis: "Memuat data..."}]);

    useEffect(() => {
        fetch(backendUrl + `/viewtable?table=4`)
        .then(res => res.json())
        .then(jsondata => {setTableData(jsondata)});
    });
    
    const changeData = (e) => {
        const mineral_id = e.target.name;
        navigate("/admin_edit_mineral", {state: {id_mineral: mineral_id}})
    }

    const navigate = useNavigate();

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/admin_homepage", {state: {}})
    }

    const goToAddMineralData = (e) => {
        e.preventDefault();
        navigate("/admin_add_mineral", {state: {}})
    }

    return(
        <>
        
        <div className="headertext">DATA MINERAL
            <button className="toprightnavbutton" onClick={goToHome} >MENU UTAMA</button>
            <button className="topleftnavbutton" onClick={goToAddMineralData} >TAMBAH MINERAL</button>
        </div>
        <br></br>
        <table className="kitstable">
            <thead>
                <tr>
                    <th>ID mineral</th>
                    <th>Nama mineral</th>
                    <th>Harga/kg</th>
                    <th>Jenis</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((data) => {
                    return(
                        <tr>
                            <td>{data.id_mineral}</td>
                            <td>{data.nama}</td>
                            <td>Rp {data.harga_kg.toLocaleString("en")}</td>
                            <td>{data.jenis}</td>
                            <td><button
                            className="changedatabutton"
                            name={data.id_mineral}
                            onClick={(e) => {changeData(e)}}
                            >UBAH DATA</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <Outlet />
        </>
    );
}

export default AdminListMineral;