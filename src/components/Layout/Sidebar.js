import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { context } from '../../context/context';
const Sidebar = () => {
    var location = useLocation() 
    const { toggleButton } = useContext(context);
    return (
        <>
            <nav id="sidebar" className={toggleButton ? 'active' : ""} >
                <div className="sidebar-header">
                    <div className="logo text-center">
                        <Link to="/admin/dashboard"><img src={logo} style={{ width: "70%" }} alt="logo" className="img-fluid" /></Link>
                    </div>
                </div>
                <ul className="list-unstyled components">
                    <li className={location?.pathname === "/admin/dashboard" ? "active" : "noactive"}> <Link to="/admin/dashboard">Dashboard</Link> </li>
                    <li className={location?.pathname === "/admin/userlist" || location?.pathname === "/admin/businesslist" ? "active" : "noactive"}>
                        <a href="#user" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Users Management</a>
                        <ul className={location?.pathname === "/admin/userlist" || location?.pathname === "/admin/businesslist"  ? "list-unstyled" :"list-unstyled collapse"} id="user">
                            <li className={location?.pathname === "/admin/userlist" ? "active" : "noactive"}> <Link to="/admin/userlist">All Users</Link> </li>
                            <li className={location?.pathname === "/admin/businesslist" ? "active" : "noactive"}> <Link to="/admin/businesslist">All Business</Link> </li>
                        </ul>
                    </li>
                    <li className={location?.pathname === "/admin/couponlist" || location?.pathname === "/admin/redemptionhistory" || location?.pathname==="/admin/couponlist/details"|| location?.pathname==="/admin/redemptionhistory/details"|| location?.pathname === "/new" ? "active" : "noactive"}>
                        <a href="#coupon" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Coupon Management</a>
                        <ul className={location?.pathname === "/admin/couponlist" || location?.pathname === "/admin/redemptionhistory"|| location?.pathname==="/admin/couponlist/details" || location?.pathname==="/admin/redemptionhistory/details"|| location?.pathname === "/new"  ? "list-unstyled" :"collapse list-unstyled"} id="coupon">
                            <li className={location?.pathname === "/admin/couponlist"|| location?.pathname==="/admin/couponlist/details" ? "active" : "noactive"}> <Link to="/admin/couponlist">All Coupons</Link> </li>
                            <li className={location?.pathname === "/admin/redemptionhistory" || location?.pathname==="/admin/redemptionhistory/details"? "active" : "noactive"}> <Link to="/admin/redemptionhistory">Coupon Redemption History</Link> </li>
                            <li className={location?.pathname === "/new" ? "active" : "noactive"}> <Link to="/new">Set Coupon Charges</Link> </li>
                        </ul>
                    </li>
                    <li className={location?.pathname === "/new" || location?.pathname === "/new" || location?.pathname === "/new" ? "active" : "noactive"}>
                        <a href="#reporting" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Reporting Management</a>
                        <ul className={location?.pathname === "/new" || location?.pathname === "/new" || location?.pathname === "/new" ? "list-unstyled" : "collapse list-unstyled"} id="reporting">
                            <li className={location?.pathname === "/new" ? "active" : "noactive"}> <Link to="/new">Financial Reports</Link> </li>
                            <li className={location?.pathname === "/new" ? "active" : "noactive"}> <Link to="/new">User's Reports</Link> </li>
                            <li className={location?.pathname === "/new" ? "active" : "noactive"}> <Link to="/new">SEO Metrics</Link> </li>
                        </ul>
                    </li>
                    <li className={location?.pathname === "/admin/termsandconditions" || location?.pathname === "/admin/privacypolicy" ? "active" : "noactive"}>
                        <a href="#content" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Content Management</a>
                        <ul className={location?.pathname === "/admin/termsandconditions" || location?.pathname === "/admin/privacypolicy" ? "list-unstyled" : "collapse list-unstyled"} id="content">
                            <li className={location?.pathname === "/admin/termsandconditions" ? "active" : "noactive"}> <Link to="/admin/termsandconditions">Terms & Conditions</Link> </li>
                            <li className={location?.pathname === "/admin/privacypolicy" ? "active" : "noactive"}> <Link to="/admin/privacypolicy">Privacy Policy</Link> </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>

    )
}

export default Sidebar