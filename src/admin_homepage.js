import { React } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './Loginpage.css';

function AdminHomepage() {
    // const location = useLocation();
    //console.log(location);

    const navigate = useNavigate();

    const goToListMine = (e) => {
        e.preventDefault();
        navigate("/admin_list_mine", {state: {}})
    }

    const goToListWorker = (e) => {
        e.preventDefault();
        navigate("/admin_list_worker", {state: {}})
    }

    const goToListTool = (e) => {
        e.preventDefault();
        navigate("/admin_list_tool", {state: {}})
    }

    const goToListMineral = (e) => {
        e.preventDefault();
        navigate("/admin_list_mineral", {state: {}})
    }

    const goToListEarnings = (e) => {
        e.preventDefault();
        navigate("/admin_list_earnings", {state: {}})
    }

    return(
        <>
        
        <div className="headertext">MENU NAVIGASI ADMIN
        </div>
        
        <br></br>
        <table className="navigationtable">
            <thead>
                <tr>
                    <td colSpan="2"><button className="navigationbutton" onClick={goToListMine} >Data Tambang</button></td>
                    <td colSpan="2"><button className="navigationbutton" onClick={goToListWorker} >Data Pekerja</button></td>
                    <td colSpan="2"><button className="navigationbutton" onClick={goToListTool} >Data Alat</button></td>
                </tr>
                <tr>
                    <td colSpan="3"><button className="navigationbutton" onClick={goToListMineral} >Data Mineral</button></td>
                    <td colSpan="3"><button className="navigationbutton" onClick={goToListEarnings} >Data Penghasilan</button></td>
                </tr>
            </thead>
        </table>
        <Outlet />
        </>
    );
}

export default AdminHomepage;